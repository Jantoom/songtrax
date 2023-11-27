import { createContext, useContext, useEffect, useReducer } from "react";
import { getSampleToLocations } from "../api/SamplesToLocationsApi";

export const SAMPLE_TO_LOCATIONS_ACTIONS = {
  init: "init",
  share: "share",
  unshare: "unshare",
};

const SampleToLocationsContext = createContext(null);
const SampleToLocationsDispatchContext = createContext(null);

/**
 * Wraps components around sample to locations context providers. This allows children to access the sample to locations without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {(Object|string)} init - Either an existing object or the id to fetch with.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function SampleToLocationsProvider({ init, children }) {
  const [sampleToLocations, dispatch] = useReducer(sampleToLocationsReducer, typeof init === "object" ? init : null);

  useEffect(() => {
    const fetchSampleToLocations = async () => {
      try {
        dispatch({
          type: SAMPLE_TO_LOCATIONS_ACTIONS.init,
          sampleToLocations: typeof init === "object" ? init : await getSampleToLocations(init),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSampleToLocations();
  }, [init]);

  return (
    <SampleToLocationsContext.Provider value={sampleToLocations}>
      <SampleToLocationsDispatchContext.Provider value={dispatch}>{children}</SampleToLocationsDispatchContext.Provider>
    </SampleToLocationsContext.Provider>
  );
}

/**
 * Passes the sample to locations context value without caller depending directly on React.
 *
 * @returns {any} Value of the sample to locations context.
 */
export function useSampleToLocations() {
  return useContext(SampleToLocationsContext);
}

/**
 * Passes the sample to locations dispatch without caller depending directly on React.
 *
 * @returns {any} The sample to locations dispatch.
 */
export function useSampleToLocationsDispatch() {
  return useContext(SampleToLocationsDispatchContext);
}

/**
 * Manipulates the state of the sample to locations.
 *
 * @param {any} sampleToLocations - Value of the sample to locations before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated sample to location.
 * @throws {Error} If the given action type is not known.
 */
function sampleToLocationsReducer(sampleToLocations, action) {
  switch (action.type) {
    case SAMPLE_TO_LOCATIONS_ACTIONS.init: {
      return action.sampleToLocations;
    }
    case SAMPLE_TO_LOCATIONS_ACTIONS.share: {
      return [...sampleToLocations, action.sampleToLocation];
    }
    case SAMPLE_TO_LOCATIONS_ACTIONS.unshare: {
      return sampleToLocations.filter((sampleToLocation) => sampleToLocation.id !== action.sampleToLocation.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

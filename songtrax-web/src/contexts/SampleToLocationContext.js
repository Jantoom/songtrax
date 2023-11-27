import { createContext, useContext, useEffect, useReducer } from "react";
import { getSampleToLocation } from "../api/SamplesToLocationsApi";

export const SAMPLE_TO_LOCATION_ACTIONS = {
  init: "init",
  delete: "delete",
};

const SampleToLocationContext = createContext(null);
const SampleToLocationDispatchContext = createContext(null);

/**
 * Wraps components around sample to location context providers. This allows children to access the sample to location without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {Object} init - Either an existing object or the ids to fetch with.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function SampleToLocationProvider({ init, children }) {
  const [sampleToLocation, dispatch] = useReducer(sampleToLocationReducer, typeof init === "object" ? init : null);

  useEffect(() => {
    const fetchSampleToLocation = async () => {
      try {
        dispatch({
          type: SAMPLE_TO_LOCATION_ACTIONS.init,
          sampleToLocation:
            typeof init === "object" ? init : await getSampleToLocation(init.sample_id, init.location_id),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSampleToLocation();
  }, [init]);

  return (
    <SampleToLocationContext.Provider value={sampleToLocation}>
      <SampleToLocationDispatchContext.Provider value={dispatch}>{children}</SampleToLocationDispatchContext.Provider>
    </SampleToLocationContext.Provider>
  );
}

/**
 * Passes the sample to location context value without caller depending directly on React.
 *
 * @returns {any} Value of the sample to location context.
 */
export function useSampleToLocation() {
  return useContext(SampleToLocationContext);
}

/**
 * Passes the sample to location dispatch without caller depending directly on React.
 *
 * @returns {any} The sample to location dispatch.
 */
export function useSampleToLocationDispatch() {
  return useContext(SampleToLocationDispatchContext);
}

/**
 * Manipulates the state of the sample to location.
 *
 * @param {any} sampleToLocation - Value of the sample to location before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated sample to location.
 * @throws {Error} If the given action type is not known.
 */
function sampleToLocationReducer(sampleToLocation, action) {
  switch (action.type) {
    case SAMPLE_TO_LOCATION_ACTIONS.init: {
      return action.sampleToLocation;
    }
    case SAMPLE_TO_LOCATION_ACTIONS.delete: {
      return null;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

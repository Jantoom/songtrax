import { createContext, useContext, useEffect, useReducer } from "react";
import { getSamplesToLocations } from "../api/SamplesToLocationsApi";

export const SAMPLES_TO_LOCATIONS_ACTIONS = {
  init: "init",
  delete: "delete",
  purge: "purge",
};

const SamplesToLocationsContext = createContext(null);
const SamplesToLocationsDispatchContext = createContext(null);

/**
 * Wraps components around samples to locations context providers. This allows children to access the samples to locations without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function SamplesToLocationsProvider({ children }) {
  const [samplesToLocations, dispatch] = useReducer(samplesToLocationsReducer, null);

  useEffect(() => {
    const fetchSamplesToLocations = async () => {
      try {
        dispatch({
          type: SAMPLES_TO_LOCATIONS_ACTIONS.init,
          samplesToLocations: await getSamplesToLocations(),
        });
      } catch (error) {
        console.error("Error fetching samplesToLocations:", error);
      }
    };

    fetchSamplesToLocations();
  }, []);

  return (
    <SamplesToLocationsContext.Provider value={samplesToLocations}>
      <SamplesToLocationsDispatchContext.Provider value={dispatch}>
        {children}
      </SamplesToLocationsDispatchContext.Provider>
    </SamplesToLocationsContext.Provider>
  );
}

/**
 * Passes the samples to locations context value without caller depending directly on React.
 *
 * @returns {any} Value of the samples to locations context.
 */
export function useSamplesToLocations() {
  return useContext(SamplesToLocationsContext);
}

/**
 * Passes the samples to locations dispatch without caller depending directly on React.
 *
 * @returns {any} The samples to locations dispatch.
 */
export function useSamplesToLocationsDispatch() {
  return useContext(SamplesToLocationsDispatchContext);
}

/**
 * Manipulates the state of the samples to locations.
 *
 * @param {any} samplesToLocations - Value of the samples to locations before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated samples to locations.
 * @throws {Error} If the given action type is not known.
 */
function samplesToLocationsReducer(samplesToLocations, action) {
  switch (action.type) {
    case SAMPLES_TO_LOCATIONS_ACTIONS.init: {
      return action.samplesToLocations;
    }
    case SAMPLES_TO_LOCATIONS_ACTIONS.delete: {
      return samplesToLocations.filter((sampleToLocation) => sampleToLocation.id !== action.sampleToLocation.id);
    }
    case SAMPLES_TO_LOCATIONS_ACTIONS.purge: {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

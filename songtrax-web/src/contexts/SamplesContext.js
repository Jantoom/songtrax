import { createContext, useContext, useEffect, useReducer } from "react";
import { getSamples } from "../api/SamplesApi";
import { sortSamples } from "../util/helpers";

export const SAMPLES_ACTIONS = {
  init: "init",
  create: "create",
  update: "update",
  delete: "delete",
  purge: "purge,"
};

const SamplesContext = createContext(null);
const SamplesDispatchContext = createContext(null);

/**
 * Wraps components around samples context providers. This allows children to access samples without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function SamplesProvider({ children }) {
  const [samples, dispatch] = useReducer(samplesReducer, null);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        dispatch({
          type: SAMPLES_ACTIONS.init,
          samples: await getSamples(),
        });
      } catch (error) {
        console.error("Error fetching samples:", error);
      }
    };

    fetchSamples();
  }, []);

  return (
    <SamplesContext.Provider value={samples}>
      <SamplesDispatchContext.Provider value={dispatch}>{children}</SamplesDispatchContext.Provider>
    </SamplesContext.Provider>
  );
}

/**
 * Passes the samples context value without caller depending directly on React.
 *
 * @returns {any} Value of the samples context.
 */
export function useSamples() {
  return useContext(SamplesContext);
}

/**
 * Passes the samples dispatch without caller depending directly on React.
 *
 * @returns {any} The samples dispatch.
 */
export function useSamplesDispatch() {
  return useContext(SamplesDispatchContext);
}

/**
 * Manipulates the state of the samples.
 *
 * @param {any} samples - Value of the samples before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated samples.
 * @throws {Error} If the given action type is not known.
 */
function samplesReducer(samples, action) {
  switch (action.type) {
    case SAMPLES_ACTIONS.init: {
      return action.samples.toSorted(sortSamples);
    }
    case SAMPLES_ACTIONS.create: {
      return [...samples, action.sample].toSorted(sortSamples);
    }
    case SAMPLES_ACTIONS.update: {
      return [...samples.filter((sample) => sample.id !== action.sample.id), action.sample].toSorted(sortSamples);
    }
    case SAMPLES_ACTIONS.delete: {
      return samples.filter((sample) => sample.id !== action.sample.id);
    }
    case SAMPLES_ACTIONS.purge: {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

import { createContext, useContext, useEffect, useReducer } from "react";
import { getSample } from "../api/SamplesApi";

export const SAMPLE_ACTIONS = {
  init: "init",
  update_name: "update_name",
  update_instrument: "update_instrument",
  update_sequences: "update_sequences",
  delete: "delete",
};

const SampleContext = createContext(null);
const SampleDispatchContext = createContext(null);

/**
 * Wraps components around sample context providers. This allows children to access the sample without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {(Object|string)} [init] - Either an existing object or the id to fetch with.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function SampleProvider({ init = undefined, children }) {
  const [sample, dispatch] = useReducer(sampleReducer, typeof init === "object" ? init : null);

  useEffect(() => {
    const fetchSample = async () => {
      try {
        dispatch({
          type: SAMPLE_ACTIONS.init,
          sample: typeof init === "object" ? init : await getSample(init),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSample();
  }, [init]);

  return (
    <SampleContext.Provider value={sample}>
      <SampleDispatchContext.Provider value={dispatch}>{children}</SampleDispatchContext.Provider>
    </SampleContext.Provider>
  );
}

/**
 * Passes the sample context value without caller depending directly on React.
 *
 * @returns {any} Value of the sample context.
 */
export function useSample() {
  return useContext(SampleContext);
}

/**
 * Passes the sample dispatch without caller depending directly on React.
 *
 * @returns {any} The sample dispatch.
 */
export function useSampleDispatch() {
  return useContext(SampleDispatchContext);
}

/**
 * Manipulates the state of the sample.
 *
 * @param {any} sample - Value of the sample before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated sample.
 * @throws {Error} If the given action type is not known.
 */
function sampleReducer(sample, action) {
  switch (action.type) {
    case SAMPLE_ACTIONS.init: {
      return action.sample;
    }
    case SAMPLE_ACTIONS.update_name: {
      return { ...sample, name: action.name };
    }
    case SAMPLE_ACTIONS.update_instrument: {
      return { ...sample, instrument: action.instrument };
    }
    case SAMPLE_ACTIONS.update_sequences: {
      return { ...sample, sequences: action.sequences };
    }
    case SAMPLE_ACTIONS.delete: {
      return null;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

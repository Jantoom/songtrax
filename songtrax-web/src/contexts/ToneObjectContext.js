import * as Tone from "tone";
import { createContext, useContext, useEffect, useReducer } from "react";
import { INSTRUMENTS } from "../util/instruments";

export const TONE_OBJECT_ACTIONS = {
  init: "init",
  preview: "preview",
  stop_preview: "stop_preview",
  play_note: "play_note",
  delete: "delete",
};

const ToneObjectContext = createContext(null);
const ToneObjectDispatchContext = createContext(null);

/**
 * Wraps components around tone object context providers. This allows children to access the tone object without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function ToneObjectProvider({ children }) {
  const [toneObject, dispatch] = useReducer(toneObjectReducer, null);

  useEffect(() => {
    const fetchToneObject = async () => {
      try {
        dispatch({
          type: TONE_OBJECT_ACTIONS.init,
          toneObject: {
            tone: Tone,
            part: null,
            sample: null,
            samplers: {
              piano: await INSTRUMENTS.piano.sampler(Tone),
              french_horn: await INSTRUMENTS["french horn"].sampler(Tone),
              guitar: await INSTRUMENTS.guitar.sampler(Tone),
              drums: await INSTRUMENTS.drums.sampler(Tone),
            },
          },
        });
      } catch (error) {
        console.error("Error fetching toneObject:", error);
      }
    };

    fetchToneObject();
  }, []);

  return (
    <ToneObjectContext.Provider value={toneObject}>
      <ToneObjectDispatchContext.Provider value={dispatch}>{children}</ToneObjectDispatchContext.Provider>
    </ToneObjectContext.Provider>
  );
}

/**
 * Passes the tone object context value without caller depending directly on React.
 *
 * @returns {any} Value of the tone object context.
 */
export function useToneObject() {
  return useContext(ToneObjectContext);
}

/**
 * Passes the tone object dispatch without caller depending directly on React.
 *
 * @returns {any} The tone object dispatch.
 */
export function useToneObjectDispatch() {
  return useContext(ToneObjectDispatchContext);
}

/**
 * Manipulates the state of the toneObject.
 *
 * @param {any} toneObject - Value of the toneObject before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated toneObject.
 * @throws {Error} If the given action type is not known.
 */
function toneObjectReducer(toneObject, action) {
  switch (action.type) {
    case TONE_OBJECT_ACTIONS.init: {
      return action.toneObject;
    }
    case TONE_OBJECT_ACTIONS.preview: {
      Object.values(toneObject.samplers).forEach((sampler) => (sampler.volume.value = 0));
      toneObject.tone.Transport.start();
      return { ...toneObject, part: action.part, sample: action.sample };
    }
    case TONE_OBJECT_ACTIONS.stop_preview: {
      Object.values(toneObject.samplers).forEach((sampler) => (sampler.volume.value = -Infinity));
      toneObject.tone.Transport.stop();
      toneObject.part?.dispose();
      return { ...toneObject, part: null, sample: null };
    }
    case TONE_OBJECT_ACTIONS.play_note: {
      Object.values(toneObject.samplers).forEach((sampler) => (sampler.volume.value = 0));
      toneObject.tone.Transport.start();
      return toneObject;
    }
    case TONE_OBJECT_ACTIONS.delete: {
      return null;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

import { SAMPLE_ACTIONS, useSample, useSampleDispatch } from "../../contexts/SampleContext";
import { TONE_OBJECT_ACTIONS, useToneObjectDispatch } from "../../contexts/ToneObjectContext";
import { INSTRUMENTS } from "../../util/instruments";

/**
 * Creates an instrument button, used to toggle instruments.
 *
 * @param {Object} params - An object containing parameters.
 * @param {string} instrument - Instrument for this button.
 * @returns {React.ReactNode} Instrument button.
 */
export default function InstrumentButton({ instrument }) {
  const sample = useSample();
  const sampleDispatch = useSampleDispatch();
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Stops any previews running and updates the sample with the new instrument.
   */
  const handleButtonClick = () => {
    toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });
    sampleDispatch({ type: SAMPLE_ACTIONS.update_instrument, instrument: instrument });
  };

  return (
    <button className={sample.instrument === instrument ? "toggle-selected" : "toggle"} onClick={handleButtonClick}>
      {INSTRUMENTS[instrument].label}
    </button>
  );
}

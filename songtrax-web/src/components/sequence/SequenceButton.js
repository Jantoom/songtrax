import { SAMPLE_ACTIONS, useSample, useSampleDispatch } from "../../contexts/SampleContext";
import { TONE_OBJECT_ACTIONS, useToneObject, useToneObjectDispatch } from "../../contexts/ToneObjectContext";
import { ACTIVATION_DURATION, OCTAVE } from "../../util/config";

/**
 * Creates a sequence button, used to toggle sequence bars.
 *
 * @param {Object} params - An object containing parameters.
 * @param {string} note - The note related to the bar.
 * @param {number} index - The index related to the bar.
 * @returns {React.ReactNode} Sequence button.
 */
export default function SequenceButton({ note, index }) {
  const sample = useSample();
  const sampleDispatch = useSampleDispatch();
  const toneObject = useToneObject();
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Toggles the activation of the sequence bar, playing a sound if previously deactivated.
   */
  const handleButtonClick = async () => {
    await toneObject.tone.start();
    toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });

    let _sequences = Object.fromEntries(
      Object.entries(sample.sequences).map((sequence) => [sequence[0], [...sequence[1]]])
    );
    _sequences[note][index] = !_sequences[note][index];
    sampleDispatch({ type: SAMPLE_ACTIONS.update_sequences, sequences: _sequences });

    if (_sequences[note][index]) {
      toneObject.samplers[sample.instrument].triggerAttackRelease(
        `${note}${OCTAVE}`,
        ACTIVATION_DURATION,
        toneObject.tone.now()
      );
      toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.play_note });
    }
  };

  return (
    <button
      className={sample.sequences[note][index] ? "toggle-selected" : "toggle"}
      onClick={handleButtonClick}
    ></button>
  );
}

import { useSample } from "../../contexts/SampleContext";
import { TONE_OBJECT_ACTIONS, useToneObject, useToneObjectDispatch } from "../../contexts/ToneObjectContext";
import { sortSequences } from "../../util/helpers";
import { BAR_DURATION, OCTAVE, SEQUENCE_LENGTH } from "../../util/config";

/**
 * Creates a sample preview button, used for preview a sample.
 *
 * @param {Object} params - An object containing parameters.
 * @param {string} className - The class to be used for the button.
 * @returns {React.ReactNode} Sample preview button.
 */
export default function SamplePreviewButton({ className }) {
  const sample = useSample();
  const toneObject = useToneObject();
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Stops any existing previews, adds new tone events based on the app state, then plays the new preview.
   */
  const handleButtonClick = async () => {
    await toneObject.tone.start();
    toneObject.tone.Transport.cancel();

    toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });

    if (toneObject.sample !== sample) {
      let part = new toneObject.tone.Part((time, note) => {
        toneObject.samplers[sample.instrument].triggerAttackRelease(note, BAR_DURATION, time);
      }, []).start(0);

      Object.entries(sample.sequences)
        .sort(sortSequences)
        .map(([note, sequence]) =>
          sequence.forEach((elem, indx) => {
            if (elem) part.add(indx * BAR_DURATION, `${note}${OCTAVE}`);
          })
        );

      toneObject.tone.Transport.schedule((time) => {
        toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });
      }, BAR_DURATION * SEQUENCE_LENGTH);

      toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.preview, part: part, sample: sample });
    }
  };

  return (
    <button type="button" className={className} onClick={handleButtonClick}>
      {toneObject.sample !== sample ? "Preview" : "Stop Previewing"}
    </button>
  );
}

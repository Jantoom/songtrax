import { deleteSample } from "../../api/SamplesApi";
import { SAMPLE_ACTIONS, useSample } from "../../contexts/SampleContext";
import { useSamplesDispatch } from "../../contexts/SamplesContext";
import { TONE_OBJECT_ACTIONS, useToneObject, useToneObjectDispatch } from "../../contexts/ToneObjectContext";

/**
 * Creates a sample delete button, used for deleting a sample.
 *
 * @returns {React.ReactNode} Sample delete button.
 */
export default function SampleDeleteButton() {
  const sample = useSample();
  const samplesDispatch = useSamplesDispatch();
  const toneObject = useToneObject();
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Deletes the sample. If the sample was being previewed, it will stop the preview.
   */
  const handleButtonClick = async () => {
    await deleteSample(sample);
    samplesDispatch({ type: SAMPLE_ACTIONS.delete, sample: sample });
    if (toneObject.sample === sample) {
      toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });
    }
  };

  return (
    <button className={"button"} onClick={handleButtonClick}>
      Delete
    </button>
  );
}

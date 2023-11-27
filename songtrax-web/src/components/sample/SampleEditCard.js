import { SAMPLE_ACTIONS, useSample, useSampleDispatch } from "../../contexts/SampleContext";
import SampleSaveButton from "./SampleSaveButton";
import SamplePreviewButton from "./SamplePreviewButton";

/**
 * Creates the sample edit card, used to house the sample name, and the preview and save buttons.
 *
 * @returns {React.ReactNode} Sample edit card.
 */
export default function SampleEditCard() {
  const sample = useSample();
  const sampleDispatch = useSampleDispatch();

  return (
    <form className="card edit-card">
      <input
        type="text"
        defaultValue={sample.name}
        placeholder="Enter a name to save..."
        onChange={(event) => sampleDispatch({ type: SAMPLE_ACTIONS.update_name, name: event.target.value })}
      ></input>
      <div className="button-group-container">
        <SamplePreviewButton />
        <SampleSaveButton />
      </div>
    </form>
  );
}

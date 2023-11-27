import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSample, putSample } from "../../api/SamplesApi";
import { useSample } from "../../contexts/SampleContext";
import Spinner from "../Spinner";

/**
 * Creates a sample save button, used for saving a sample.
 *
 * @returns {React.ReactNode} Sample save button.
 */
export default function SampleSaveButton() {
  const sample = useSample();
  const [saving, setSaving] = useState(false);
  let navigate = useNavigate();

  /**
   * Saves the sample to the API, keeping progress via the saving variable.
   */
  const handleButtonClick = async () => {
    try {
      setSaving(true);
      let _sample = sample.id === null ? await postSample(sample) : await putSample(sample);
      if (sample.id === null && _sample?.id !== null) navigate(`/edit/${_sample.id}`);
    } catch (error) {
      console.error("Error saving sample:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button type="button" className="bright-button" onClick={handleButtonClick} disabled={sample.name.length === 0}>
        Save
      </button>
      {saving ? <Spinner message="Saving..." /> : null}
    </>
  );
}

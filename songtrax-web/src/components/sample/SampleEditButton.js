import { NavLink } from "react-router-dom";
import { useSample } from "../../contexts/SampleContext";
import { TONE_OBJECT_ACTIONS, useToneObjectDispatch } from "../../contexts/ToneObjectContext";

/**
 * Creates a sample edit button, used for navigating to an edit page.
 *
 * @returns {React.ReactNode} Sample edit button.
 */
export default function SampleEditButton() {
  const sample = useSample();
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Stops the current preview.
   */
  const handleButtonClick = () => {
    toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });
  };

  return (
    <NavLink to={`edit/${sample.id}`} className="bright-button" onClick={handleButtonClick}>
      Edit
    </NavLink>
  );
}

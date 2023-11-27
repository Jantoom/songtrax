import { NavLink } from "react-router-dom";
import { TONE_OBJECT_ACTIONS, useToneObjectDispatch } from "../../contexts/ToneObjectContext";

/**
 * Creates a sample create button, used for navigating to a create page.
 *
 * @returns {React.ReactNode} Sample create button.
 */
export default function SampleCreateButton() {
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Stops the current preview.
   */
  const handleButtonClick = () => {
    toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });
  };

  return (
    <div className="create-card">
      <NavLink to="create" className="bright-button" onClick={handleButtonClick}>
        Create Sample
      </NavLink>
    </div>
  );
}

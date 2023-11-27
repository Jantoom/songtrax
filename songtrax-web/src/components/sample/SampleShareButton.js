import { NavLink } from "react-router-dom";
import { useSample } from "../../contexts/SampleContext";
import { useSampleToLocations } from "../../contexts/SampleToLocationsContext";
import { TONE_OBJECT_ACTIONS, useToneObjectDispatch } from "../../contexts/ToneObjectContext";

/**
 * Creates a sample share button, used for navigating to a share page.
 *
 * @returns {React.ReactNode} Sample share button.
 */
export default function SampleShareButton() {
  const sample = useSample();
  const sampleToLocations = useSampleToLocations();
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Stops the current preview.
   */
  const handleButtonClick = () => {
    toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });
  };

  return (
    <NavLink to={`share/${sample.id}`} className="button" onClick={handleButtonClick}>
      {sampleToLocations.length > 0 ? "Shared" : "Share"}
    </NavLink>
  );
}

import { deleteSampleToLocation } from "../../api/SamplesToLocationsApi";
import { useSampleToLocation } from "../../contexts/SampleToLocationContext";
import { SAMPLE_TO_LOCATIONS_ACTIONS, useSampleToLocationsDispatch } from "../../contexts/SampleToLocationsContext";

/**
 * Creates a location unshare button, used for unsharing the sample with the location.
 *
 * @returns {React.ReactNode} Location unshare button.
 */
export default function LocationUnshareButton() {
  const sampleToLocation = useSampleToLocation();
  const sampleToLocationsDispatch = useSampleToLocationsDispatch();

  /**
   * Unshares the sample with the location if it is not already unshared.
   */
  const handleButtonClick = async () => {
    if (sampleToLocation?.id !== null) {
      await deleteSampleToLocation(sampleToLocation);
      sampleToLocationsDispatch({ type: SAMPLE_TO_LOCATIONS_ACTIONS.unshare, sampleToLocation: sampleToLocation });
    }
  };

  return (
    <button className={sampleToLocation?.id === null ? "toggle-selected" : "toggle"} onClick={handleButtonClick}>
      Not Shared
    </button>
  );
}

import { postSampleToLocation } from "../../api/SamplesToLocationsApi";
import { useSampleToLocation } from "../../contexts/SampleToLocationContext";
import { SAMPLE_TO_LOCATIONS_ACTIONS, useSampleToLocationsDispatch } from "../../contexts/SampleToLocationsContext";

/**
 * Creates a location share button, used for sharing the sample with the location.
 *
 * @returns {React.ReactNode} Location share button.
 */
export default function LocationShareButton() {
  const sampleToLocation = useSampleToLocation();
  const sampleToLocationsDispatch = useSampleToLocationsDispatch();

  /**
   * Shares the sample with the location if it is not already shared.
   */
  const handleButtonClick = async () => {
    if (sampleToLocation?.id === null) {
      sampleToLocationsDispatch({
        type: SAMPLE_TO_LOCATIONS_ACTIONS.share,
        sampleToLocation: await postSampleToLocation(sampleToLocation),
      });
    }
  };

  return (
    <button className={sampleToLocation?.id !== null ? "toggle-selected" : "toggle"} onClick={handleButtonClick}>
      Shared
    </button>
  );
}

import { LocationProvider, useLocation } from "../../contexts/LocationContext";
import { SampleToLocationProvider } from "../../contexts/SampleToLocationContext";
import LocationShareButton from "./LocationShareButton";
import LocationUnshareButton from "./LocationUnshareButton";

/**
 * Creates the location card, with contexts relevant to the entire component.
 *
 * @param {Object} params - An object containing parameters.
 * @param {Object} location - The location to be contexted.
 * @param {Object} sampleToLocation - The sample to location to be contexted.
 * @returns {React.ReactNode} Contexted location card.
 */
export default function LocationCard({ location, sampleToLocation }) {
  return (
    <LocationProvider init={location}>
      <SampleToLocationProvider init={sampleToLocation}>
        <ContextedLocationCard />
      </SampleToLocationProvider>
    </LocationProvider>
  );
}

/**
 * Creates the location card, used to house the location name, and the share and unshare buttons.
 *
 * @returns {React.ReactNode} Location card.
 */
function ContextedLocationCard() {
  const location = useLocation();

  return (
    <div className="toggle-row-container">
      <div className="location-name-label">
        <h4>{location.name}</h4>
      </div>
      <div className="sequence-row-container">
        <LocationShareButton />
        <LocationUnshareButton />
      </div>
    </div>
  );
}

import { addPlaceholdSampleToLocations } from "../../api/SamplesToLocationsApi";
import { useSample } from "../../contexts/SampleContext";
import { useLocations } from "../../contexts/LocationsContext";
import { useSampleToLocations } from "../../contexts/SampleToLocationsContext";
import LocationCard from "./LocationCard";

/**
 * Creates a location list, used to house all location cards.
 * 
 * @returns {React.ReactNode} Location list.
 */
export default function LocationList() {
  const sample = useSample();
  const locations = useLocations();
  const sampleToLocations = useSampleToLocations();

  let _sampleToLocations = addPlaceholdSampleToLocations(sampleToLocations, sample, locations);

  return (
    <>
      {locations.map((location) =>
        location.sharing ? (
          <LocationCard
            key={location.id}
            location={location}
            sampleToLocation={_sampleToLocations.find(
              (sampleToLocation) => sampleToLocation.location_id === location.id
            )}
          />
        ) : null
      )}
    </>
  );
}

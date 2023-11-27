import { useSamples } from "../../contexts/SamplesContext";
import { useSamplesToLocations } from "../../contexts/SamplesToLocationsContext";
import SampleGalleryCard from "./SampleGalleryCard";

/**
 * Creates a sample gallery list, used to house all sample gallery cards.
 * 
 * @returns {React.ReactNode} Sample gallery list.
 */
export default function SampleGalleryList() {
  const samples = useSamples();
  const samplesToLocations = useSamplesToLocations();

  return (
    <>
      {samples.map((sample) => (
        <SampleGalleryCard
          key={sample.id}
          sample={sample}
          sampleToLocations={samplesToLocations.filter((sToL) => sToL.sample_id === sample.id)}
        />
      ))}
    </>
  );
}

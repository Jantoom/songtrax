import { useParams } from "react-router-dom";
import { SampleProvider, useSample } from "../contexts/SampleContext";
import { LocationsProvider, useLocations } from "../contexts/LocationsContext";
import { SampleToLocationsProvider, useSampleToLocations } from "../contexts/SampleToLocationsContext";
import { useToneObject } from "../contexts/ToneObjectContext";
import Template from "../components/Template";
import Spinner from "../components/Spinner";
import SampleShareCard from "../components/sample/SampleShareCard";
import LocationList from "../components/location/LocationList";

/**
 * Creates the share page, with contexts relevant to the entire component.
 *
 * @returns {React.ReactNode} Contexted share page.
 */
export default function Share() {
  const { id } = useParams();

  return (
    <SampleProvider init={id}>
      <LocationsProvider>
        <SampleToLocationsProvider init={id}>
          <ContextedShare />
        </SampleToLocationsProvider>
      </LocationsProvider>
    </SampleProvider>
  );
}

/**
 * Creates the share page. Stays in loading state until all contexts are non-null.
 *
 * @returns {React.ReactNode} share page.
 */
function ContextedShare() {
  const sample = useSample();
  const locations = useLocations();
  const sampleToLocations = useSampleToLocations();
  const toneObject = useToneObject();

  return (
    <Template title="Share This Sample">
      {sample === null || locations === null || sampleToLocations === null || toneObject === null ? (
        <Spinner />
      ) : (
        <>
          <SampleShareCard />
          <LocationList />
        </>
      )}
    </Template>
  );
}

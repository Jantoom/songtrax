import { SamplesProvider, useSamples } from "../contexts/SamplesContext";
import { SamplesToLocationsProvider, useSamplesToLocations } from "../contexts/SamplesToLocationsContext";
import { useToneObject } from "../contexts/ToneObjectContext";
import { USE_EXTENSIONS } from "../util/config";
import Template from "../components/Template";
import Spinner from "../components/Spinner";
import SampleCreateButton from "../components/sample/SampleCreateButton";
import SampleGalleryList from "../components/sample/SampleGalleryList";
import PurgeList from "../components/extensions/PurgeList";

/**
 * Creates the gallery page, with contexts relevant to the entire component.
 *
 * @returns {React.ReactNode} Contexted gallery page.
 */
export default function Gallery() {
  return (
    <SamplesProvider>
      <SamplesToLocationsProvider>
        <ContextedGallery />
      </SamplesToLocationsProvider>
    </SamplesProvider>
  );
}

/**
 * Creates the gallery page. Stays in loading state until all contexts are non-null.
 *
 * @returns {React.ReactNode} Gallery page.
 */
function ContextedGallery() {
  const samples = useSamples();
  const samplesToLocations = useSamplesToLocations();
  const toneObject = useToneObject();

  return (
    <Template title="Your Song Samples">
      {samples === null || samplesToLocations === null || toneObject === null ? (
        <Spinner />
      ) : (
        <>
          <SampleCreateButton />
          <SampleGalleryList />
          {samples.length !== 0 && <SampleCreateButton />}
          {USE_EXTENSIONS ? <PurgeList /> : null}
        </>
      )}
    </Template>
  );
}

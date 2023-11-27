import { SampleProvider, useSample } from "../../contexts/SampleContext";
import { SampleToLocationsProvider } from "../../contexts/SampleToLocationsContext";
import { USE_EXTENSIONS } from "../../util/config";
import { formatDateTime } from "../../util/helpers";
import SampleShareButton from "./SampleShareButton";
import SamplePreviewButton from "./SamplePreviewButton";
import SampleEditButton from "./SampleEditButton";
import SampleDeleteButton from "../extensions/SampleDeleteButton";

/**
 * Creates the sample gallery card, with contexts relevant to the entire component.
 *
 * @param {Object} params - An object containing parameters.
 * @param {Object} sample - The sample to be contexted.
 * @param {Object} sampleToLocations - The sample to locations to be contexted.
 * @returns {React.ReactNode} Contexted sample gallery card.
 */
export default function SampleGalleryCard({ sample, sampleToLocations }) {
  return (
    <SampleProvider init={sample}>
      <SampleToLocationsProvider init={sampleToLocations}>
        <ContextedSampleGalleryCard />
      </SampleToLocationsProvider>
    </SampleProvider>
  );
}

/**
 * Creates the sample gallery card card, used to house the sample name, date, and the share, preview, edit, and delete buttons.
 *
 * @returns {React.ReactNode} Sample gallery card.
 */
function ContextedSampleGalleryCard() {
  const sample = useSample();

  return (
    <div className="card">
      <div className="song-details">
        <h3>{sample.name}</h3>
        <p>{formatDateTime(sample.datetime)}</p>
      </div>
      <div className="button-group-container">
        <SampleShareButton />
        <SamplePreviewButton className="button" />
        <SampleEditButton />
        {USE_EXTENSIONS ? <SampleDeleteButton /> : null}
      </div>
    </div>
  );
}

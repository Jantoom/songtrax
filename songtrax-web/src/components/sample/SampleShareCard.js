import { useSample } from "../../contexts/SampleContext";
import { formatDateTime } from "../../util/helpers";
import SamplePreviewButton from "./SamplePreviewButton";

/**
 * Creates the sample share card card, used to house the sample name, date, and the preview button.
 *
 * @returns {React.ReactNode} Sample share card.
 */
export default function SampleShareCard() {
  const sample = useSample();

  return (
    <div className="card">
      <div className="song-details">
        <h3>{sample.name}</h3>
        <p>{formatDateTime(sample.datetime)}</p>
      </div>
      <div className="button-group-container">
        <SamplePreviewButton className="bright-button" />
      </div>
    </div>
  );
}

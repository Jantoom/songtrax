import { INSTRUMENTS } from "../../util/instruments";
import InstrumentButton from "./InstrumentButton";

/**
 * Creates an instrument list, used to house all instrument buttons.
 *
 * @returns {React.ReactNode} Instrument list.
 */
export default function InstrumentList() {
  return (
    <div className="toggle-row-container">
      <div className="row-label">
        <h4>Type</h4>
      </div>
      <div className="sequence-row-container">
        {Object.keys(INSTRUMENTS).map((instrument) => (
          <InstrumentButton key={instrument} instrument={instrument} />
        ))}
      </div>
    </div>
  );
}

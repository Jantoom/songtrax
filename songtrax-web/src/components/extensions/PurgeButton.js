import { deleteTable } from "../../api/PurgeApi";
import { LOCATIONS_ACTIONS, useLocationsDispatch } from "../../contexts/LocationsContext";
import { SAMPLES_ACTIONS, useSamplesDispatch } from "../../contexts/SamplesContext";
import { SAMPLES_TO_LOCATIONS_ACTIONS, useSamplesToLocationsDispatch } from "../../contexts/SamplesToLocationsContext";

/**
 * Creates a purge button, used to purge a resource from the API.
 * 
 * @param {Object} params - An object containing parameters.
 * @param {string} tableName - The resource that will be purged when clicked.
 * @returns {ReactNode} - Purge button.
 */
export default function PurgeButton({ tableName }) {
  const samplesDispatch = useSamplesDispatch();
  const locationsDispatch = useLocationsDispatch();
  const samplesToLocationsDispatch = useSamplesToLocationsDispatch();

  /**
   * Deletes the entire table using the API then updates the relevant context.
   */
  const handleButtonClick = async () => {
    await deleteTable(tableName);
    switch (tableName) {
      case "sample": {
        samplesDispatch({ type: SAMPLES_ACTIONS.purge });
        break;
      }
      case "location": {
        locationsDispatch({ type: LOCATIONS_ACTIONS.purge });
        break;
      }
      case "sampletolocation": {
        samplesToLocationsDispatch({ type: SAMPLES_TO_LOCATIONS_ACTIONS.purge });
        break;
      }
      default: {
      }
    }
  }

  return (
    <button type="button" className="bright-button" onClick={handleButtonClick}>
      {`Purge '${tableName}' table`}
    </button>
  );
}

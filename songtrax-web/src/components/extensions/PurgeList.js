import PurgeButton from "./PurgeButton";

/**
 * Creates a purge list, used to house all purge buttons.
 * 
 * @returns {React.ReactNode} Purge list.
 */
export default function PurgeList() {
  return (
    <div className="create-card">
      <PurgeButton tableName="sample" />
      <PurgeButton tableName="location" />
      <PurgeButton tableName="sampletolocation" />
    </div>
  );
}

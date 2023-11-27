import SequenceButton from "./SequenceButton";

/**
 * Creates the sequnece card, used to house the note and the sequence.
 *
 * @param {Object} params - An object containing parameters.
 * @param {Object} note - The note related to the sequence.
 * @param {Object} initialData - The initial data related to the sequence.
 * @returns {React.ReactNode} Sequence card.
 */
export default function SequenceCard({ note, initialData }) {
  return (
    <div className="toggle-row-container">
      <div className="row-label">
        <h4>{`${note}`}</h4>
      </div>
      <div className="sequence-row-container">
        {initialData.map((activated, index) => (
          <SequenceButton
            key={`${note} - ${index}`}
            note={note}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

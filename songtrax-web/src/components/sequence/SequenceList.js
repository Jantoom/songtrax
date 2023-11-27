import { useSample } from "../../contexts/SampleContext";
import { sortSequences } from "../../util/helpers";
import SequenceCard from "./SequenceCard";

/**
 * Creates a sequence list, used to house all sequence cards.
 * 
 * @returns {React.ReactNode} Sequence list.
 */
export default function SequenceList() {
  const sample = useSample();

  return (
    <>
      {Object.entries(sample.sequences)
        .sort(sortSequences)
        .map((sequence) => (
          <SequenceCard key={sequence[0]} note={sequence[0]} initialData={sequence[1]} />
        ))}
    </>
  );
}

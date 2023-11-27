import { SampleProvider, useSample } from "../contexts/SampleContext";
import { useToneObject } from "../contexts/ToneObjectContext";
import Template from "../components/Template";
import Spinner from "../components/Spinner";
import SampleEditCard from "../components/sample/SampleEditCard";
import InstrumentList from "../components/instrument/InstrumentList";
import SequenceList from "../components/sequence/SequenceList";

/**
 * Creates the create page, with contexts relevant to the entire component.
 *
 * @returns {React.ReactNode} Contexted create page.
 */
export default function Create() {
  return (
    <SampleProvider>
      <ContextedCreate />
    </SampleProvider>
  );
}

/**
 * Creates the create page. Stays in loading state until all contexts are non-null.
 *
 * @returns {React.ReactNode} Create page.
 */
function ContextedCreate() {
  const sample = useSample();
  const toneObject = useToneObject();

  return (
    <Template title={"Creating Sample:"}>
      {sample === null || toneObject === null ? (
        <Spinner />
      ) : (
        <>
          <SampleEditCard />
          <InstrumentList />
          <SequenceList />
        </>
      )}
    </Template>
  );
}

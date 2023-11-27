import { useParams } from "react-router-dom";
import { SampleProvider, useSample } from "../contexts/SampleContext";
import { useToneObject } from "../contexts/ToneObjectContext";
import Template from "../components/Template";
import Spinner from "../components/Spinner";
import SampleEditCard from "../components/sample/SampleEditCard";
import InstrumentList from "../components/instrument/InstrumentList";
import SequenceList from "../components/sequence/SequenceList";

/**
 * Creates the edit page, with contexts relevant to the entire component.
 *
 * @returns {React.ReactNode} Contexted edit page.
 */
export default function Edit() {
  const { id } = useParams();

  return (
    <SampleProvider init={id}>
      <ContextedEdit />
    </SampleProvider>
  );
}

/**
 * Creates the edit page. Stays in loading state until all contexts are non-null.
 *
 * @returns {React.ReactNode} Edit page.
 */
function ContextedEdit() {
  const sample = useSample();
  const toneObject = useToneObject();

  return (
    <Template title={"Editing This Sample:"}>
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

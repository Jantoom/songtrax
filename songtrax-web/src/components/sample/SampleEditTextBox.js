/**
 * Creates the sample edit text box, used to edit the name of the sample.
 *
 * @returns {React.ReactNode} Sample edit text box.
 */
export default function SampleEditTextBox({name, handleTextChange}) {
  return (
    <input
      type="text"
      defaultValue={name}
      placeholder="Enter a name to save..."
      onChange={() => handleTextChange(name)}
    ></input>
  );
}

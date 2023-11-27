/**
 * Creates a spinner, used for denoting something in progress.
 * 
 * @param {Object} params - An object containing parameters.
 * @param {string} message - The message to be displayed (if implemented).
 * @returns {React.ReactNode} Spinner.
 */
export default function Spinner({ message = "Loading..." }) {
    return (<h4>{message}</h4>);
}
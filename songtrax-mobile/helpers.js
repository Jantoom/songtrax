/**
 * Takes a raw datetime string and formats it to specification.
 *
 * @param {string} datetime - Raw datetime string.
 * @returns {string} Formatted string per layout specification for sample cards.
 */
export const formatDate = datetime =>
  new Date(datetime)
    .toLocaleDateString('en-AU', {
      timeZone: 'Australia/Brisbane', 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .split('/')
    .join('-');

/**
 * Takes an unordered list of samples and orders them alphabetically.
 *
 * @param {Object} a - First sample.
 * @param {Object} b - Second sample.
 * @returns {Object[]} Samples sorted by name.
 */
export const sortSamples = (a, b) => a.name.localeCompare(b.name);

/**
 * Takes an unordered list of samples and orders them by pitch.
 *
 * @param {any[]} a - First sequence.
 * @param {any[]} b - Second sequence.
 * @returns {any[][]} Sequences sorted by pitch.
 */
export const sortSequences = (a, b) => mapNoteToIndex(a[0]) - mapNoteToIndex(b[0]);

/**
 * Takes a note and finds its corresponding index related to every other note.
 *
 * @param {string} note - The note.
 * @returns {number} The user-facing index of the note.
 */
const mapNoteToIndex = note => ['B', 'A', 'G', 'F', 'E', 'D', 'C'].findIndex(n => n === note);

import { API_KEY, BASE_URL, SEQUENCE_LENGTH } from "../util/config";
import { sortSequences } from "../util/helpers";

// Client-side representation of a fresh sample with no notes activated.
const DEFAULT_RECORDING_DATA = Object.fromEntries(
  ["B", "A", "G", "F", "E", "D", "C"].map((note) => [note, Array(SEQUENCE_LENGTH).fill(false)])
);

/**
 * Constructs the URL needed to access the resource.
 *
 * @param {string} [id] - Specific sample ID.
 * @returns {string} URL used for accessing the resource.
 */
const getSampleUrl = (id = null) => `${BASE_URL}sample/${id === null ? "" : id + "/"}?api_key=${API_KEY}`;

/**
 * Gets samples from the API and parses them for client-side usage.
 *
 * @returns {Promise<Object[]>} List of samples.
 */
export async function getSamples() {
  return fetch(getSampleUrl(), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json.map((_json) => parseSample(_json)));
}

/**
 * Gets sample from the API and parses it for client-side usage.
 *
 * @param {string} id - Specific sample ID.
 * @returns {Promise<Object>} Specific sample.
 */
export async function getSample(id) {
  if (id === undefined) return parseSample(null);
  return fetch(getSampleUrl(id), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => parseSample(json));
}

/**
 * Posts sample to the API and parses it for client-side usage.
 *
 * @param {Object} sample - Sample to be created.
 * @returns {Promise<Object>} Specific sample.
 */
export async function postSample(sample) {
  if (sample.name === "") return sample;
  return fetch(getSampleUrl(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatSample(sample)),
  })
    .then((response) => response.json())
    .then((json) => parseSample(json));
}

/**
 * Puts sample to the API and parses it for client-side usage.
 *
 * @param {Object} sample - Sample to be updated.
 * @returns {Promise<Object>} Specific sample.
 */
export async function putSample(sample) {
  return fetch(getSampleUrl(sample.id), {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatSample(sample)),
  })
    .then((response) => response.json())
    .then((json) => parseSample(json));
}

/**
 * Deletes a sample to the API.
 *
 * @param {Object} sample - Sample to be deleted.
 * @returns {Promise<any>} Not used.
 */
export async function deleteSample(sample) {
  return fetch(getSampleUrl(sample.id), {
    method: "DELETE",
  });
}

/**
 * Parses a newly fetched sample for client-side usage.
 *
 * @param {Object} sample - Sample to be parsed.
 * @returns {Object} Parsed sample.
 */
const parseSample = (sample) => ({
  id: sample?.id ?? null,
  api_key: API_KEY,
  name: sample?.name ?? "",
  instrument: sample?.type ?? "piano",
  datetime: new Date(sample?.datetime ?? new Date()),
  sequences:
    sample !== null && sample.recording_data?.length > 0
      ? Object.fromEntries(
          JSON.parse(sample.recording_data)
            .map((sequence) => Object.entries(sequence))
            .flat()
        )
      : DEFAULT_RECORDING_DATA,
});

/**
 * Formats a sample about to be sent to the API.
 *
 * @param {Object} sample - Sample to be formatted.
 * @returns {Object} Formatted sample.
 */
const formatSample = (sample) => {
  let outgoingSample = {
    api_key: API_KEY,
    name: sample.name,
    type: sample.instrument,
    recording_data: JSON.stringify(
      Object.entries(sample.sequences)
        .sort(sortSequences)
        .map((sequence) => ({
          [sequence[0]]: sequence[1],
        }))
    ),
  };

  if (sample.id !== null) outgoingSample.id = sample.id;
  return outgoingSample;
};

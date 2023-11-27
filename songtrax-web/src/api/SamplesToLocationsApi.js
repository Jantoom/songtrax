import { API_KEY, BASE_URL } from "../util/config";

/**
 * Constructs the URL needed to access the resource.
 *
 * @param {string} [id] - Specific sample to location ID.
 * @returns {string} URL used for accessing the resource.
 */
const getSampleToLocationUrl = (id = null) =>
  `${BASE_URL}sampletolocation/${id === null ? "" : id + "/"}?api_key=${API_KEY}`;

  /**
 * Gets samples to locations from the API and parses them for client-side usage.
 *
 * @returns {Promise<Object[]>} List of samples to locations.
 */
export async function getSamplesToLocations() {
  return fetch(getSampleToLocationUrl(), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json.map((_json) => parseSampleToLocation(_json)));
}

/**
 * Gets sample to locations related to the sample ID.
 *
 * @param {string} id - Specific sample ID.
 * @returns {Promise<Object[]>} Related sample to locations.
 */
export async function getSampleToLocations(id) {
  return (await getSamplesToLocations()).filter((sampleToLocation) => sampleToLocation.sample_id === +id);
}

/**
 * Gets sample to location related to the sample ID and location ID.
 * 
 * @param {string} sample_id - Specific sample ID.
 * @param {string} location_id - Specific location ID.
 * @returns {Promise<Object>} Related sample to location.
 */
export async function getSampleToLocation(sample_id, location_id) {
  return (await getSamplesToLocations()).filter(
    (sampleToLocation) => sampleToLocation.sample_id === sample_id && sampleToLocation.location_id === location_id
  );
}

/**
 * Posts sample to location to the API.
 *
 * @param {Object} sampleToLocation - Sample to location to be created.
 * @returns {Promise<Object>} Specific sample to location.
 */
export async function postSampleToLocation(sampleToLocation) {
  if (sampleToLocation.id !== null) return sampleToLocation;
  return fetch(getSampleToLocationUrl(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatSampleToLocation(sampleToLocation)),
  }).then((response) => response.json());
}

/**
 * Deletes a sample to location to the API.
 *
 * @param {Object} sampleToLocation - Sample to location to be deleted.
 * @returns {Promise<any>} Not used.
 */
export async function deleteSampleToLocation(sampleToLocation) {
  if (sampleToLocation.id === null) return;
  return fetch(getSampleToLocationUrl(sampleToLocation.id), {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatSampleToLocation(sampleToLocation)),
  });
}

/**
 * Takes a list of sample to locations and adds placeholders for any location not currently sharing the sample.
 * 
 * @param {Object[]} sampleToLocations - Sample to locations without placeholders.
 * @param {Object} sample - Sample to add placeholders for.
 * @param {Object[]} locations - All locations to check for.
 * @returns {Object[]} Sample to locations with placeholders.
 */
export function addPlaceholdSampleToLocations(sampleToLocations, sample, locations) {
  return locations.map((location) => {
    let sampleToLocation = sampleToLocations.find((sampleToLocation) => sampleToLocation.location_id === location.id);
    return sampleToLocation === undefined
      ? {
          id: null,
          api_key: API_KEY,
          sample_id: sample.id,
          location_id: location.id,
        }
      : sampleToLocation;
  });
}

/**
 * Parses a newly fetched sample to location for client-side usage.
 *
 * @param {Object} sampleToLocation - Sample to location to be parsed.
 * @returns {Object} Parsed sample to location.
 */
const parseSampleToLocation = (sampleToLocation) => ({
  id: sampleToLocation?.id ?? null,
  api_key: API_KEY,
  sample_id: sampleToLocation?.sample_id ?? null,
  location_id: sampleToLocation?.location_id ?? null,
  datetime: new Date(sampleToLocation?.datetime ?? new Date()),
});

/**
 * Formats a sample to location about to be sent to the API.
 *
 * @param {Object} sampleToLocation - Sample to location to be formatted.
 * @returns {Object} Formatted sample to location.
 */
const formatSampleToLocation = (sampleToLocation) => {
  let outgoingSampleToLocation = {
    sample_id: sampleToLocation.sample_id,
    location_id: sampleToLocation.location_id,
  };

  if (sampleToLocation.id !== null) {
    outgoingSampleToLocation.id = sampleToLocation.id;
  }
  return outgoingSampleToLocation;
};

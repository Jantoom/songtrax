import {API_KEY, BASE_URL} from '../data/config';

/**
 * Constructs the URL needed to access the resource.
 *
 * @param {string} [id] - Specific sample ID.
 * @returns {string} URL used for accessing the resource.
 */
const getSampleRatingUrl = ({id = null, sample_id = null} = {}) =>
  `${BASE_URL}samplerating/${id === null ? '' : id + '/'}?api_key=${API_KEY}${
    sample_id === null ? '' : '&sample_id=' + sample_id
  }`;

/**
 * Gets sample ratings from the API and parses them for client-side usage.
 *
 * @returns {Promise<Object[]>} List of sample ratings.
 */
export async function getSamplesRatings() {
  return fetch(getSampleRatingUrl(), {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => json.map(_json => parseSampleRating(_json)));
}

/**
 * Gets sample rating from the API and parses it for client-side usage.
 *
 * @param {string} sample_id - Specific sample ID.
 * @returns {Promise<Object>} Specific sample rating.
 */
export async function getSampleRatings(sample_id) {
  return fetch(getSampleRatingUrl({sample_id}), {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => json.map(_json => parseSampleRating(_json)));
}

/**
 * Posts sample rating to the API and parses it for client-side usage.
 *
 * @param {Object} sampleRating - Sample rating to be created.
 * @returns {Promise<Object>} Specific sample rating.
 */
export async function postSampleRating(sampleRating) {
  if (sampleRating.sample_id === '') return sampleRating;
  return fetch(getSampleRatingUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatSampleRating(sampleRating)),
  })
    .then(response => response.json())
    .then(json => parseSampleRating(json));
}

/**
 * Puts sample rating to the API and parses it for client-side usage.
 *
 * @param {Object} sampleRating - Sample rating to be updated.
 * @returns {Promise<Object>} Specific sample rating.
 */
export async function putSampleRating(sampleRating) {
  return fetch(getSampleRatingUrl({id: sampleRating.id}), {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatSampleRating(sampleRating)),
  })
    .then(response => response.json())
    .then(json => parseSampleRating(json));
}

/**
 * Deletes a sample rating to the API.
 *
 * @param {Object} sampleRating - Sample rating to be deleted.
 * @returns {Promise<any>} Not used.
 */
export async function deleteSampleRating(sampleRating) {
  return fetch(getSampleRatingUrl({id: sampleRating.id}), {
    method: 'DELETE',
  });
}

/**
 * Parses a newly fetched sample rating for client-side usage.
 *
 * @param {Object} sampleRating - Sample rating to be parsed.
 * @returns {Object} Parsed sample rating.
 */
export const parseSampleRating = sampleRating => ({
  id: sampleRating?.id ?? null,
  api_key: API_KEY,
  sample_id: sampleRating?.sample_id ?? null,
  rating: sampleRating?.rating ?? 0,
  datetime: sampleRating?.datetime ?? new Date().toISOString(),
});

/**
 * Formats a sample rating about to be sent to the API.
 *
 * @param {Object} sampleRating - Sample rating to be formatted.
 * @returns {Object} Formatted sample rating.
 */
export const formatSampleRating = sampleRating => {
  let outgoingSampleRating = {
    api_key: API_KEY,
    sample_id: sampleRating.sample_id,
    rating: sampleRating.rating,
    datetime: sampleRating.datetime,
  };

  if (sampleRating.id !== null) outgoingSampleRating.id = sampleRating.id;
  return outgoingSampleRating;
};

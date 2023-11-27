import {API_KEY, BASE_URL} from '../data/config';

/**
 * Constructs the URL needed to access the resource.
 *
 * @param {string} [id] - Specific location ID.
 * @returns {string} URL used for accessing the resource.
 */
const getLocationUrl = ({id = null} = {}) => `${BASE_URL}location/${id === null ? '' : id + '/'}?api_key=${API_KEY}`;

/**
 * Gets locations from the API and parses them for client-side usage.
 *
 * @returns {Promise<Object[]>} List of locations.
 */
export async function getLocations() {
  return fetch(getLocationUrl(), {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => json.map(_json => parseLocation(_json)));
}

/**
 * Gets location from the API and parses it for client-side usage.
 *
 * @param {string} id - Specific location ID.
 * @returns {Promise<Object>} Specific location.
 */
export async function getLocation(id) {
  if (id === undefined) return parseLocation(null);
  return fetch(getLocationUrl({id}), {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => parseLocation(json));
}

/**
 * Posts location to the API and parses it for client-side usage.
 *
 * @param {Object} location - Location to be created.
 * @returns {Promise<Object>} Specific location.
 */
export async function postLocation(location) {
  if (location.name === '') return location;
  return fetch(getLocationUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatLocation(location)),
  })
    .then(response => response.json())
    .then(json => parseLocation(json));
}

/**
 * Deletes a location to the API.
 *
 * @param {Object} location - Location to be deleted.
 * @returns {Promise<any>} Not used.
 */
export async function deleteLocation(location) {
  return fetch(getLocationUrl({id: location.id}), {
    method: 'DELETE',
  });
}

/**
 * Parses a newly fetched location for client-side usage.
 *
 * @param {Object} location - Location to be parsed.
 * @returns {Object} Parsed location.
 */
export const parseLocation = location => ({
  id: location?.id ?? null,
  api_key: API_KEY,
  name: location?.name ?? '',
  sharing: location?.sharing ?? false,
  coords: {
    latitude: parseFloat(location?.latitude),
    longitude: parseFloat(location?.longitude),
  },
  datetime: location?.datetime ?? new Date().toISOString(),
});

/**
 * Formats a location about to be sent to the API.
 *
 * @param {Object} location - Location to be formatted.
 * @returns {Object} Formatted location.
 */
export const formatLocation = location => {
  let outgoingLocation = {
    api_key: API_KEY,
    name: location.name,
    sharing: location.sharing ?? true,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

  if (location.id !== null) outgoingLocation.id = location.id;
  return outgoingLocation;
};

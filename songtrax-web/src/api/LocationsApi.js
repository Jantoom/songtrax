import { API_KEY, BASE_URL } from "../util/config";

/**
 * Constructs the URL needed to access the resource.
 *
 * @param {string} [id] - Specific location ID.
 * @returns {string} URL used for accessing the resource.
 */
const getLocationUrl = (id = null) => `${BASE_URL}location/${id === null ? "" : id + "/"}?api_key=${API_KEY}`;

/**
 * Gets locations from the API and parses them for client-side usage.
 *
 * @returns {Promise<Object[]>} List of locations.
 */
export async function getLocations() {
  return fetch(getLocationUrl(), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => json.map((_json) => parseLocation(_json)));
}

/**
 * Gets location from the API and parses it for client-side usage.
 *
 * @param {string} id - Specific location ID.
 * @returns {Promise<Object>} Specific location.
 */
export async function getLocation(id) {
  if (id === undefined) return parseLocation(null);
  return fetch(getLocationUrl(id), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => parseLocation(json));
}

/**
 * Deletes a location to the API.
 * 
 * @param {Object} location - Location to be deleted.
 * @returns {Promise<any>} Not used.
 */
export async function deleteLocation(location) {
  return fetch(getLocationUrl(location.id), {
    method: "DELETE",
  });
}

/**
 * Parses a newly fetched location for client-side usage.
 *
 * @param {Object} location - Location to be parsed.
 * @returns {Object} Parsed location.
 */
const parseLocation = (location) => ({
  id: location?.id ?? null,
  api_key: API_KEY,
  name: location?.name ?? "",
  sharing: location?.sharing ?? false,
  datetime: new Date(location?.datetime ?? new Date()),
});

import { deleteLocation, getLocations } from "./LocationsApi";
import { deleteSampleRating, getSampleRatings } from "./SampleRatingsApi";
import { deleteSample, getSamples } from "./SamplesApi";
import { deleteSampleToLocation, getSamplesToLocations } from "./SamplesToLocationsApi";

// Endpoints used to get the entire resource list and delete every individual resource.
const API_ENDPOINTS = {
  sample: { get: getSamples, delete: deleteSample },
  location: { get: getLocations, delete: deleteLocation },
  sampletolocation: { get: getSamplesToLocations, delete: deleteSampleToLocation },
  sampleRating: { get: getSampleRatings, delete: deleteSampleRating },
};

/**
 * Takes a table name and purges the entire resource from the API.
 * 
 * @param {string} tableName - Resource to be purged.
 * @returns {Promise<Object[]>} The deleted objects.
 */
export async function deleteTable(tableName) {
  try {
    const table = await API_ENDPOINTS[tableName].get();
    await Promise.all(table.map((record) => API_ENDPOINTS[tableName].delete(record)));
    console.log(`Cleared ${table.length} records from ${tableName}`);
    return table;
  } catch (error) {
    console.error("Error clearing table:", error);
  }
}

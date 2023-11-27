import { createContext, useContext, useEffect, useReducer } from "react";
import { getLocations } from "../api/LocationsApi";

export const LOCATIONS_ACTIONS = {
  init: "init",
  create: "create",
  update: "update",
  delete: "delete",
  purge: "purge",
};

const LocationsContext = createContext(null);
const LocationsDispatchContext = createContext(null);

/**
 * Wraps components around locations context providers. This allows children to access locations without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function LocationsProvider({ children }) {
  const [locations, dispatch] = useReducer(locationsReducer, null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        dispatch({
          type: LOCATIONS_ACTIONS.init,
          locations: (await getLocations()).toSorted((a, b) => a.name.localeCompare(b.name)),
        });
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <LocationsContext.Provider value={locations}>
      <LocationsDispatchContext.Provider value={dispatch}>{children}</LocationsDispatchContext.Provider>
    </LocationsContext.Provider>
  );
}

/**
 * Passes the locations context value without caller depending directly on React.
 *
 * @returns {any} Value of the locations context.
 */
export function useLocations() {
  return useContext(LocationsContext);
}

/**
 * Passes the locations dispatch without caller depending directly on React.
 *
 * @returns {any} The locations dispatch.
 */
export function useLocationsDispatch() {
  return useContext(LocationsDispatchContext);
}

/**
 * Manipulates the state of the locations.
 *
 * @param {any} locations - Value of the locations before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated locations.
 * @throws {Error} If the given action type is not known.
 */
function locationsReducer(locations, action) {
  switch (action.type) {
    case LOCATIONS_ACTIONS.init: {
      return action.locations;
    }
    case LOCATIONS_ACTIONS.create: {
      return [...locations, action.location];
    }
    case LOCATIONS_ACTIONS.update: {
      return [...locations.filter((location) => location.id !== action.location.id), action.location];
    }
    case LOCATIONS_ACTIONS.delete: {
      return locations.filter((location) => location.id !== action.location.id);
    }
    case LOCATIONS_ACTIONS.purge: {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

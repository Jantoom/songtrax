import { createContext, useContext, useEffect, useReducer } from "react";
import { getLocation } from "../api/LocationsApi";

export const LOCATION_ACTIONS = {
  init: "init",
  delete: "delete",
};

const LocationContext = createContext(null);
const LocationDispatchContext = createContext(null);

/**
 * Wraps components around location context providers. This allows children to access the location without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {(Object|string)} init - Either an existing object or the id to fetch with.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function LocationProvider({ init, children }) {
  const [location, dispatch] = useReducer(locationReducer, typeof init === "object" ? init : null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        dispatch({
          type: LOCATION_ACTIONS.init,
          location: typeof init === "object" ? init : await getLocation(init),
        });
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [init]);

  return (
    <LocationContext.Provider value={location}>
      <LocationDispatchContext.Provider value={dispatch}>{children}</LocationDispatchContext.Provider>
    </LocationContext.Provider>
  );
}

/**
 * Passes the location context value without caller depending directly on React.
 *
 * @returns {any} Value of the location context.
 */
export function useLocation() {
  return useContext(LocationContext);
}

/**
 * Passes the location dispatch without caller depending directly on React.
 *
 * @returns {any} The location dispatch.
 */
export function useLocationDispatch() {
  return useContext(LocationDispatchContext);
}

/**
 * Manipulates the state of the location.
 *
 * @param {any} location - Value of the location before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated location.
 * @throws {Error} If the given action type is not known.
 */
function locationReducer(location, action) {
  switch (action.type) {
    case LOCATION_ACTIONS.init: {
      return action.location;
    }
    case LOCATION_ACTIONS.delete: {
      return null;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

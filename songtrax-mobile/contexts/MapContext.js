import {createContext, useContext, useEffect, useReducer} from 'react';
import {locations} from '../data/locations';
import {getLocations} from '../api/LocationsApi';

Array.prototype.toSorted = function(compareFn) {
  this.sort(compareFn);
  return this;
};

export const MAP_ACTIONS = {
  init: 'init',
  update_locations: 'update_locations',
  update_nearby_location: 'update_nearby_location',
};

const MapContext = createContext(null);
const MapDispatchContext = createContext(null);

/**
 * Wraps components around map context providers. This allows children to access the map without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function MapProvider({children}) {
  const [map, dispatch] = useReducer(mapReducer, {
    locations: locations,
    nearbyLocation: {},
  });

  useEffect(() => {
    const fetchMap = async () => {
      try {
        dispatch({
          type: MAP_ACTIONS.init,
          map: {
            locations: (await getLocations()).toSorted((a, b) => a.id - b.id),
            nearbyLocation: {},
          },
        });
      } catch (error) {
        console.error('Error fetching map:', error);
      }
    };

    fetchMap();
  }, []);

  return (
    <MapContext.Provider value={map}>
      <MapDispatchContext.Provider value={dispatch}>{children}</MapDispatchContext.Provider>
    </MapContext.Provider>
  );
}

/**
 * Passes the map context value without caller depending directly on React.
 *
 * @returns {any} Value of the map context.
 */
export function useMap() {
  return useContext(MapContext);
}

/**
 * Passes the map dispatch without caller depending directly on React.
 *
 * @returns {any} The map dispatch.
 */
export function useMapDispatch() {
  return useContext(MapDispatchContext);
}

/**
 * Manipulates the state of the map.
 *
 * @param {any} map - Value of the map before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated map.
 * @throws {Error} If the given action type is not known.
 */
function mapReducer(map, action) {
  switch (action.type) {
    case MAP_ACTIONS.init: {
      return action.map;
    }
    case MAP_ACTIONS.update_locations: {
      return {...map, locations: action.locations};
    }
    case MAP_ACTIONS.update_nearby_location: {
      return {...map, nearbyLocation: action.nearbyLocation};
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

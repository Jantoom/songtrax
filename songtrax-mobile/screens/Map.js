import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Appearance, Platform} from 'react-native';
const {Circle} = require('react-native-maps');
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import {mapStyles} from '../data/maps';

import {MAP_ACTIONS, useMap, useMapDispatch} from '../contexts/MapContext';
import {theme} from '../data/styles';

const USE_SPOOF = false;
const SPOOF_LOCATION = 'Great Court, UQ';
let watchHandler = null;

const LocationMarker = ({location}) => {
  return (
    <Circle
      center={location.coords}
      radius={100}
      strokeWidth={3}
      strokeColor="#A42DE8"
      fillColor={
        theme() == 'dark' ? 'rgba(128,0,128,0.5)' : 'rgba(210,169,210,0.5)'
      }
    />
  );
};

// Main component for displaying the map and markers
function Map({navigation}) {
  const map = useMap();
  const mapDispatch = useMapDispatch();
  const [userCoords, setUserCoords] = useState(
    map.locations.find(location => location.name === SPOOF_LOCATION)?.coords ??
      {},
  );
  const [locationPermission, setLocationPermission] = useState(false);

  const checkLocationPermission = async () => {
    setLocationPermission(
      Platform.OS === 'ios' || (await requestAndroidLocationPermission()),
    );
  };

  // Run location permissions check after render due to side effects
  // Only Android needs extra code to check for permissions (in addition to android/app/src/main/AndroidManifest.xml)
  // iOS relies on ios/mapApp/Info.plist
  useEffect(() => {
    checkLocationPermission();
  }, []);

  if (locationPermission) {
    if (watchHandler != null) {
      Geolocation.clearWatch(watchHandler);
    }
    watchHandler = watchUserLocation(setUserCoords, map, mapDispatch);
  }

  return (
    <MapView
      camera={{
        center: userCoords,
        pitch: 0, // Angle of 3D map
        heading: 0, // Compass direction
        altitude: 3000, // Zoom level for iOS
        zoom: 15, // Zoom level For Android
      }}
      showsUserLocation={locationPermission}
      customMapStyle={mapStyles[Appearance.getColorScheme()]}
      onMapReady={checkLocationPermission}
      style={{flex: 1}}>
      {map.locations.map(location => (
        <LocationMarker key={location.id} location={location} />
      ))}
    </MapView>
  );
}

export default Map;

async function requestAndroidLocationPermission() {
  try {
    return (
      PermissionsAndroid.RESULTS.GRANTED ===
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app will put your location on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ))
    );
  } catch (error) {
    console.warn(error);
    return false;
  }
}

// Only watch the user's current location when device permission granted
function watchUserLocation(setUserCoords, map, mapDispatch) {
  return Geolocation.watchPosition(
    position => {
      const userCoords = USE_SPOOF
        ? {
            ...map.locations.find(location => location.name === SPOOF_LOCATION)
              .coords,
          }
        : {...position.coords};
      const nearbyLocation = findNearbyLocations(userCoords, map.locations)[0];
      setUserCoords(userCoords);
      if (nearbyLocation == undefined && map.nearbyLocation != {}) {
        mapDispatch({
          type: MAP_ACTIONS.update_nearby_location,
          nearbyLocation: {},
        });
      } else if (nearbyLocation.id != map.nearbyLocation?.id) {
        mapDispatch({
          type: MAP_ACTIONS.update_nearby_location,
          nearbyLocation: nearbyLocation,
        });
      }
    },
    error => console.warn(error),
    {enableHighAccuracy: true},
  );
}

// Function to retrieve location nearest to current user location
function findNearbyLocations(coords, locations) {
  return locations
    .map(location => ({
      location: location,
      distance: getDistance(coords, location.coords),
    }))
    .filter(({distance}) => distance <= 100)
    .sort((a, b) => a.distance - b.distance)
    .map(({location}) => location);
}

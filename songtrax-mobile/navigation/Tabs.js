import React from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text} from 'react-native';

import {
  colors,
  componentStyles,
  maxDim,
  minDim,
  normalize,
} from '../data/styles';
import icons from '../data/icons';
import Map from '../screens/Map';
import Profile from '../screens/Profile';
import LinearGradient from 'react-native-linear-gradient';
import SongTrax from './SongTrax';
import {useMap} from '../contexts/MapContext';

const tabProps = {
  Map: {icon: icons.tabMapWhite, width: minDim() * 0.2},
  SongTrax: {icon: icons.logoWhite, width: minDim() * 0.45},
  Profile: {icon: icons.tabProfileWhite, width: minDim() * 0.2},
};

function TabIcon({name, focused}) {
  const useNearbyLocation =
    useMap().nearbyLocation?.id != undefined && name == 'SongTrax';
  const {icon, width} = tabProps[name];

  return (
    <View
      style={{
        backgroundColor: focused ? colors().blackColorTranslucentLess : null,
        alignItems: 'center',
        paddingVertical: normalize(12.5),
        flex: 1,
      }}>
      <Image
        source={icon}
        style={{
          resizeMode: 'contain',
          flex: 1,
          width: width,
          tintColor:
            focused || useNearbyLocation
              ? colors().whiteColor
              : colors().whiteColorTranslucent,
        }}
      />
      {useNearbyLocation && (
        <Text
          style={{
            ...componentStyles.text3(),
            color: '#fff',
            fontWeight: '300',
            width: width,
            textAlign: 'center',
          }}>
          There's Music Nearby
        </Text>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Tabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: maxDim() * 0.08,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[colors().purpleColorLighter, colors().blueColorDarker]}
            style={{flex: 1}}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        ),
      })}>
      <Tab.Screen name="Map" children={() => <Map navigation={navigation} />} />
      <Tab.Screen
        name="SongTrax"
        children={() => <SongTrax navigation={navigation} />}
      />
      <Tab.Screen
        name="Profile"
        children={() => <Profile navigation={navigation} />}
      />
    </Tab.Navigator>
  );
}

export default Tabs;

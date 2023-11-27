import React from 'react';
import {SafeAreaView} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Location from '../screens/Location';
import Sample from '../screens/Sample';

const Stack = createStackNavigator();

function SongTrax({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
        initialRouteName={'Location'}>
        <Stack.Screen
          name="Location"
          children={props => <Location {...props} />}
        />
        <Stack.Screen name="Sample" children={props => <Sample {...props} />} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default SongTrax;

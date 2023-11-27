import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Tabs from './navigation/Tabs';

import {ProfileProvider} from './contexts/ProfileContext';
import {MapProvider} from './contexts/MapContext';
import {componentStyles} from './data/styles';

const Stack = createStackNavigator();

const Header = () => {
  return (
    <>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <View style={componentStyles.statusBar()} />
    </>
  );
};

function App() {
  return (
    <ProfileProvider>
      <MapProvider>
        <Header />
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={'Tabs'}>
              <Stack.Screen
                name="Tabs"
                children={props => <Tabs {...props} />}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </MapProvider>
    </ProfileProvider>
  );
}

export default App;

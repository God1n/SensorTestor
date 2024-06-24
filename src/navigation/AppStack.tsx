import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PeripheralInfo} from 'react-native-ble-manager';
import ScanDevices from '../pages/ScanDevices';
import PeripheralDetails from '../pages/PeripheralDetails';
import BottomTabStack from './BottomTabStack';

export type AppStackParameterList = {
  BottomTabs: undefined;
  ScanDevices: undefined;
  PeripheralDetails: {peripheralData: PeripheralInfo};
};

const Stack = createNativeStackNavigator<AppStackParameterList>();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="BottomTabs" component={BottomTabStack} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="ScanDevices" component={ScanDevices} />
          <Stack.Screen
            name="PeripheralDetails"
            component={PeripheralDetails}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

import React from 'react';
import AppStack from './src/navigation/AppStack';

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

const App = () => {
  return <AppStack />;
};

export default App;

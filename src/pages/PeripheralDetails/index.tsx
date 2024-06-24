import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParameterList} from '../../navigation/AppStack';

// // Define interfaces for your peripheral's properties
// interface Characteristic {
//   characteristic: string;
//   // Add any other characteristic properties you need
// }

// interface Service {
//   uuid: string;
//   characteristics: Characteristic[];
//   // Add any other service properties you need
// }

// Props expected by PeripheralDetails component
interface PeripheralDetailsProps
  extends NativeStackScreenProps<AppStackParameterList, 'PeripheralDetails'> {}

const PeripheralDetails: React.FC<PeripheralDetailsProps> = ({route}) => {
  const peripheralData = route.params.peripheralData;
  console.log('peripheralData:', JSON.stringify(peripheralData, null, 2));

  // Function to render characteristics for a given service
  const renderCharacteristicsForService = (serviceUUID: string) => {
    const characteristics = peripheralData.characteristics ?? [];
    return characteristics
      .filter(char => char.service === serviceUUID)
      .map((char, index) => (
        <View key={index} style={styles.characteristicContainer}>
          <Text style={styles.characteristicTitle}>
            Characteristic: {char.characteristic}
          </Text>
          <Text>Properties: {Object.values(char.properties).join(', ')}</Text>
        </View>
      ));
  };

  return (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Peripheral Details</Text>
      <Text style={styles.detail}>name: {peripheralData.name}</Text>
      <Text style={styles.detail}>id: {peripheralData.id}</Text>
      <Text style={styles.detail}>rssi: {peripheralData.rssi}</Text>

      <Text style={[styles.title, styles.titleWithMargin]}>Advertising</Text>
      <Text style={styles.detail}>
        localName: {peripheralData.advertising.localName}
      </Text>
      <Text style={styles.detail}>
        txPowerLevel: {peripheralData.advertising.txPowerLevel}
      </Text>
      <Text style={styles.detail}>
        isConnectable:{' '}
        {peripheralData.advertising.isConnectable ? 'true' : 'false'}
      </Text>
      <Text style={styles.detail}>
        serviceUUIDs: {peripheralData.advertising.serviceUUIDs}
      </Text>

      <Text style={[styles.title, styles.titleWithMargin]}>
        Services && Characteristics
      </Text>
      {peripheralData.services?.map((service, index) => (
        <View key={index} style={styles.serviceContainer}>
          <Text style={styles.serviceTitle}>Service: {service.uuid}</Text>
          {renderCharacteristicsForService(service.uuid)}
        </View>
      ))}
    </ScrollView>
  );
};

export default PeripheralDetails;

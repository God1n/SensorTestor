import {View} from 'react-native';
import React from 'react';
import {Peripheral} from 'react-native-ble-manager';
import Label from '../../Label';
import styles from './styles';

interface IBleDeviceProps {
  device: Peripheral;
}

const BleDevice: React.FC<IBleDeviceProps> = ({device}) => {
  return (
    <View style={styles.container}>
      <Label type={'subtopic'}>{device.name}</Label>
      <Label type={'subtopic'}>{device.id}</Label>
      <Label type={'subtopic'}>{device.id}</Label>
    </View>
  );
};

export default BleDevice;

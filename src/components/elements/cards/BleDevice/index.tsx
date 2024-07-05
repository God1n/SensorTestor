import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Peripheral, PeripheralInfo} from 'react-native-ble-manager';
import Label from '../../Label';
import styles from './styles';
import BleManager from 'react-native-ble-manager';
import VectorIcon from '../../VectorIcon/VectorIcon';

interface IBleDeviceProps {
  device: Peripheral;
}

const BleDevice: React.FC<IBleDeviceProps> = ({device}) => {
  const [deviceData, setDeviceData] = React.useState<Peripheral>(device);
  const [deviceInfo, setDeviceInfo] = React.useState<PeripheralInfo>();
  const [isSensorNotified, setIsSensorNotified] =
    React.useState<boolean>(false);
  const handleOnPress = () => {
    console.log('Device pressed');
    if (deviceData.connected) {
      BleManager.disconnect(deviceData.id)
        .then(() => {
          // Success code
          console.log('Device Disconnected');
          setDeviceData({...deviceData, connected: false});
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });
    } else {
      BleManager.connect(deviceData.id, {autoconnect: true})
        .then(async res => {
          // Success code
          console.log('Device Connected', JSON.stringify(res));
          setDeviceData({...deviceData, connected: true});
          const peripheralData = await BleManager.retrieveServices(
            deviceData.id,
          );
          setDeviceInfo(peripheralData);
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });
    }
  };

  const handlePressNotify = (uuid: string) => {
    console.log('Notify pressed');
    const info = deviceInfo;
    let charasterristics = info?.characteristics;
    if (charasterristics) {
      charasterristics = charasterristics.filter(
        char => char.service === uuid && char.properties.Notify,
      );
      if (isSensorNotified) {
        BleManager.stopNotification(
          deviceData.id,
          uuid,
          charasterristics[0].characteristic,
        )
          .then(() => {
            // Success code
            console.log('Notification stopped');
            setIsSensorNotified(false);
          })
          .catch(error => {
            // Failure code
            console.log(error);
            setIsSensorNotified(true);
          });
      } else {
        BleManager.startNotification(
          deviceData.id,
          uuid,
          charasterristics[0].characteristic,
        )
          .then(() => {
            // Success code
            console.log('Notification started');
            setIsSensorNotified(true);
          })
          .catch(error => {
            // Failure code
            console.log(error);
            setIsSensorNotified(false);
          });
      }
    }
  };

  // Function to render characteristics for a given service
  const renderCharacteristicsForService = (serviceUUID: string) => {
    const characteristics = deviceInfo?.characteristics ?? [];
    return characteristics
      .filter(char => char.service === serviceUUID && char.properties.Notify)
      .map((char, index) => (
        <View key={index}>
          <Label type="label">Characteristic: {char.characteristic}</Label>
          <Label type="label">
            Properties: {Object.values(char.properties).join(', ')}
          </Label>

          <TouchableOpacity
            onPress={() => {
              handlePressNotify(serviceUUID);
            }}>
            <VectorIcon
              type="MaterialIcons"
              color={deviceData.connected ? 'green' : 'red'}
              name={
                deviceData.connected ? 'notifications-on' : 'notifications-off'
              }
              size={30}
            />
          </TouchableOpacity>
        </View>
      ));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <Label type={'subtopic'}>{deviceData.name}</Label>
      <Label type={'subtopic'}>{deviceData.id}</Label>
      <View>
        <VectorIcon
          type="MaterialCommunityIcons"
          color={deviceData.connected ? 'green' : 'red'}
          name={deviceData.connected ? 'bluetooth' : 'bluetooth-off'}
          size={30}
        />
      </View>
      <Label type={'label'}>{deviceInfo?.advertising.serviceUUIDs}</Label>
      {deviceInfo?.services?.map(service => (
        <>
          <Label type={'label'}>Service: {service.uuid}</Label>
          {renderCharacteristicsForService(service.uuid)}
        </>
      ))}
    </TouchableOpacity>
  );
};

export default BleDevice;

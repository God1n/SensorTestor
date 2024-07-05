import {useState} from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const useReadings = (
  peripheralUUID: string,
  service: string,
  characteristic: string,
) => {
  const [readings, setReadings] = useState<number[]>([]);

  let listner: EmitterSubscription;

  const connect = async () => {
    // Connect to device
    await BleManager.connect(peripheralUUID);
    // Before startNotification you need to call retrieveServices
    await BleManager.retrieveServices(peripheralUUID);
    // To enable BleManagerDidUpdateValueForCharacteristic listener
    await BleManager.startNotification(peripheralUUID, service, characteristic);
  };

  async function disconnect() {
    // Disconnect device
    await BleManager.disconnect(peripheralUUID);
  }

  const startNotify = () => {
    // Add event listener
    listner = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      ({value, peripheralId, characteristicId, serviceId}) => {
        console.log(`Service ${serviceId} , PeripheralUUID ${peripheralId}`);
        console.log(`Received ${value} for characteristic ${characteristicId}`);
        setReadings(value);
      },
    );
  };

  const stopNotify = async () => {
    // Stop notification
    await BleManager.stopNotification(peripheralUUID, service, characteristic);
    // Remove listener
    listner.remove();
  };

  return {readings, connect, disconnect, startNotify, stopNotify};
};

export default useReadings;

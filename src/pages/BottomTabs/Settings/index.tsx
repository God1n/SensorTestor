import {FlatList, ScrollView, View} from 'react-native';
import React from 'react';
import ButtonPrimary from '../../../components/buttons/ButtonPrimary/ButtonPrimary';
import Label from '../../../components/elements/Label';
import styles from './styles';
import useSensors from '../../../hooks/useSensors';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabStackParameterList} from '../../../navigation/BottomTabStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParameterList} from '../../../navigation/AppStack';
import {CompositeScreenProps} from '@react-navigation/native';
import BleDevice from '../../../components/elements/cards/BleDevice';
import PrimaryGraph from '../../../components/elements/graphs/PrimaryGraph';

const Settings: React.FC<
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabStackParameterList, 'Settings'>,
    NativeStackScreenProps<AppStackParameterList>
  >
> = ({}) => {
  const {peripherals, sensorValues, scan} = useSensors();

  return (
    <ScrollView style={styles.container}>
      <Label type="topic">Settings</Label>
      <ButtonPrimary onPress={scan} label="Scan Devices" />
      <FlatList
        data={Array.from(peripherals.values())}
        keyExtractor={item => item.id}
        renderItem={({item}) => <BleDevice device={item} />}
      />
      <PrimaryGraph values={sensorValues} />

      <View style={styles.whiteSpace} />
    </ScrollView>
  );
};

export default Settings;

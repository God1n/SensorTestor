import {FlatList, View} from 'react-native';
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

const Settings: React.FC<
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabStackParameterList, 'Settings'>,
    NativeStackScreenProps<AppStackParameterList>
  >
> = ({}) => {
  const {peripherals, scan} = useSensors();

  return (
    <View style={styles.container}>
      <Label type="topic">Settings</Label>
      <ButtonPrimary onPress={scan} label="Scan Devices" />
      <FlatList
        data={Array.from(peripherals.values())}
        keyExtractor={item => item.id}
        renderItem={({item}) => <BleDevice device={item} />}
      />
    </View>
  );
};

export default Settings;

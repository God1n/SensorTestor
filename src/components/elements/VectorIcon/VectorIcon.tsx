import React from 'react';
import {Component} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import {IVectorIconProps, IconLibraryType} from './VectorIconTypes';

const IconLibrary: IconLibraryType = {
  Feather: () => Feather,
  Ionicons: () => Ionicons,
  FontAwesome: () => FontAwesome,
  MaterialIcons: () => MaterialIcons,
  MaterialCommunityIcons: () => MaterialCommunityIcons,
  AntDesign: () => AntDesign,
  Entypo: () => Entypo,
  EvilIcons: () => EvilIcons,
  Fontisto: () => Fontisto,
  Foundation: () => Foundation,
  Octicons: () => Octicons,
  SimpleLineIcons: () => SimpleLineIcons,
  Zocial: () => Zocial,
};

class VectorIcon extends Component<IVectorIconProps> {
  render() {
    const {type, ...restProps} = this.props;
    const Icon = IconLibrary[type]();
    return <Icon {...restProps} />;
  }
}

export default VectorIcon;

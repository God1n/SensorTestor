import {IconProps} from 'react-native-vector-icons/Icon';

export type IconTypes =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

export type IconLibraryType = {
  [key in IconType]: () => React.ComponentType<any>;
};

export interface IVectorIconProps extends IconProps {
  type: IconTypes;
}

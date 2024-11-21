import { Dimensions as dimensions } from 'react-native';

export const windowHeight = dimensions.get('window').height;
export const windowWidth = dimensions.get('window').width;

const Dimensions = {
  appLogoHeight: 110.00,
  appLogoWidth: 110.00,

  //font
  fontSmall: 11.00,
  fontDefault: 13,
  fontLarge: 15,

  //white space
  space5: 5,
  space10: 10,
  space12: 12,
  space15: 15,
  space20: 20,

  //sizes
  size20: 20,
  size35: 35,
  size40: 40,
  size60: 60,
  size80: 80,
};

export default Dimensions;
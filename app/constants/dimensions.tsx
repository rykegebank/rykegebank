import { Dimensions as dimensions } from 'react-native';

export const windowHeight = dimensions.get('window').height;
export const windowWidth = dimensions.get('window').width;

const Dimensions = {
    //font
    fontSmall: 11.00,
    fontDefault: 13,
    fontLarge: 15,

    //white space
    space15: 15,
    space20: 20,
};

export default Dimensions;
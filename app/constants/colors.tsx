import { ColorValue } from 'react-native';

const Colors = {
    primaryColor: '#14233c',
    green: '#2ECC06',
    secondaryColor: '#FFFFFF',
    containerBgColor: '#F9F9F9',
    imageContainerBg: '#E0E4FC',
    primaryColor600: '#14233c',
    titleColor: '#373e4a',
    lineColor: '#ECECEC',
    labelTextColor: '#444444',
    smallTextColor1: '#555555',
    smallTextColor2: '#777777',
    primaryColor900: '#E0EAFB',
    backgroundColor: '#F9F9F9',
    textColor: '#FFFFFF',
    hintTextColor: '#44555B',
    textFieldDisableBorderColor: '#CFCEDB',
    colorBlack: '#262626',
    colorWhite: '#FFFFFF',
    cardBgColor: '#192D36',
    colorGrey: '#A0A4A8',
    colorGrey2: '#6E6E6E',
    bodyTextColor: '#747475',
    transparentColor: 'transparent',
    colorBlack2: '#25282B',
    colorGrey1: '#F8F8F8',
    borderColor: '#EFEFEF',
    highPriorityPurpleColor: '#7367F0',
    bgColorLight: '#f2f2f2',
    bgColor1: '#F9F9F9',
    greenSuccessColor: '#28C76F',
    redCancelTextColor: '#F93E2C',
    colorRed: '#ea5455',
    pendingColor: '#FFA500',
    red: '#D92027',
    greenP: '#28C76F',
    colorPlate: [
        '#14233c',
        '#00008B',
        '#77349b',
        '#0069aa',
        '#150f82',
        '#f72060',
        '#483D8B',
        '#F0E68C',
        '#228B22',
    ] as ColorValue[],
};

export const getUnselectedIconColor = (darkTheme: boolean = false): string => {
    return darkTheme ? Colors.colorWhite : `${Colors.colorGrey}99`;
};

export const getTextColor = (darkTheme: boolean = false): string => {
    return darkTheme ? Colors.colorBlack : Colors.colorBlack;
};

export const getCardBg = (darkTheme: boolean = false): string => {
    return darkTheme ? Colors.cardBgColor : Colors.colorWhite;
};

export const getBorderColor = (darkTheme: boolean = false): string => {
    return darkTheme ? Colors.lineColor : Colors.lineColor;
};


export default Colors;

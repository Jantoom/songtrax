import {Dimensions, Appearance, PixelRatio} from 'react-native';

// Samsung Galaxy S20 FE Viewport Dimensions
const TESTED_VIEWPORT_SCALE = {width: 412, height: 914};

const ACTUAL_VIEWPORT_SCALE = {
  width: () => Dimensions.get('screen').width,
  height: () => Dimensions.get('screen').height,
};

const widthBaseScale = () =>
  ACTUAL_VIEWPORT_SCALE.width() / TESTED_VIEWPORT_SCALE.width;
const heightBaseScale = () =>
  ACTUAL_VIEWPORT_SCALE.height() / TESTED_VIEWPORT_SCALE.height;

export const normalize = (size, based = 'height') => {
  const newSize =
    based === 'width' ? size * widthBaseScale() : size * heightBaseScale();
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const minDim = () =>
  Math.min(ACTUAL_VIEWPORT_SCALE.height(), ACTUAL_VIEWPORT_SCALE.width());
export const maxDim = () =>
  Math.max(ACTUAL_VIEWPORT_SCALE.height(), ACTUAL_VIEWPORT_SCALE.width());

export const theme = () => Appearance.getColorScheme();

export const colors = () => {
  const theme = Appearance.getColorScheme();

  return {
    purpleColorLighter: '#A42DE8',
    blueColorLighter: '#318AFF',
    blueColorDarker: '#2D3DE8',
    blackColorTranslucentLess: 'rgba(0,0,0,0.35)',
    blackColorTranslucentMore: 'rgba(0,0,0,0.7)',
    whiteColor: '#ffffff',
    whiteColorTranslucent: 'rgba(255,255,255, 0.5)',
    ...(theme == 'light'
      ? {
          bgColor: '#ffffff',
          fgColor: '#800080',
          fgColorLighter: 'rgba(128,0,128,0.5)',
          headerTextColor: '#ffffff',
        }
      : {
          bgColor: '#422142',
          fgColor: '#f0c4f0',
          fgColorLighter: 'rgba(210,169,210,0.5)',
          headerTextColor: '#f0c4f0',
        }),
  };
};

export const fonts = {
  font1: normalize(40),
  font2: normalize(26),
  font3: normalize(20),
  font4: normalize(16),
};

export const styles = {
  heading: () => {
    return {
      fontWeight: 'bold',
      color: colors().fgColor,
    };
  },
  text: () => {
    return {
      color: colors().fgColor,
    };
  },
  bottomMargin: () => {
    return {
      marginBottom: normalize(10),
    };
  },
  border: () => {
    return {
      borderColor: colors().fgColorLighter,
      borderRadius: normalize(10),
    };
  },
  height1: () => {
    return {
      height: maxDim() * 0.6,
    };
  },
  height2: () => {
    return {
      height: maxDim() * 0.5,
    };
  },
  height3: () => {
    return {
      height: maxDim() * 0.055,
    };
  },
};

export const componentStyles = {
  statusBar: () => {
    return {
      ...styles.height3(),
      backgroundColor: colors().fgColorLighter,
    };
  },
  tabBar: () => {
    return {};
  },
  container: () => {
    return {
      backgroundColor: colors().bgColor,
      flex: 1,
      paddingTop: minDim() * 0.05,
      paddingHorizontal: minDim() * 0.05,
      alignItems: 'stretch',
    };
  },
  separator: () => {
    return {
      height: maxDim() * 0.002,
      backgroundColor: colors().fgColor,
    };
  },
  button: () => {
    return {
      ...styles.border(),
      ...styles.height3(),
      backgroundColor: colors().fgColor,
      marginVertical: normalize(15),
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
  buttonText: () => {
    return {
      fontSize: fonts.font3,
      fontWeight: 'bold',
      color: colors().bgColor,
    };
  },
  input: () => {
    return {
      ...styles.border(),
      ...styles.height3(),
      backgroundColor: colors().fgColorLighter,
      color: colors().bgColor,
      fontSize: fonts.font3,
      textAlign: 'center',
      textAlignVertical: 'center',
    };
  },
  fullImage: () => {
    return {
      ...styles.border(),
      ...styles.height1(),
      overflow: 'hidden',
      borderWidth: normalize(2),
      marginVertical: normalize(25),
      justifyContent: 'flex-end',
    };
  },
  iconImage: () => {
    return {
      ...styles.border(),
      height: maxDim() * 0.1,
      width: maxDim() * 0.1,
      overflow: 'hidden',
      borderRadius: maxDim() * 0.1,
      borderWidth: normalize(2),
      resizeMode: 'cover',
    };
  },
  rating: () => {
    return {
      ...styles.height3(),
    };
  },
  heading1: () => {
    return {
      ...styles.heading(),
      fontSize: fonts.font1,
    };
  },
  heading2: () => {
    return {
      ...styles.heading(),
      fontSize: fonts.font2,
    };
  },
  heading3: () => {
    return {
      ...styles.heading(),
      fontSize: fonts.font3,
    };
  },
  text1: () => {
    return {
      ...styles.text(),
      fontSize: fonts.font2,
    };
  },
  text2: () => {
    return {
      ...styles.text(),
      fontSize: fonts.font3,
    };
  },
  text3: () => {
    return {
      ...styles.text(),
      fontSize: fonts.font4,
    };
  },
};

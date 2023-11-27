import {View, Image, Text} from 'react-native';
import {componentStyles, maxDim, minDim, theme} from '../data/styles';
import icons from '../data/icons';

const LocationHeader = ({location}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: maxDim() * 0.025,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Image
        source={theme() == 'dark' ? icons.iconPinLightpurple : icons.iconPinDarkpurple}
        style={{
          height: maxDim() * 0.075,
          width: maxDim() * 0.075,
          resizeMode: 'contain',
        }}
      />
      <Text
        numberOfLines={2}
        style={{
          ...componentStyles.heading1(),
          flex: 1,
          textAlign: 'center',
          textAlignVertical: 'center',
          marginBottom: 0,
        }}>
        {location.name != undefined ? location.name : 'No Nearby Locations'}
      </Text>
    </View>
  );
};

export default LocationHeader;

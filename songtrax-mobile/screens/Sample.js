import {useRef, useState} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import {Rating} from 'react-native-elements';

import {colors, componentStyles, minDim, maxDim, theme} from '../data/styles';

import icons from '../data/icons';
import {useProfile} from '../contexts/ProfileContext';
import LocationHeader from '../components/LocationHeader';
import {postSampleRating} from '../api/SampleRatingsApi';
import {WebView} from 'react-native-webview';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {formatSample} from '../api/SamplesApi';

const PlaySample = ({sample}) => {
  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
    preview: null,
  });
  const webViewRef = useRef();

  const webViewLoaded = () => {
    setWebViewState({
      ...webViewState,
      loaded: true,
    });
  };

  const handleActionPress = () => {
    if (!webViewState.actioned) {
      const formattedSample = formatSample(sample);
      webViewRef.current.injectJavaScript(
        `preparePreview(${formattedSample.recording_data}, "${formattedSample.type}")`,
      );
      webViewRef.current.injectJavaScript('playPreview()');
      setWebViewState({
        ...webViewState,
        actioned: true,
        preview: setTimeout(
          () =>
            setWebViewState({
              ...webViewState,
              actioned: false,
              preview: null,
            }),
          4 * 1000,
        ),
      });
    } else if (webViewState.preview != null) {
      webViewRef.current.injectJavaScript('stopSong()');
      clearTimeout(webViewState.preview);
      setWebViewState({
        ...webViewState,
        actioned: false,
        preview: null,
      });
    }
  };

  return (
    <>
      <WebView
        ref={ref => (webViewRef.current = ref)}
        originWhitelist={['*']}
        source={{
          uri: 'https://comp2140.uqcloud.net/static/samples/index.html',
        }}
        pullToRefreshEnabled={true}
        onLoad={webViewLoaded}
        containerStyle={{flex: 0}}></WebView>
      <TouchableOpacity
        onPress={handleActionPress}
        style={componentStyles.button()}>
        <Text style={componentStyles.buttonText()}>{'Play Music'}</Text>
      </TouchableOpacity>
    </>
  );
};

const RateSample = ({sample}) => {
  const [sampleRating, setSampleRating] = useState(0);
  const sendSampleRating = async rating => {
    try {
      if (sample?.id != undefined) {
        setSampleRating(
          (
            await postSampleRating({
              sample_id: sample.id,
              rating: rating,
            })
          ).rating,
        );
      }
    } catch (error) {
      console.error('Error sending sample rating:', error);
    }
  };

  return (
    <Rating
      type="custom"
      imageSize={maxDim() * 0.05}
      showRating={false}
      tintColor={colors().bgColor}
      onFinishRating={rating => sendSampleRating(rating)}
      startingValue={sampleRating}
      ratingBackgroundColor={colors().fgColor}
    />
  );
};

const AtLocation = ({navigation}) => {
  const profile = useProfile();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        gap: maxDim() * 0.025,
        marginBottom: maxDim() * 0.025,
      }}>
      <Text style={componentStyles.heading2()}>
        {'Currently At This Location:'}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: minDim() * 0.05,
        }}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          source={
            profile.photo != null
              ? profile.photo
              : theme() == 'dark'
              ? icons.iconSmileyLightpurple
              : icons.iconSmileyDarkpurple
          }
          style={componentStyles.iconImage()}
        />
        <Text style={componentStyles.text2()}>
          {profile.name != '' ? profile.name : 'You'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: minDim() * 0.05,
        }}>
        <Image
          source={
            theme() == 'dark'
              ? icons.iconSmileyLightpurple
              : icons.iconSmileyDarkpurple
          }
          style={componentStyles.iconImage()}
        />
        <Text style={componentStyles.text2()}>{'And Others...'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Sample = ({navigation, route}) => {
  const {sample, location} = route.params;

  return (
    <SafeAreaView style={componentStyles.container()}>
      <LocationHeader location={location} />
      <Text style={componentStyles.heading2()}>{sample.name}</Text>
      <PlaySample sample={sample} />
      <RateSample sample={sample} />
      <AtLocation navigation={navigation} />
    </SafeAreaView>
  );
};

export default Sample;

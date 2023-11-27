import {
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  View,
  TextInput,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useProfile, useProfileDispatch, PROFILE_ACTIONS} from '../contexts/ProfileContext';
import {colors, componentStyles, minDim} from '../data/styles';

const ProfilePhotoButton = ({hasPhoto}) => {
  const profileDispatch = useProfileDispatch();

  async function handleChangePress() {
    Keyboard.dismiss();
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      profileDispatch({
        type: PROFILE_ACTIONS.update_photo,
        photo: result.assets[0],
      });
    }
  }

  return (
    <TouchableOpacity
      style={{
        ...componentStyles.button(),
        alignSelf: 'center',
        width: minDim() * 0.5,
        marginBottom: hasPhoto ? minDim() * 0.075 : 0,
      }}
      onPress={handleChangePress}>
      <Text style={componentStyles.buttonText()}>{hasPhoto ? 'Change Photo' : 'Add Photo'}</Text>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const profile = useProfile();
  const profileDispatch = useProfileDispatch();
  const hasPhoto = profile?.photo != null;

  return (
    <SafeAreaView style={componentStyles.container()}>
      <ScrollView scrollEnabled={true}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={componentStyles.heading1()}>Edit Profile</Text>
          <Text style={componentStyles.text2()}>Mirror, Mirror On The Wall...</Text>
          {/* Profile Image */}
          {hasPhoto ? (
            <ImageBackground source={{uri: profile.photo.uri}} style={componentStyles.fullImage()}>
              <ProfilePhotoButton hasPhoto={hasPhoto} />
            </ImageBackground>
          ) : (
            <View style={{...componentStyles.fullImage(), borderStyle: 'dashed', justifyContent: 'center'}}>
              <ProfilePhotoButton hasPhoto={hasPhoto} />
            </View>
          )}
          {/* Profile Name */}
          <TextInput
            style={componentStyles.input()}
            placeholder="Enter Your Name"
            placeholderTextColor={colors().fgColor}
            onChangeText={text => profileDispatch({type: PROFILE_ACTIONS.update_name, name: text})}>
            {profile.name}
          </TextInput>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

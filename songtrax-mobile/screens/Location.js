import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Rating} from 'react-native-elements';

import {colors, componentStyles, maxDim} from '../data/styles';
import {formatDate} from '../helpers';

import {useMap} from '../contexts/MapContext';
import {getSamplesToLocation} from '../api/SamplesToLocationsApi';
import {getSample} from '../api/SamplesApi';
import LocationHeader from '../components/LocationHeader';
import {getSampleRatings} from '../api/SampleRatingsApi';

Array.prototype.toSorted = function (compareFn) {
  this.sort(compareFn);
  return this;
};

const SampleCard = ({navigation, sample, location}) => {
  const [sampleRatings, setSampleRatings] = useState([]);

  useEffect(() => {
    const fetchSampleRatings = async () => {
      try {
        if (sample?.id != undefined) {
          setSampleRatings(await getSampleRatings(sample.id));
        }
      } catch (error) {
        console.error('Error fetching sample ratings:', error);
      }
    };

    fetchSampleRatings();
  }, [sample]);

  return (
    <TouchableOpacity
      style={{
        alignItems: 'stretch',
        paddingVertical: maxDim() * 0.01,
      }}
      onPress={() => navigation.navigate('Sample', {sample, location})}>
      <Text style={componentStyles.text3()}>{sample.name}</Text>
      <Text style={componentStyles.text3()}>{formatDate(sample.datetime)}</Text>
      {sample != null && (
        <Rating
          startingValue={
            sampleRatings.reduce((acc, elem) => acc + elem.rating, 0) /
              sampleRatings.length || 0
          }
          type="custom"
          readonly={true}
          showRating={false}
          imageSize={maxDim() * 0.03}
          tintColor={colors().bgColor}
          ratingBackgroundColor={colors().fgColor}
        />
      )}
    </TouchableOpacity>
  );
};

const Location = ({navigation}) => {
  const nearbyLocation = useMap().nearbyLocation;
  const [samples, setSamples] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSamplesToLocation = async nearbyLocation => {
    try {
      setRefreshing(true);
      if (nearbyLocation.id != undefined) {
        setSamples(
          await Promise.all(
            (await getSamplesToLocation(nearbyLocation.id))
              .map(sampleToLocation => getSample(sampleToLocation.sample_id))
              .toSorted((a, b) => a.name < b.name),
          ),
        );
      } else {
        setSamples([]);
      }
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching samples to location:', error);
    }
  };

  useEffect(() => {
    fetchSamplesToLocation(nearbyLocation);
  }, [nearbyLocation]);

  return (
    <SafeAreaView style={componentStyles.container()}>
      <LocationHeader location={nearbyLocation} />
      <FlatList
        data={samples}
        keyExtractor={sampleToLocation => sampleToLocation.id}
        renderItem={({item}) => {
          return (
            <SampleCard
              navigation={navigation}
              sample={item}
              location={nearbyLocation}
            />
          );
        }}
        ItemSeparatorComponent={<View style={componentStyles.separator()} />}
        ListFooterComponent={
          samples.length > 0 ? (
            <View style={componentStyles.separator()} />
          ) : (
            <Text style={componentStyles.text3()}>{'No samples'}</Text>
          )
        }
        onRefresh={() => fetchSamplesToLocation(nearbyLocation)}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default Location;

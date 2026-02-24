import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AttractionsStackParamList} from '../../navigation/types';
import {citiesData} from '../../data';
import {colors, spacing, typography, borderRadius, shadows} from '../../theme';
import {strings} from '../../constants/strings';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.base * 2 - spacing.md) / 2;

type Props = {
  navigation: NativeStackNavigationProp<
    AttractionsStackParamList,
    'Attractions'
  >;
};

const cityColors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
];

const cityIcons = [
  'business',
  'flag',
  'sunny',
  'water',
  'boat',
];

export const AttractionsScreen: React.FC<Props> = ({navigation}) => {
  const featuredCity = citiesData[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.attractionsTitle}</Text>

        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CityDetail', {
              cityId: featuredCity.id,
              cityName: featuredCity.name,
            })
          }>
          <View style={[styles.featuredBg, {backgroundColor: cityColors[0]}]}>
            <Icon name={cityIcons[0]} size={80} color="rgba(255,255,255,0.3)" />
          </View>
          <View style={styles.featuredOverlay}>
            <View>
              <Text style={styles.featuredName}>{featuredCity.name}</Text>
              <Text style={styles.featuredEnglish}>
                {featuredCity.englishName}
              </Text>
            </View>
            <View style={styles.featuredTags}>
              {featuredCity.highlights.slice(0, 3).map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.featuredDesc} numberOfLines={2}>
              {featuredCity.description}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{strings.popularCities}</Text>
        </View>

        <View style={styles.cityGrid}>
          {citiesData.slice(1).map((city, index) => (
            <TouchableOpacity
              key={city.id}
              style={styles.cityCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('CityDetail', {
                  cityId: city.id,
                  cityName: city.name,
                })
              }>
              <View
                style={[
                  styles.cityBg,
                  {backgroundColor: cityColors[index + 1]},
                ]}>
                <Icon
                  name={cityIcons[index + 1]}
                  size={40}
                  color="rgba(255,255,255,0.3)"
                />
              </View>
              <View style={styles.cityOverlay}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityEnglish}>{city.englishName}</Text>
                <View style={styles.cityHighlights}>
                  {city.highlights.slice(0, 2).map(tag => (
                    <View key={tag} style={styles.smallTag}>
                      <Text style={styles.smallTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.cityArrow}>
                <Icon
                  name="arrow-forward-circle"
                  size={24}
                  color="rgba(255,255,255,0.8)"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  featuredCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    height: 200,
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  featuredBg: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.lg,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  featuredName: {
    ...typography.h1,
    color: colors.textInverse,
  },
  featuredEnglish: {
    ...typography.body,
    color: colors.textInverse,
    opacity: 0.8,
  },
  featuredTags: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  tagText: {
    ...typography.small,
    color: colors.textInverse,
    fontWeight: '600',
  },
  featuredDesc: {
    ...typography.caption,
    color: colors.textInverse,
    opacity: 0.9,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  cityCard: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  cityBg: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.md,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cityName: {
    ...typography.h3,
    color: colors.textInverse,
  },
  cityEnglish: {
    ...typography.small,
    color: colors.textInverse,
    opacity: 0.8,
    marginBottom: spacing.sm,
  },
  cityHighlights: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  smallTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  smallTagText: {
    ...typography.small,
    color: colors.textInverse,
    fontSize: 10,
  },
  cityArrow: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
});

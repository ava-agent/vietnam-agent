import React, {useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AttractionsStackParamList} from '../../navigation/types';
import {citiesData} from '../../data';
import {Card} from '../../components/common/Card';
import {SectionHeader} from '../../components/common/SectionHeader';
import {colors, spacing, typography, borderRadius} from '../../theme';
import {strings} from '../../constants/strings';

type Props = {
  navigation: NativeStackNavigationProp<
    AttractionsStackParamList,
    'CityDetail'
  >;
  route: RouteProp<AttractionsStackParamList, 'CityDetail'>;
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name={i <= rating ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-outline'}
        size={14}
        color={colors.secondary}
      />,
    );
  }
  return stars;
};

export const CityDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {cityId, cityName} = route.params;
  const city = citiesData.find(c => c.id === cityId);
  const [expandedAttraction, setExpandedAttraction] = React.useState<
    string | null
  >(null);

  const toggleAttraction = useCallback((attractionId: string) => {
    setExpandedAttraction(prev =>
      prev === attractionId ? null : attractionId,
    );
  }, []);

  if (!city) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.emptyState}>
          <Icon name="alert-circle-outline" size={48} color={colors.textTertiary} />
          <Text style={styles.emptyText}>{strings.dataNotFound}</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            accessibilityRole="button"
            accessibilityLabel={strings.goBack}
            onPress={() => navigation.goBack()}>
            <Text style={styles.emptyButtonText}>{strings.goBackToList}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={strings.goBack}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{cityName}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cityHeader}>
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.cityEnglish}>{city.englishName}</Text>
          <View style={styles.highlightRow}>
            {city.highlights.map(tag => (
              <View key={tag} style={styles.highlightTag}>
                <Text style={styles.highlightText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.cityDesc}>{city.description}</Text>
        </View>

        {/* Attractions Section */}
        <SectionHeader title={strings.topAttractions} />
        {city.attractions.map(attraction => (
          <TouchableOpacity
            key={attraction.id}
            style={styles.attractionCard}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`${attraction.name} ${attraction.englishName}`}
            onPress={() => toggleAttraction(attraction.id)}>
            <View style={styles.attractionHeader}>
              <View style={styles.attractionIcon}>
                <Icon name="location" size={20} color={colors.primary} />
              </View>
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>{attraction.name}</Text>
                <Text style={styles.attractionEnglish}>
                  {attraction.englishName}
                </Text>
                <View style={styles.ratingRow}>
                  {renderStars(attraction.rating)}
                  <Text style={styles.ratingText}> {attraction.rating}</Text>
                </View>
              </View>
              <View style={styles.attractionMeta}>
                <Text style={styles.metaText}>{attraction.duration}</Text>
                <Text style={styles.metaPrice}>{attraction.ticketPrice}</Text>
              </View>
            </View>

            {expandedAttraction === attraction.id && (
              <View style={styles.attractionDetail}>
                <Text style={styles.detailDesc}>
                  {attraction.description}
                </Text>
                <View style={styles.detailRow}>
                  <Icon
                    name="location-outline"
                    size={14}
                    color={colors.textTertiary}
                  />
                  <Text style={styles.detailText}>{attraction.address}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon
                    name="time-outline"
                    size={14}
                    color={colors.textTertiary}
                  />
                  <Text style={styles.detailText}>
                    {attraction.openingHours}
                  </Text>
                </View>
                {attraction.tips.length > 0 && (
                  <View style={styles.tipsBox}>
                    <Text style={styles.tipsLabel}>{strings.tipsLabel}</Text>
                    {attraction.tips.map((tip, idx) => (
                      <Text key={`tip-${idx}`} style={styles.tipItem}>
                        • {tip}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Food Section */}
        <SectionHeader title={strings.foodRecommendations} />
        {city.food.map(food => (
          <Card key={food.id} style={styles.foodCard}>
            <View style={styles.foodHeader}>
              <Text style={styles.foodName}>{food.name}</Text>
              <View style={styles.priceTag}>
                <Text style={styles.priceTagText}>{food.cnyEquivalent}</Text>
              </View>
            </View>
            <Text style={styles.foodDesc}>{food.description}</Text>
            <Text style={styles.foodPrice}>{food.priceRange}</Text>
            {food.tips.length > 0 && (
              <View style={styles.foodTips}>
                {food.tips.map((tip, idx) => (
                  <Text key={`ftip-${idx}`} style={styles.foodTipText}>
                    • {tip}
                  </Text>
                ))}
              </View>
            )}
          </Card>
        ))}

        {/* Transport Section */}
        <SectionHeader title={strings.transportGuide} />
        {city.transport.map(trans => (
          <Card key={trans.id} style={styles.transportCard}>
            <View style={styles.transportRow}>
              <View style={styles.transportIcon}>
                <Icon name={trans.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.transportInfo}>
                <Text style={styles.transportTitle}>{trans.title}</Text>
                <Text style={styles.transportContent}>{trans.content}</Text>
              </View>
            </View>
          </Card>
        ))}

        {/* Budget Section */}
        <SectionHeader title={strings.budgetReference} />
        <Card style={styles.budgetCard}>
          <View style={styles.budgetHeaderRow}>
            <Text style={[styles.budgetCell, styles.budgetHeaderCell]}>
              {strings.budgetCategory}
            </Text>
            <Text style={[styles.budgetCell, styles.budgetHeaderCell]}>
              {strings.budget}
            </Text>
            <Text style={[styles.budgetCell, styles.budgetHeaderCell]}>
              {strings.midRange}
            </Text>
            <Text style={[styles.budgetCell, styles.budgetHeaderCell]}>
              {strings.luxury}
            </Text>
          </View>
          {city.budget.map((item, idx) => (
            <View
              key={item.category}
              style={[
                styles.budgetRow,
                idx % 2 === 0 && styles.budgetRowAlt,
              ]}>
              <Text style={[styles.budgetCell, styles.budgetCategory]}>
                {item.category}
              </Text>
              <Text style={styles.budgetCell}>{item.lowBudget}</Text>
              <Text style={styles.budgetCell}>{item.midBudget}</Text>
              <Text style={styles.budgetCell}>{item.highBudget}</Text>
            </View>
          ))}
          <Text style={styles.budgetNote}>{strings.budgetNote}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  content: {
    padding: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  cityHeader: {
    marginBottom: spacing.lg,
  },
  cityName: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  cityEnglish: {
    ...typography.body,
    color: colors.textTertiary,
    marginBottom: spacing.md,
  },
  highlightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  highlightTag: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  highlightText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  cityDesc: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  attractionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  attractionHeader: {
    flexDirection: 'row',
    padding: spacing.base,
    alignItems: 'center',
  },
  attractionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  attractionInfo: {
    flex: 1,
  },
  attractionName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  attractionEnglish: {
    ...typography.small,
    color: colors.textTertiary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  ratingText: {
    ...typography.small,
    color: colors.secondary,
    fontWeight: '600',
  },
  attractionMeta: {
    alignItems: 'flex-end',
  },
  metaText: {
    ...typography.small,
    color: colors.textTertiary,
  },
  metaPrice: {
    ...typography.captionBold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  attractionDetail: {
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
  },
  detailDesc: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  detailText: {
    ...typography.caption,
    color: colors.textTertiary,
    flex: 1,
  },
  tipsBox: {
    marginTop: spacing.md,
    backgroundColor: colors.secondaryLight + '20',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  tipsLabel: {
    ...typography.captionBold,
    color: colors.secondaryDark,
    marginBottom: spacing.sm,
  },
  tipItem: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  foodCard: {
    padding: spacing.base,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  foodName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    flex: 1,
  },
  priceTag: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  priceTagText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  foodDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  foodPrice: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  foodTips: {
    marginTop: spacing.xs,
  },
  foodTipText: {
    ...typography.small,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  transportCard: {
    padding: spacing.base,
  },
  transportRow: {
    flexDirection: 'row',
  },
  transportIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  transportInfo: {
    flex: 1,
  },
  transportTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  transportContent: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  budgetCard: {
    padding: spacing.md,
  },
  budgetHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  budgetRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
  },
  budgetRowAlt: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
  },
  budgetCell: {
    flex: 1,
    ...typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  budgetHeaderCell: {
    ...typography.captionBold,
    color: colors.primary,
  },
  budgetCategory: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  budgetNote: {
    ...typography.small,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textTertiary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  emptyButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
});

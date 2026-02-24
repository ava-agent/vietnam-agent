import React, {useState} from 'react';
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
import {ChecklistStackParamList} from '../../navigation/types';
import {useChecklist} from '../../context/ChecklistContext';
import {checklistData} from '../../data';
import {Badge} from '../../components/common/Badge';
import {colors, spacing, typography, borderRadius} from '../../theme';
import {strings} from '../../constants/strings';

type Props = {
  navigation: NativeStackNavigationProp<
    ChecklistStackParamList,
    'ChecklistDetail'
  >;
  route: RouteProp<ChecklistStackParamList, 'ChecklistDetail'>;
};

export const ChecklistDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const {categoryId, categoryName} = route.params;
  const {
    checkedItems,
    toggleItem,
    checkAllInCategory,
    uncheckAllInCategory,
    getProgressForCategory,
  } = useChecklist();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const category = checklistData.find(c => c.id === categoryId);
  if (!category) {
    return null;
  }

  const progress = getProgressForCategory(categoryId);
  const percent =
    progress.total > 0
      ? Math.round((progress.checked / progress.total) * 100)
      : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {progress.checked}/{progress.total} 已准备
          </Text>
          <Text style={styles.progressPercent}>{percent}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {width: `${percent}%`, backgroundColor: category.color},
            ]}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {category.items.map(item => {
          const isChecked = !!checkedItems[item.id];
          const isTipExpanded = expandedTip === item.id;

          return (
            <View key={item.id} style={styles.itemCard}>
              <TouchableOpacity
                style={styles.itemRow}
                activeOpacity={0.7}
                onPress={() => toggleItem(item.id)}>
                <View
                  style={[
                    styles.checkbox,
                    isChecked && {
                      backgroundColor: category.color,
                      borderColor: category.color,
                    },
                  ]}>
                  {isChecked && (
                    <Icon name="checkmark" size={16} color={colors.textInverse} />
                  )}
                </View>
                <View style={styles.itemInfo}>
                  <View style={styles.itemNameRow}>
                    <Text
                      style={[
                        styles.itemName,
                        isChecked && styles.itemNameChecked,
                      ]}>
                      {item.name}
                    </Text>
                    {item.essential && (
                      <Badge
                        text={strings.essential}
                        backgroundColor={colors.accent + '20'}
                        color={colors.accent}
                      />
                    )}
                  </View>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                {item.tip && (
                  <TouchableOpacity
                    onPress={() =>
                      setExpandedTip(isTipExpanded ? null : item.id)
                    }
                    style={styles.tipButton}>
                    <Icon
                      name="information-circle-outline"
                      size={20}
                      color={colors.info}
                    />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              {item.tip && isTipExpanded && (
                <View style={styles.tipBubble}>
                  <Icon
                    name="bulb-outline"
                    size={16}
                    color={colors.secondaryDark}
                  />
                  <Text style={styles.tipText}>{item.tip}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, {backgroundColor: category.color}]}
          onPress={() => checkAllInCategory(categoryId)}>
          <Text style={styles.footerButtonText}>{strings.checkAll}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonOutline]}
          onPress={() => uncheckAllInCategory(categoryId)}>
          <Text
            style={[styles.footerButtonText, {color: colors.textSecondary}]}>
            {strings.uncheckAll}
          </Text>
        </TouchableOpacity>
      </View>
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
  progressSection: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  progressPercent: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  progressBarFill: {
    height: 6,
    borderRadius: borderRadius.full,
  },
  content: {
    padding: spacing.base,
    paddingBottom: 100,
  },
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },
  itemDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tipButton: {
    padding: spacing.xs,
  },
  tipBubble: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryLight + '30',
    padding: spacing.md,
    marginHorizontal: spacing.base,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  tipText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.base,
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  footerButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  footerButtonOutline: {
    backgroundColor: colors.borderLight,
  },
  footerButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
});

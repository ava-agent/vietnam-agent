import React from 'react';
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
import {ChecklistStackParamList} from '../../navigation/types';
import {useChecklist} from '../../context/ChecklistContext';
import {checklistData} from '../../data';
import {Card} from '../../components/common/Card';
import {SectionHeader} from '../../components/common/SectionHeader';
import {colors, spacing, typography, borderRadius} from '../../theme';
import {strings} from '../../constants/strings';

type Props = {
  navigation: NativeStackNavigationProp<ChecklistStackParamList, 'Checklist'>;
};

export const ChecklistScreen: React.FC<Props> = ({navigation}) => {
  const {getProgressForCategory, getTotalProgress} = useChecklist();
  const totalProgress = getTotalProgress();
  const totalPercent =
    totalProgress.total > 0
      ? Math.round((totalProgress.checked / totalProgress.total) * 100)
      : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.checklistTitle}</Text>
        <Text style={styles.subtitle}>{strings.checklistSubtitle}</Text>

        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>{strings.overallProgress}</Text>
            <Text style={styles.progressText}>
              {totalProgress.checked}/{totalProgress.total}
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, {width: `${totalPercent}%`}]}
            />
          </View>
          <Text style={styles.progressPercent}>{totalPercent}%</Text>
        </Card>

        <SectionHeader title="物品分类" />

        {checklistData.map(category => {
          const progress = getProgressForCategory(category.id);
          const percent =
            progress.total > 0
              ? Math.round((progress.checked / progress.total) * 100)
              : 0;

          return (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('ChecklistDetail', {
                  categoryId: category.id,
                  categoryName: category.name,
                })
              }>
              <View
                style={[styles.iconContainer, {backgroundColor: category.color + '15'}]}>
                <Icon name={category.icon} size={24} color={category.color} />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.categoryProgressBg}>
                  <View
                    style={[
                      styles.categoryProgressFill,
                      {
                        width: `${percent}%`,
                        backgroundColor: category.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.categoryCount}>
                  {progress.checked}/{progress.total} 已准备
                </Text>
              </View>
              <Icon
                name="chevron-forward"
                size={20}
                color={colors.textTertiary}
              />
            </TouchableOpacity>
          );
        })}
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
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  progressCard: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    ...typography.bodyBold,
    color: colors.textInverse,
  },
  progressText: {
    ...typography.body,
    color: colors.textInverse,
    opacity: 0.9,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: borderRadius.full,
    marginTop: spacing.md,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
  },
  progressPercent: {
    ...typography.caption,
    color: colors.textInverse,
    opacity: 0.9,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  categoryProgressBg: {
    height: 4,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  categoryProgressFill: {
    height: 4,
    borderRadius: borderRadius.full,
  },
  categoryCount: {
    ...typography.small,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
});

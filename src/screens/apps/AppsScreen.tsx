import React, {useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Badge} from '../../components/common/Badge';
import {SectionHeader} from '../../components/common/SectionHeader';
import {useAppFilter} from '../../hooks/useAppFilter';
import {recommendedApps} from '../../data';
import {colors, spacing, typography, borderRadius, shadows} from '../../theme';
import {strings} from '../../constants/strings';

export const AppsScreen: React.FC = () => {
  const {selectedCategory, setSelectedCategory, filteredApps, categories} =
    useAppFilter(recommendedApps);
  const [expandedApp, setExpandedApp] = React.useState<string | null>(null);

  const handleDownload = useCallback((iosUrl: string, androidUrl: string) => {
    const url = Platform.select({ios: iosUrl, android: androidUrl}) ?? iosUrl;
    Linking.openURL(url).catch(() => {
      Alert.alert(strings.linkOpenFailed);
    });
  }, []);

  const toggleApp = useCallback((appId: string) => {
    setExpandedApp(prev => (prev === appId ? null : appId));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.appsTitle}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.filterChip,
                selectedCategory === cat.key && styles.filterChipActive,
              ]}
              accessibilityRole="button"
              accessibilityState={{selected: selectedCategory === cat.key}}
              accessibilityLabel={cat.label}
              onPress={() => setSelectedCategory(cat.key)}>
              <Text
                style={[
                  styles.filterChipText,
                  selectedCategory === cat.key && styles.filterChipTextActive,
                ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <SectionHeader
          title={strings.recommendedAppsCount(filteredApps.length)}
          subtitle={strings.tapToSeeTips}
        />

        {filteredApps.map(app => (
          <TouchableOpacity
            key={app.id}
            style={styles.appCard}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`${app.name} ${app.chineseName}`}
            onPress={() => toggleApp(app.id)}>
            <View style={styles.appRow}>
              <View style={styles.appIconContainer}>
                <Icon name={app.icon} size={28} color={colors.primary} />
              </View>
              <View style={styles.appInfo}>
                <View style={styles.appNameRow}>
                  <Text style={styles.appName}>{app.name}</Text>
                  {app.essential && (
                    <Badge
                      text={strings.essential}
                      backgroundColor={colors.accent + '20'}
                      color={colors.accent}
                    />
                  )}
                </View>
                <Text style={styles.appChineseName}>{app.chineseName}</Text>
                <Text style={styles.appCategory}>{app.categoryLabel}</Text>
              </View>
              <TouchableOpacity
                style={styles.downloadButton}
                accessibilityRole="button"
                accessibilityLabel={`${strings.download} ${app.name}`}
                onPress={() => handleDownload(app.iosUrl, app.androidUrl)}>
                <Text style={styles.downloadText}>{strings.download}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.appDescription}>{app.description}</Text>

            {expandedApp === app.id && app.tips.length > 0 && (
              <View style={styles.tipsSection}>
                <Text style={styles.tipsTitle}>{strings.usageTips}</Text>
                {app.tips.map((tip, index) => (
                  <View key={`tip-${index}`} style={styles.tipRow}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
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
  filterRow: {
    marginBottom: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.textInverse,
    fontWeight: '600',
  },
  appCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  appIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  appInfo: {
    flex: 1,
  },
  appNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  appName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  appChineseName: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  appCategory: {
    ...typography.small,
    color: colors.textTertiary,
  },
  downloadButton: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  downloadText: {
    ...typography.captionBold,
    color: colors.textInverse,
  },
  appDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tipsSection: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primaryLight + '10',
    borderRadius: borderRadius.md,
  },
  tipsTitle: {
    ...typography.captionBold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  tipBullet: {
    ...typography.caption,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  tipText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
});

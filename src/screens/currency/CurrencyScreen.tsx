import React, {useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from '../../components/common/Card';
import {SectionHeader} from '../../components/common/SectionHeader';
import {useCurrencyConverter} from '../../hooks/useCurrencyConverter';
import {exchangeRate, quickAmounts, priceReferences, exchangeTips} from '../../data';
import {formatVND, formatCNY} from '../../utils/formatCurrency';
import {colors, spacing, typography, borderRadius, shadows} from '../../theme';
import {strings} from '../../constants/strings';

export const CurrencyScreen: React.FC = () => {
  const {cnyAmount, setCnyAmount, vndAmount, setQuickAmount} =
    useCurrencyConverter(exchangeRate.rate);
  const [expandedTip, setExpandedTip] = React.useState<string | null>(null);

  const toggleTip = useCallback((tipId: string) => {
    setExpandedTip(prev => (prev === tipId ? null : tipId));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{strings.currencyTitle}</Text>

        <Card style={styles.converterCard}>
          <Text style={styles.inputLabel}>{strings.cnyLabel}</Text>
          <View style={styles.inputRow}>
            <Text style={styles.currencySymbol}>¥</Text>
            <TextInput
              style={styles.input}
              value={cnyAmount}
              onChangeText={setCnyAmount}
              placeholder={strings.inputPlaceholder}
              placeholderTextColor={colors.textTertiary}
              keyboardType="decimal-pad"
              accessibilityLabel={strings.cnyLabel}
              accessibilityHint={strings.inputPlaceholder}
            />
          </View>

          <View style={styles.swapIconContainer}>
            <View style={styles.swapIcon}>
              <Icon name="swap-vertical" size={20} color={colors.primary} />
            </View>
          </View>

          <Text style={styles.inputLabel}>{strings.vndLabel}</Text>
          <View style={styles.resultRow}>
            <Text style={styles.currencySymbol}>₫</Text>
            <Text style={styles.resultText}>
              {vndAmount > 0 ? formatVND(vndAmount, false) : '0'}
            </Text>
          </View>

          <Text style={styles.rateText}>
            {strings.currentRate}: 1 CNY ≈{' '}
            {exchangeRate.rate.toLocaleString()} VND
          </Text>
        </Card>

        <SectionHeader title={strings.quickConvert} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickRow}>
          {quickAmounts.map(item => (
            <TouchableOpacity
              key={item.cny}
              style={[
                styles.quickButton,
                cnyAmount === item.cny.toString() && styles.quickButtonActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={() => setQuickAmount(item.cny)}>
              <Text
                style={[
                  styles.quickButtonText,
                  cnyAmount === item.cny.toString() &&
                    styles.quickButtonTextActive,
                ]}>
                {item.label}
              </Text>
              <Text
                style={[
                  styles.quickButtonSub,
                  cnyAmount === item.cny.toString() &&
                    styles.quickButtonSubActive,
                ]}>
                {formatVND(item.cny * exchangeRate.rate)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <SectionHeader title={strings.priceReference} />
        <View style={styles.priceGrid}>
          {priceReferences.map(ref => (
            <View key={ref.id} style={styles.priceCard}>
              <Text style={styles.priceIcon}>{ref.icon}</Text>
              <Text style={styles.priceName}>{ref.name}</Text>
              <Text style={styles.priceVnd}>
                {ref.vndPrice.toLocaleString()} ₫
              </Text>
              <Text style={styles.priceCny}>≈ {formatCNY(ref.cnyEquivalent)}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title={strings.exchangeTips} />
        {exchangeTips.map(tip => (
          <TouchableOpacity
            key={tip.id}
            style={styles.tipCard}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={tip.title}
            onPress={() => toggleTip(tip.id)}>
            <View style={styles.tipHeader}>
              <Icon name={tip.icon} size={20} color={colors.primary} />
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Icon
                name={expandedTip === tip.id ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={colors.textTertiary}
              />
            </View>
            {expandedTip === tip.id && (
              <Text style={styles.tipContent}>{tip.content}</Text>
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
  converterCard: {
    padding: spacing.lg,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  currencySymbol: {
    ...typography.h2,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.h2,
    color: colors.textPrimary,
    padding: 0,
  },
  swapIconContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  swapIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  resultText: {
    flex: 1,
    ...typography.h2,
    color: colors.primary,
  },
  rateText: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  quickRow: {
    marginBottom: spacing.lg,
  },
  quickButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    marginRight: spacing.sm,
    alignItems: 'center',
    minWidth: 90,
    ...shadows.sm,
  },
  quickButtonActive: {
    backgroundColor: colors.primary,
  },
  quickButtonText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  quickButtonTextActive: {
    color: colors.textInverse,
  },
  quickButtonSub: {
    ...typography.small,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  quickButtonSubActive: {
    color: colors.textInverse,
    opacity: 0.8,
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  priceCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: '48%',
    alignItems: 'center',
    ...shadows.sm,
  },
  priceIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  priceName: {
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  priceVnd: {
    ...typography.captionBold,
    color: colors.primary,
  },
  priceCny: {
    ...typography.small,
    color: colors.textTertiary,
  },
  tipCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tipTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    flex: 1,
  },
  tipContent: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    lineHeight: 22,
  },
});

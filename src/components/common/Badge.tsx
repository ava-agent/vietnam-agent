import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, borderRadius, spacing, typography} from '../../theme';

interface BadgeProps {
  text: string;
  color?: string;
  backgroundColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  color = colors.textInverse,
  backgroundColor = colors.accent,
}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.text, {color}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.small,
    fontWeight: '600',
  },
});

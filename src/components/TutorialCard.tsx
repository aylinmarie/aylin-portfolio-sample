import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, Chip, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Tutorial} from '@data/tutorials';
import {AppTheme} from '@theme/index';

interface Props {
  tutorial: Tutorial;
  onPress: () => void;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: '#10B981',
  Intermediate: '#F59E0B',
  Advanced: '#EF4444',
};

export default function TutorialCard({tutorial, onPress}: Props) {
  const theme = useTheme<AppTheme>();
  const diffColor = DIFFICULTY_COLOR[tutorial.difficulty] ?? '#8B5CF6';

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
          opacity: pressed ? 0.9 : 1,
          transform: [{scale: pressed ? 0.98 : 1}],
        },
      ]}>
      {/* Thumbnail placeholder */}
      <View
        style={[styles.thumbnail, {backgroundColor: tutorial.thumbnailColor}]}>
        {tutorial.videoUrl ? (
          <Icon name="play-circle" size={40} color="rgba(255,255,255,0.9)" />
        ) : (
          <View style={styles.comingSoon}>
            <Icon name="clock-outline" size={24} color="rgba(255,255,255,0.8)" />
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        )}
        <View style={styles.durationBadge}>
          <Icon name="clock-fast" size={12} color="#fff" />
          <Text style={styles.durationText}>{tutorial.duration}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text
            variant="titleSmall"
            style={[styles.title, {color: theme.colors.onSurface}]}
            numberOfLines={2}>
            {tutorial.title}
          </Text>
        </View>

        <Text
          variant="bodySmall"
          style={[styles.description, {color: theme.colors.onSurfaceVariant}]}
          numberOfLines={2}>
          {tutorial.description}
        </Text>

        <View style={styles.footer}>
          <Chip
            compact
            textStyle={[styles.diffText, {color: diffColor}]}
            style={[styles.diffChip, {borderColor: diffColor}]}
            mode="outlined">
            {tutorial.difficulty}
          </Chip>
          <Icon
            name="chevron-right"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  comingSoon: {
    alignItems: 'center',
    gap: 4,
  },
  comingSoonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    gap: 3,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  info: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    marginBottom: 4,
  },
  title: {
    fontWeight: '700',
    lineHeight: 20,
  },
  description: {
    lineHeight: 18,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  diffChip: {
    height: 24,
    backgroundColor: 'transparent',
  },
  diffText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

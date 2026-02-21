import React, {useRef} from 'react';
import {View, StyleSheet, Pressable, Animated} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Counter} from '@hooks/useCounters';
import {AppTheme} from '@theme/index';

interface Props {
  counter: Counter;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onLongPress: () => void;
}

export default function CounterCard({
  counter,
  onIncrement,
  onDecrement,
  onReset,
  onLongPress,
}: Props) {
  const theme = useTheme<AppTheme>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const progress =
    counter.goal && counter.goal > 0
      ? Math.min(counter.value / counter.goal, 1)
      : null;

  const animatePress = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    callback();
  };

  const isGoalReached = progress !== null && progress >= 1;

  return (
    <Animated.View style={[{transform: [{scale: scaleAnim}]}]}>
      <Pressable onLongPress={onLongPress} delayLongPress={500}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: isGoalReached ? counter.color : theme.colors.outline,
              borderWidth: isGoalReached ? 2 : 1,
            },
          ]}>
          {/* Color accent bar */}
          <View style={[styles.accentBar, {backgroundColor: counter.color}]} />

          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text
                variant="titleMedium"
                style={[styles.name, {color: theme.colors.onSurface}]}
                numberOfLines={1}>
                {counter.name}
              </Text>
              {counter.goal && (
                <Text
                  variant="bodySmall"
                  style={{color: theme.colors.onSurfaceVariant}}>
                  Goal: {counter.goal}
                </Text>
              )}
              <Pressable onPress={onReset} style={styles.resetBtn} hitSlop={12}>
                <Icon
                  name="refresh"
                  size={18}
                  color={theme.colors.onSurfaceVariant}
                />
              </Pressable>
            </View>

            {/* Progress bar */}
            {progress !== null && (
              <View
                style={[
                  styles.progressTrack,
                  {backgroundColor: theme.colors.surfaceVariant},
                ]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: isGoalReached
                        ? '#10B981'
                        : counter.color,
                      width: `${progress * 100}%`,
                    },
                  ]}
                />
              </View>
            )}

            {/* Counter controls */}
            <View style={styles.controls}>
              <Pressable
                style={[
                  styles.controlBtn,
                  styles.decrementBtn,
                  {
                    backgroundColor: theme.colors.surfaceVariant,
                    opacity: counter.value === 0 ? 0.4 : 1,
                  },
                ]}
                onPress={() => animatePress(onDecrement)}
                disabled={counter.value === 0}>
                <Icon
                  name="minus"
                  size={26}
                  color={theme.colors.onSurfaceVariant}
                />
              </Pressable>

              <View style={styles.valueContainer}>
                <Text
                  style={[
                    styles.value,
                    {color: isGoalReached ? '#10B981' : counter.color},
                  ]}>
                  {counter.value}
                </Text>
                {isGoalReached && (
                  <Icon name="check-circle" size={20} color="#10B981" />
                )}
              </View>

              <Pressable
                style={[
                  styles.controlBtn,
                  styles.incrementBtn,
                  {backgroundColor: counter.color},
                ]}
                onPress={() => animatePress(onIncrement)}>
                <Icon name="plus" size={26} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  name: {
    flex: 1,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  resetBtn: {
    padding: 4,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementBtn: {},
  incrementBtn: {},
  valueContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  value: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -2,
    lineHeight: 56,
  },
});

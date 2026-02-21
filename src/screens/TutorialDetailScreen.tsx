import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Chip,
  Button,
  Divider,
  useTheme,
  Surface,
} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {KnowledgeBaseStackParamList} from '@navigation/AppNavigator';
import {AppTheme} from '@theme/index';

type RouteType = RouteProp<KnowledgeBaseStackParamList, 'TutorialDetail'>;

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: '#10B981',
  Intermediate: '#F59E0B',
  Advanced: '#EF4444',
};

const DIFFICULTY_ICON: Record<string, string> = {
  Beginner: 'signal-cellular-1',
  Intermediate: 'signal-cellular-2',
  Advanced: 'signal-cellular-3',
};

export default function TutorialDetailScreen() {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteType>();
  const {tutorial} = route.params;

  const diffColor = DIFFICULTY_COLOR[tutorial.difficulty] ?? '#8B5CF6';
  const diffIcon = DIFFICULTY_ICON[tutorial.difficulty] ?? 'signal-cellular-1';

  const handleWatch = async () => {
    if (!tutorial.videoUrl) {
      Alert.alert(
        'Coming Soon',
        'The Woolen Gang video link for this tutorial will be added soon. Check back after the channel is connected!',
        [{text: 'Got it', style: 'default'}],
      );
      return;
    }
    try {
      const supported = await Linking.canOpenURL(tutorial.videoUrl);
      if (supported) {
        await Linking.openURL(tutorial.videoUrl);
      } else {
        Alert.alert('Error', 'Cannot open this video URL.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong opening the video.');
    }
  };

  return (
    <View
      style={[styles.root, {backgroundColor: theme.colors.background}]}>
      {/* Back button */}
      <View
        style={[
          styles.navBar,
          {
            paddingTop: insets.top + 8,
            backgroundColor: theme.colors.background,
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backBtn,
            {backgroundColor: theme.colors.surfaceVariant},
          ]}
          hitSlop={12}>
          <Icon
            name="arrow-left"
            size={22}
            color={theme.colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {paddingBottom: insets.bottom + 32},
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Thumbnail / video area */}
        <View
          style={[
            styles.thumbnailHero,
            {backgroundColor: tutorial.thumbnailColor},
          ]}>
          {tutorial.videoUrl ? (
            <TouchableOpacity
              style={styles.playOverlay}
              onPress={handleWatch}
              activeOpacity={0.8}>
              <View style={styles.playCircle}>
                <Icon name="play" size={36} color={tutorial.thumbnailColor} />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.comingSoonHero}>
              <Icon
                name="clock-time-five-outline"
                size={52}
                color="rgba(255,255,255,0.7)"
              />
              <Text style={styles.comingSoonHeroText}>Video Coming Soon</Text>
              <Text style={styles.comingSoonSubText}>Woolen Gang</Text>
            </View>
          )}

          {/* Duration badge */}
          <View style={styles.durationBadge}>
            <Icon name="clock-fast" size={13} color="#fff" />
            <Text style={styles.durationText}>{tutorial.duration}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Category + difficulty row */}
          <View style={styles.metaRow}>
            <Chip
              compact
              icon={({size}) => (
                <Icon name={diffIcon} size={size - 2} color={diffColor} />
              )}
              textStyle={{color: diffColor, fontWeight: '700', fontSize: 12}}
              style={[styles.metaChip, {borderColor: diffColor}]}
              mode="outlined">
              {tutorial.difficulty}
            </Chip>
            <Chip
              compact
              textStyle={{
                color: theme.colors.onSurfaceVariant,
                fontSize: 12,
              }}
              style={[
                styles.metaChip,
                {backgroundColor: theme.colors.surfaceVariant},
              ]}>
              {tutorial.category
                .replace('-', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())}
            </Chip>
          </View>

          {/* Title */}
          <Text
            variant="headlineSmall"
            style={[styles.title, {color: theme.colors.onSurface}]}>
            {tutorial.title}
          </Text>

          {/* Description */}
          <Text
            variant="bodyLarge"
            style={[styles.description, {color: theme.colors.onSurfaceVariant}]}>
            {tutorial.description}
          </Text>

          <Divider style={{marginVertical: 20}} />

          {/* Tags */}
          <Text
            variant="labelLarge"
            style={[styles.sectionLabel, {color: theme.colors.onSurface}]}>
            Topics covered
          </Text>
          <View style={styles.tags}>
            {tutorial.tags.map(tag => (
              <Chip
                key={tag}
                compact
                style={[
                  styles.tag,
                  {backgroundColor: theme.colors.primaryContainer},
                ]}
                textStyle={{
                  color: theme.colors.onPrimaryContainer,
                  fontSize: 12,
                }}>
                {tag}
              </Chip>
            ))}
          </View>

          <Divider style={{marginVertical: 20}} />

          {/* Woolen Gang attribution */}
          <Surface
            style={[styles.attribution, {backgroundColor: theme.colors.surface}]}
            elevation={1}>
            <Icon
              name="yarn"
              size={28}
              color={theme.colors.primary}
              style={{marginRight: 12}}
            />
            <View style={{flex: 1}}>
              <Text
                variant="labelLarge"
                style={{color: theme.colors.onSurface, fontWeight: '700'}}>
                Woolen Gang
              </Text>
              <Text
                variant="bodySmall"
                style={{color: theme.colors.onSurfaceVariant, marginTop: 2}}>
                Video tutorials curated from the Woolen Gang YouTube channel.
                Link will be added once connected.
              </Text>
            </View>
          </Surface>

          {/* Watch button */}
          <Button
            mode="contained"
            icon={tutorial.videoUrl ? 'play' : 'clock-outline'}
            style={[
              styles.watchBtn,
              {
                backgroundColor: tutorial.videoUrl
                  ? theme.colors.primary
                  : theme.colors.surfaceVariant,
              },
            ]}
            labelStyle={{
              fontSize: 16,
              fontWeight: '700',
              color: tutorial.videoUrl ? '#fff' : theme.colors.onSurfaceVariant,
            }}
            contentStyle={{height: 52}}
            onPress={handleWatch}>
            {tutorial.videoUrl ? 'Watch Tutorial' : 'Video Coming Soon'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  navBar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {},
  thumbnailHero: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  playOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  comingSoonHero: {
    alignItems: 'center',
    gap: 8,
  },
  comingSoonHeroText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  comingSoonSubText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    padding: 20,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  metaChip: {
    borderRadius: 8,
  },
  title: {
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 10,
    lineHeight: 32,
  },
  description: {
    lineHeight: 26,
  },
  sectionLabel: {
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 8,
  },
  attribution: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  watchBtn: {
    borderRadius: 16,
  },
});

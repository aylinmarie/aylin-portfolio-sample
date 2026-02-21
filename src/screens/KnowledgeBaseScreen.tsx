import React, {useState, useMemo} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {
  Text,
  Searchbar,
  Chip,
  useTheme,
  Banner,
  Button,
} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TutorialCard from '@components/TutorialCard';
import {TUTORIALS, CATEGORIES, Tutorial} from '@data/tutorials';
import {KnowledgeBaseStackParamList} from '@navigation/AppNavigator';
import {AppTheme} from '@theme/index';

type NavProp = NativeStackNavigationProp<
  KnowledgeBaseStackParamList,
  'KnowledgeBaseHome'
>;

export default function KnowledgeBaseScreen() {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bannerVisible, setBannerVisible] = useState(true);

  const filteredTutorials = useMemo<Tutorial[]>(() => {
    const query = searchQuery.toLowerCase().trim();
    return TUTORIALS.filter(t => {
      const matchesCategory =
        selectedCategory === 'all' || t.category === selectedCategory;
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <View
      style={[styles.root, {backgroundColor: theme.colors.background}]}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 16,
            backgroundColor: theme.colors.background,
          },
        ]}>
        <Text
          variant="headlineMedium"
          style={[styles.headerTitle, {color: theme.colors.onBackground}]}>
          Learn to Knit
        </Text>
        <Text
          variant="bodySmall"
          style={{color: theme.colors.onSurfaceVariant}}>
          {filteredTutorials.length} tutorial
          {filteredTutorials.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Woolen Gang banner */}
      <Banner
        visible={bannerVisible}
        icon={({size}) => (
          <Icon name="youtube" size={size} color="#FF0000" />
        )}
        actions={[
          {
            label: 'Dismiss',
            onPress: () => setBannerVisible(false),
          },
        ]}
        style={{backgroundColor: theme.colors.primaryContainer}}>
        <Text
          variant="bodySmall"
          style={{color: theme.colors.onPrimaryContainer}}>
          Video tutorials from{' '}
          <Text style={{fontWeight: '700'}}>Woolen Gang</Text> are coming soon!
          Links will be added once the channel is connected.
        </Text>
      </Banner>

      {/* Search */}
      <Searchbar
        placeholder="Search stitches, techniques..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[styles.search, {backgroundColor: theme.colors.surfaceVariant}]}
        inputStyle={{fontSize: 15}}
        iconColor={theme.colors.primary}
        clearIcon="close-circle"
      />

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}>
        {CATEGORIES.map(cat => {
          const active = selectedCategory === cat.id;
          return (
            <Chip
              key={cat.id}
              selected={active}
              onPress={() => setSelectedCategory(cat.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: active
                    ? cat.color
                    : theme.colors.surfaceVariant,
                },
              ]}
              textStyle={[
                styles.chipLabel,
                {color: active ? '#FFFFFF' : theme.colors.onSurfaceVariant},
              ]}
              icon={({size}) => (
                <Icon
                  name={cat.icon}
                  size={size - 2}
                  color={active ? '#FFFFFF' : theme.colors.onSurfaceVariant}
                />
              )}>
              {cat.label}
            </Chip>
          );
        })}
      </ScrollView>

      {/* Tutorial list */}
      {filteredTutorials.length === 0 ? (
        <View style={styles.empty}>
          <Icon
            name="magnify-close"
            size={64}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            variant="titleMedium"
            style={[styles.emptyTitle, {color: theme.colors.onSurface}]}>
            No tutorials found
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.emptyBody, {color: theme.colors.onSurfaceVariant}]}>
            Try a different search term or category.
          </Text>
          <Button
            mode="outlined"
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            style={{marginTop: 8}}>
            Clear filters
          </Button>
        </View>
      ) : (
        <FlatList
          data={filteredTutorials}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.list,
            {paddingBottom: insets.bottom + 20},
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TutorialCard
              tutorial={item}
              onPress={() =>
                navigation.navigate('TutorialDetail', {tutorial: item})
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  search: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    elevation: 0,
  },
  chipRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    borderRadius: 20,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    paddingTop: 4,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 10,
  },
  emptyTitle: {
    fontWeight: '700',
    marginTop: 8,
  },
  emptyBody: {
    textAlign: 'center',
    lineHeight: 22,
  },
});

import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {
  Text,
  FAB,
  useTheme,
  Snackbar,
  Button,
} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CounterCard from '@components/CounterCard';
import CounterModal from '@components/CounterModal';
import {useCounters, Counter} from '@hooks/useCounters';
import {AppTheme} from '@theme/index';

export default function CounterScreen() {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const {
    counters,
    loading,
    addCounter,
    increment,
    decrement,
    reset,
    resetAll,
    updateCounter,
    removeCounter,
  } = useCounters();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editingCounter, setEditingCounter] = useState<Counter | null>(null);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackVisible, setSnackVisible] = useState(false);

  const showSnack = (msg: string) => {
    setSnackMessage(msg);
    setSnackVisible(true);
  };

  const handleLongPress = useCallback((counter: Counter) => {
    setEditingCounter(counter);
  }, []);

  const handleSaveEdit = useCallback(
    (name: string, goal: number | null) => {
      if (editingCounter) {
        updateCounter(editingCounter.id, {name, goal});
        showSnack('Counter updated');
      }
      setEditingCounter(null);
    },
    [editingCounter, updateCounter],
  );

  const handleDelete = useCallback(() => {
    if (editingCounter) {
      removeCounter(editingCounter.id);
      showSnack('Counter removed');
    }
    setEditingCounter(null);
  }, [editingCounter, removeCounter]);

  const handleReset = useCallback(
    (id: string, name: string) => {
      reset(id);
      showSnack(`${name} reset to 0`);
    },
    [reset],
  );

  const totalCount = counters.reduce((sum, c) => sum + c.value, 0);
  const allGoalsComplete =
    counters.length > 0 &&
    counters.every(c => c.goal !== null && c.value >= c.goal);

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
        <View>
          <Text
            variant="headlineMedium"
            style={[styles.headerTitle, {color: theme.colors.onBackground}]}>
            Knit Counter
          </Text>
          {!loading && counters.length > 0 && (
            <Text
              variant="bodySmall"
              style={{color: theme.colors.onSurfaceVariant}}>
              {allGoalsComplete
                ? '🎉 All goals reached!'
                : `${totalCount} total counts across ${counters.length} counter${counters.length !== 1 ? 's' : ''}`}
            </Text>
          )}
        </View>

        {counters.length > 1 && (
          <Button
            mode="text"
            compact
            icon="refresh"
            textColor={theme.colors.onSurfaceVariant}
            onPress={() => {
              resetAll();
              showSnack('All counters reset');
            }}>
            Reset All
          </Button>
        )}
      </View>

      {/* Counters list */}
      {loading ? null : counters.length === 0 ? (
        <View style={styles.empty}>
          <Icon
            name="counter"
            size={72}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            variant="titleMedium"
            style={[styles.emptyTitle, {color: theme.colors.onSurface}]}>
            No counters yet
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.emptyBody, {color: theme.colors.onSurfaceVariant}]}>
            Tap the + button to add your first counter.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.list,
            {paddingBottom: insets.bottom + 100},
          ]}
          showsVerticalScrollIndicator={false}>
          {counters.map(counter => (
            <CounterCard
              key={counter.id}
              counter={counter}
              onIncrement={() => increment(counter.id)}
              onDecrement={() => decrement(counter.id)}
              onReset={() => handleReset(counter.id, counter.name)}
              onLongPress={() => handleLongPress(counter)}
            />
          ))}

          {/* Long-press hint */}
          <Text
            variant="bodySmall"
            style={[styles.hint, {color: theme.colors.onSurfaceVariant}]}>
            Long-press a counter to edit or delete
          </Text>
        </ScrollView>
      )}

      {/* FAB */}
      <FAB
        icon="plus"
        label="Add Counter"
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            bottom: insets.bottom + 100,
          },
        ]}
        color="#FFFFFF"
        onPress={() => setAddModalVisible(true)}
        variant="extended"
      />

      {/* Add Modal */}
      <CounterModal
        mode="add"
        visible={addModalVisible}
        onDismiss={() => setAddModalVisible(false)}
        onAdd={(name, goal) => {
          addCounter(name, goal);
          showSnack(`"${name}" added`);
        }}
      />

      {/* Edit Modal */}
      {editingCounter && (
        <CounterModal
          mode="edit"
          visible={!!editingCounter}
          counter={editingCounter}
          onDismiss={() => setEditingCounter(null)}
          onSave={handleSaveEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2000}
        style={{marginBottom: insets.bottom + 96}}>
        {snackMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  list: {
    paddingTop: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontWeight: '700',
    marginTop: 8,
  },
  emptyBody: {
    textAlign: 'center',
    lineHeight: 22,
  },
  hint: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
});

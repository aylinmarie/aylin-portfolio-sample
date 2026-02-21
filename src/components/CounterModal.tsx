import React, {useState, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  useTheme,
  Divider,
} from 'react-native-paper';
import {Counter} from '@hooks/useCounters';
import {AppTheme} from '@theme/index';

interface AddProps {
  mode: 'add';
  visible: boolean;
  onDismiss: () => void;
  onAdd: (name: string, goal: number | null) => void;
}

interface EditProps {
  mode: 'edit';
  visible: boolean;
  counter: Counter;
  onDismiss: () => void;
  onSave: (name: string, goal: number | null) => void;
  onDelete: () => void;
}

type Props = AddProps | EditProps;

export default function CounterModal(props: Props) {
  const theme = useTheme<AppTheme>();
  const {visible, onDismiss, mode} = props;

  const [name, setName] = useState('');
  const [goalText, setGoalText] = useState('');

  useEffect(() => {
    if (visible) {
      if (mode === 'edit') {
        setName(props.counter.name);
        setGoalText(props.counter.goal ? String(props.counter.goal) : '');
      } else {
        setName('');
        setGoalText('');
      }
    }
  }, [visible, mode, props]);

  const handleSubmit = () => {
    const trimmedName = name.trim() || (mode === 'edit' ? props.counter.name : 'Counter');
    const goalNum = goalText.trim() ? parseInt(goalText, 10) : null;
    const validGoal = goalNum && goalNum > 0 ? goalNum : null;

    if (mode === 'add') {
      props.onAdd(trimmedName, validGoal);
    } else {
      props.onSave(trimmedName, validGoal);
    }
    onDismiss();
  };

  const isEdit = mode === 'edit';

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          {backgroundColor: theme.colors.surface},
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Text
            variant="headlineSmall"
            style={[styles.title, {color: theme.colors.onSurface}]}>
            {isEdit ? 'Edit Counter' : 'New Counter'}
          </Text>

          <TextInput
            label="Counter name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            placeholder={isEdit ? props.counter.name : 'e.g. Row Counter'}
            style={styles.input}
            autoFocus
            maxLength={30}
            returnKeyType="next"
          />

          <TextInput
            label="Goal (optional)"
            value={goalText}
            onChangeText={text => setGoalText(text.replace(/[^0-9]/g, ''))}
            mode="outlined"
            placeholder="e.g. 40 rows"
            keyboardType="number-pad"
            style={styles.input}
            maxLength={6}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <View style={styles.actions}>
            {isEdit && (
              <>
                <Button
                  mode="text"
                  textColor={theme.colors.secondary}
                  onPress={() => {
                    props.onDelete();
                    onDismiss();
                  }}>
                  Delete
                </Button>
                <View style={styles.spacer} />
              </>
            )}
            <Button mode="text" onPress={onDismiss}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{marginLeft: 8}}>
              {isEdit ? 'Save' : 'Add'}
            </Button>
          </View>

          {isEdit && (
            <>
              <Divider style={{marginTop: 8}} />
              <Text
                variant="bodySmall"
                style={[styles.hint, {color: theme.colors.onSurfaceVariant}]}>
                Long-press a counter to edit or delete it.
              </Text>
            </>
          )}
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    borderRadius: 24,
    padding: 24,
  },
  title: {
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  spacer: {
    flex: 1,
  },
  hint: {
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';

const AddTodo = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    setIsLoading(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await onAdd(task.trim());
      setTask('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo..."
        value={task}
        onChangeText={setTask}
        onSubmitEditing={handleSubmit}
        editable={!isLoading}
        multiline={false}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, isLoading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>
          {isLoading ? 'Adding...' : '+'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    minWidth: 60,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AddTodo;
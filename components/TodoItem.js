import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleToggle = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await onToggle(todo.id, !todo.completed);
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              await onDelete(todo.id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete todo');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    Alert.prompt(
      'Edit Todo',
      'Enter new task:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async (newTask) => {
            if (newTask && newTask.trim()) {
              try {
                await onEdit(todo.id, { task: newTask.trim() });
              } catch (error) {
                Alert.alert('Error', 'Failed to update todo');
              }
            }
          },
        },
      ],
      'plain-text',
      todo.task
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.todoItem, todo.completed && styles.completedItem]}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, todo.completed && styles.checkedBox]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.task, todo.completed && styles.completedTask]}>
          {todo.task}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEdit}
        >
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  todoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  completedItem: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  task: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    paddingRight: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    backgroundColor: '#ffe6e6',
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButtonText: {
    fontSize: 16,
  },
});

export default TodoItem;
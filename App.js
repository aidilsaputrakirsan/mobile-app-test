import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import { todoService } from './services/supabase';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load todos on app start
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTodos(data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to load todos');
      console.error('Error loading todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTodos();
    setIsRefreshing(false);
  };

  const handleAddTodo = async (task) => {
    try {
      const newTodo = await todoService.createTodo(task);
      setTodos(prevTodos => [newTodo, ...prevTodos]);
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      await todoService.toggleTodo(id, completed);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const handleEditTodo = async (id, updates) => {
    try {
      await todoService.updateTodo(id, updates);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  const renderTodo = ({ item }) => (
    <TodoItem
      todo={item}
      onToggle={handleToggleTodo}
      onDelete={handleDeleteTodo}
      onEdit={handleEditTodo}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>📝</Text>
      <Text style={styles.emptyTitle}>No todos yet</Text>
      <Text style={styles.emptySubtitle}>Add your first todo above!</Text>
    </View>
  );

  if (isLoading) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading todos...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Todos</Text>
          <Text style={styles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>

        {/* Add Todo */}
        <AddTodo onAdd={handleAddTodo} />

        {/* Todo List */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderTodo}
          style={styles.list}
          contentContainerStyle={todos.length === 0 ? styles.emptyList : null}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#fff"
              colors={['#667eea']}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  list: {
    flex: 1,
    paddingTop: 10,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
});
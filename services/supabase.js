import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

// Platform-specific storage for web compatibility
let storage;
if (Platform.OS === 'web') {
  // For web, use localStorage wrapper
  storage = {
    getItem: (key) => {
      if (typeof window !== 'undefined') {
        return Promise.resolve(window.localStorage.getItem(key));
      }
      return Promise.resolve(null);
    },
    setItem: (key, value) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
      return Promise.resolve();
    },
    removeItem: (key) => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      return Promise.resolve();
    },
  };
} else {
  // For mobile, use AsyncStorage
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  storage = AsyncStorage;
}

// Your Supabase project configuration
const supabaseUrl = 'https://naxjgtlbdcvzrcucwujn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heGpndGxiZGN2enJjdWN3dWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NjkwNDksImV4cCI6MjA3MTI0NTA0OX0.8qO0wKVEvY_hA24XT7xkUrcePJ7O3h-WRYL04nSEdgY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// CRUD Operations for Todos
export const todoService = {
  // Get all todos
  async getTodos() {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Create new todo
  async createTodo(task) {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ task, completed: false }])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update todo
  async updateTodo(id, updates) {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // Delete todo
  async deleteTodo(id) {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },

  // Toggle todo completion
  async toggleTodo(id, completed) {
    return this.updateTodo(id, { completed });
  }
};
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

const TodoScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const todos = useQuery(api.todos.getTodos) || [];
  const createTodo = useMutation(api.todos.createTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const filteredTodos = useMemo(() => {
    let result = todos;

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply completion filter
    if (filter === 'active') {
      result = result.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      result = result.filter((todo) => todo.completed);
    }

    return result;
  }, [todos, searchQuery, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const handleCreateTodo = async (todoData) => {
    try {
      await createTodo(todoData);
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (todoData) => {
    if (editingTodo) {
      try {
        await updateTodo({
          id: editingTodo._id,
          ...todoData,
        });
        setEditingTodo(null);
      } catch (error) {
        console.error('Error updating todo:', error);
        alert('Failed to update todo. Please try again.');
      }
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      await toggleTodo({ id: todoId });
    } catch (error) {
      console.error('Error toggling todo:', error);
      alert('Failed to toggle todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo({ id: todoId });
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingTodo(null);
  };

  const handleSubmit = (todoData) => {
    if (editingTodo) {
      handleUpdateTodo(todoData);
    } else {
      handleCreateTodo(todoData);
    }
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="clipboard-outline"
        size={80}
        color={theme.colors.textSecondary}
      />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {searchQuery
          ? 'No todos found'
          : filter === 'completed'
          ? 'No completed todos'
          : filter === 'active'
          ? 'No active todos'
          : 'No todos yet'}
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        {searchQuery
          ? 'Try a different search term'
          : 'Tap the + button to create your first todo'}
      </Text>
    </View>
  );

  if (todos === undefined) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading todos...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Top Banner - Figma spec: 1440px × 300px */}
      <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.bannerOverlay} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.text }]}>
            TODO
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {stats.active} active, {stats.completed} completed
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.themeToggle,
            { backgroundColor: theme.colors.surface },
          ]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar - Figma Group: 540px × 64px at top 158px */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.colors.inputBackground,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={theme.colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search todos..."
          placeholderTextColor={theme.colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {['all', 'active', 'completed'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  filter === f ? theme.colors.primary : theme.colors.surface,
              },
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    filter === f ? '#FFFFFF' : theme.colors.text,
                },
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Todo List - Figma Group 8: 540px × 439px at top 246px */}
      <View style={styles.todoListContainer}>
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={() => handleToggleTodo(item._id)}
              onDelete={() => handleDeleteTodo(item._id)}
              onEdit={() => handleEditTodo(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Todo Input Modal */}
      <TodoInput
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editTodo={editingTodo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 300,                 // Figma spec: bitmap height 300px
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.1,                // Subtle background effect
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 70,              // Figma spec: top position 70px
    paddingBottom: 20,
    height: 118,                 // Total height to contain TODO text (70px top + 48px height)
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    width: 540,                  // Figma spec: 540px width (updated from 541)
    height: 48,                  // Figma spec: 48px height
    lineHeight: 48,              // Match height for vertical centering
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: '400',
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 16,            // Figma spec: 16px border radius
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 540,                  // Figma spec: 540px width
    height: 64,                  // Figma spec: 64px height
    alignSelf: 'center',         // Center horizontally
    marginTop: 40,               // Position at 158px from top (118 + 40)
    marginBottom: 20,
    paddingVertical: 16,         // Figma spec: 16px vertical padding
    paddingHorizontal: 8,        // Figma spec: 8px horizontal padding
    borderRadius: 16,            // Figma spec: 16px border radius
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  filterContainer: {
    flexDirection: 'row',
    width: 540,                  // Figma spec: align with other groups
    alignSelf: 'center',         // Center horizontally
    marginBottom: 12,            // Spacing before todo list
    gap: 12,
  },
  filterButton: {
    paddingVertical: 16,         // Figma spec: 16px vertical padding
    paddingHorizontal: 8,        // Figma spec: 8px horizontal padding
    borderRadius: 16,            // Figma spec: 16px border radius
    minWidth: 70,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  todoListContainer: {
    width: 540,                  // Figma spec: Group 8 width 540px
    height: 439,                 // Figma spec: Group 8 height 439px
    alignSelf: 'center',         // Center horizontally
    marginTop: 0,                // Position at 246px (158 + 64 + 24)
  },
  listContent: {
    paddingBottom: 20,           // Padding inside scroll area
  },
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    right: '50%',                // Center horizontally
    marginRight: -302,           // Offset: (540/2 + 32) = 302px from center
    bottom: 32,
    width: 64,
    height: 64,
    borderRadius: 16,            // Figma spec: 16px border radius
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8875FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});

export default TodoScreen;

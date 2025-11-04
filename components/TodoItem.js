import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Swipeable } from 'react-native-gesture-handler';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const { theme } = useTheme();

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
        onPress={onEdit}
        activeOpacity={0.7}
      >
        <TouchableOpacity
          style={[
            styles.checkbox,
            {
              borderColor: todo.completed ? theme.colors.primary : theme.colors.border,
              backgroundColor: todo.completed ? theme.colors.primary : 'transparent',
            },
          ]}
          onPress={onToggle}
        >
          {todo.completed && (
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          )}
        </TouchableOpacity>

        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                color: todo.completed ? theme.colors.completed : theme.colors.text,
                textDecorationLine: todo.completed ? 'line-through' : 'none',
              },
            ]}
            numberOfLines={1}
          >
            {todo.title}
          </Text>
          {todo.description ? (
            <Text
              style={[
                styles.description,
                { color: theme.colors.textSecondary },
              ]}
              numberOfLines={2}
            >
              {todo.description}
            </Text>
          ) : null}
          {todo.dueDate && (
            <View style={styles.dateContainer}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.dateText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {formatDate(todo.dueDate)}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Ionicons
            name="create-outline"
            size={20}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,  // Figma spec: 16px vertical padding
    paddingHorizontal: 8, // Figma spec: 8px horizontal padding
    borderRadius: 16,     // Figma spec: 16px border radius
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
    fontWeight: '400',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  dateText: {
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
    marginLeft: 4,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 16, // Figma spec: 16px border radius
    marginLeft: 12,
  },
});

export default TodoItem;

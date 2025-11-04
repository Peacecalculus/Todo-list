import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

const TodoInput = ({ visible, onClose, onSubmit, editTodo }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title || '');
      setDescription(editTodo.description || '');
      setDueDate(editTodo.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [editTodo, visible]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <TouchableOpacity
          style={[styles.overlay, { backgroundColor: theme.colors.overlay }]}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              {editTodo ? 'Edit Todo' : 'New Todo'}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Title *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                placeholder="Enter todo title"
                placeholderTextColor={theme.colors.placeholder}
                value={title}
                onChangeText={setTitle}
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Description
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                placeholder="Enter description (optional)"
                placeholderTextColor={theme.colors.placeholder}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Due Date
              </Text>
              <View style={styles.dateInputContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={theme.colors.textSecondary}
                  style={styles.dateIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    styles.dateInput,
                    {
                      backgroundColor: theme.colors.inputBackground,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={theme.colors.placeholder}
                  value={dueDate}
                  onChangeText={setDueDate}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={handleClose}
            >
              <Text
                style={[styles.buttonText, { color: theme.colors.textSecondary }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                {
                  backgroundColor: title.trim()
                    ? theme.colors.primary
                    : theme.colors.border,
                },
              ]}
              onPress={handleSubmit}
              disabled={!title.trim()}
            >
              <Text style={styles.submitButtonText}>
                {editTodo ? 'Update' : 'Add Todo'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    borderTopLeftRadius: 16,     // Figma spec: 16px border radius
    borderTopRightRadius: 16,    // Figma spec: 16px border radius
    paddingTop: 16,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,         // Figma spec: 16px vertical padding
    paddingHorizontal: 8,        // Figma spec: 8px horizontal padding
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  closeButton: {
    padding: 4,
  },
  form: {
    paddingHorizontal: 8,        // Figma spec: 8px horizontal padding
    paddingTop: 16,              // Figma spec: 16px vertical padding
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: -0.1,
  },
  input: {
    borderRadius: 16,            // Figma spec: 16px border radius
    paddingVertical: 16,         // Figma spec: 16px vertical padding
    paddingHorizontal: 8,        // Figma spec: 8px horizontal padding
    fontSize: 16,
    borderWidth: 1,
    fontWeight: '400',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateInputContainer: {
    position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  dateInput: {
    paddingLeft: 48,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 16,         // Figma spec: 16px vertical padding
    paddingHorizontal: 8,        // Figma spec: 8px horizontal padding
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  button: {
    flex: 1,
    paddingVertical: 16,         // Figma spec: 16px vertical padding
    paddingHorizontal: 8,        // Figma spec: 8px horizontal padding
    borderRadius: 16,            // Figma spec: 16px border radius
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 8,
  },
  submitButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoInput;

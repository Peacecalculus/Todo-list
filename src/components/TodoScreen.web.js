import React, { useState, useMemo } from 'react';
import { useTheme } from '../theme';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './TodoScreen.css';

const TodoScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const todos = useQuery(api.todos.getTodos) || [];
  const createTodo = useMutation(api.todos.createTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (searchQuery.trim()) {
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      const todoData = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.trim() || undefined,
      };

      if (editingTodo) {
        await updateTodo({ id: editingTodo._id, ...todoData });
      } else {
        await createTodo(todoData);
      }
      
      setModalVisible(false);
      setEditingTodo(null);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title || '');
    setDescription(todo.description || '');
    setDueDate(todo.dueDate || '');
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setEditingTodo(null);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  if (todos === undefined) {
    return (
      <div className="loading-container" style={{ backgroundColor: theme.colors.background }}>
        <div className="spinner"></div>
        <p style={{ color: theme.colors.textSecondary }}>Loading todos...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ backgroundColor: theme.colors.background }}>
      <div className="banner" style={{ backgroundColor: theme.colors.primary }}></div>
      
      <header className="header">
        <div>
          <h1 className="greeting" style={{ color: theme.colors.text }}>TODO</h1>
          <p className="subtitle" style={{ color: theme.colors.textSecondary }}>
            {stats.active} active, {stats.completed} completed
          </p>
        </div>
        <button
          className="theme-toggle"
          style={{ backgroundColor: theme.colors.surface }}
          onClick={toggleTheme}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <div
        className="search-container"
        style={{
          backgroundColor: theme.colors.inputBackground,
          borderColor: theme.colors.border,
        }}
      >
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          style={{ color: theme.colors.text }}
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
        )}
      </div>

      <div className="filter-container">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className="filter-button"
            style={{
              backgroundColor: filter === f ? theme.colors.primary : theme.colors.surface,
              color: filter === f ? '#FFFFFF' : theme.colors.text,
            }}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list-container">
        {filteredTodos.length === 0 ? (
          <div className="empty-container">
            <div className="empty-icon">📋</div>
            <h3 className="empty-title" style={{ color: theme.colors.text }}>
              {searchQuery ? 'No todos found' : 'No todos yet'}
            </h3>
            <p className="empty-subtitle" style={{ color: theme.colors.textSecondary }}>
              {searchQuery ? 'Try a different search' : 'Click + to add a todo'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className="todo-item"
              style={{
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              }}
            >
              <button
                className="checkbox"
                style={{
                  borderColor: todo.completed ? theme.colors.primary : theme.colors.border,
                  backgroundColor: todo.completed ? theme.colors.primary : 'transparent',
                }}
                onClick={() => toggleTodo({ id: todo._id })}
              >
                {todo.completed && <span>✓</span>}
              </button>
              
              <div className="todo-content" onClick={() => handleEdit(todo)}>
                <h4
                  className="todo-title"
                  style={{
                    color: todo.completed ? theme.colors.completed : theme.colors.text,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.title}
                </h4>
                {todo.description && (
                  <p className="todo-description" style={{ color: theme.colors.textSecondary }}>
                    {todo.description}
                  </p>
                )}
              </div>

              <button className="delete-btn" onClick={() => deleteTodo({ id: todo._id })}>
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <button
        className="fab"
        style={{ backgroundColor: theme.colors.primary }}
        onClick={() => setModalVisible(true)}
      >
        +
      </button>

      {modalVisible && (
        <div className="modal-overlay" onClick={handleClose}>
          <div
            className="modal-content"
            style={{ backgroundColor: theme.colors.background }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 style={{ color: theme.colors.text }}>
                {editingTodo ? 'Edit Todo' : 'New Todo'}
              </h2>
              <button className="close-btn" onClick={handleClose}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="todo-form">
              <div className="form-group">
                <label style={{ color: theme.colors.text }}>Title *</label>
                <input
                  type="text"
                  className="form-input"
                  style={{
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  }}
                  placeholder="Enter todo title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ color: theme.colors.text }}>Description</label>
                <textarea
                  className="form-input form-textarea"
                  style={{
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  }}
                  placeholder="Enter description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label style={{ color: theme.colors.text }}>Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  style={{
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  }}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="form-footer">
                <button
                  type="button"
                  className="btn btn-cancel"
                  style={{ backgroundColor: theme.colors.surface, color: theme.colors.textSecondary }}
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-submit"
                  style={{ backgroundColor: theme.colors.primary }}
                  disabled={!title.trim()}
                >
                  {editingTodo ? 'Update' : 'Add Todo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoScreen;

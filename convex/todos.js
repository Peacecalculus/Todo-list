import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all todos
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .order("desc")
      .collect();
    return todos.sort((a, b) => a.order - b.order);
  },
});

// Create a new todo
export const createTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").collect();
    const maxOrder = todos.length > 0 ? Math.max(...todos.map(t => t.order)) : 0;
    
    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description || "",
      dueDate: args.dueDate,
      completed: false,
      createdAt: Date.now(),
      order: maxOrder + 1,
    });
    return todoId;
  },
});

// Update a todo
export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Toggle todo completion
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

// Delete a todo
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Update todo order (for drag and drop)
export const updateTodoOrder = mutation({
  args: {
    todoId: v.id("todos"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const allTodos = await ctx.db.query("todos").collect();
    const currentTodo = allTodos.find(t => t._id === args.todoId);
    
    if (!currentTodo) throw new Error("Todo not found");
    
    const oldOrder = currentTodo.order;
    const newOrder = args.newOrder;
    
    // Update orders for affected todos
    for (const todo of allTodos) {
      if (todo._id === args.todoId) {
        await ctx.db.patch(todo._id, { order: newOrder });
      } else if (oldOrder < newOrder && todo.order > oldOrder && todo.order <= newOrder) {
        await ctx.db.patch(todo._id, { order: todo.order - 1 });
      } else if (oldOrder > newOrder && todo.order >= newOrder && todo.order < oldOrder) {
        await ctx.db.patch(todo._id, { order: todo.order + 1 });
      }
    }
  },
});

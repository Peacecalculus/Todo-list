# 🧪 Testing Guide

Comprehensive testing checklist for Todo App Stage 3B.

## 📋 Pre-Test Setup

- [ ] App is installed and running
- [ ] Convex backend is connected
- [ ] Internet connection is stable

## ✅ Feature Testing

### 1. Create Todo (CRUD - Create)

**Test Case 1.1**: Create basic todo
- [ ] Tap the + (FAB) button
- [ ] Enter title: "Buy groceries"
- [ ] Tap "Add Todo"
- [ ] ✅ Todo appears in the list

**Test Case 1.2**: Create todo with description
- [ ] Tap + button
- [ ] Title: "Team Meeting"
- [ ] Description: "Discuss Q4 goals"
- [ ] Tap "Add Todo"
- [ ] ✅ Todo shows with description visible

**Test Case 1.3**: Create todo with due date
- [ ] Tap + button
- [ ] Title: "Submit report"
- [ ] Select due date (today or future)
- [ ] Tap "Add Todo"
- [ ] ✅ Todo shows with date label

**Test Case 1.4**: Create with all fields
- [ ] Fill title, description, and due date
- [ ] ✅ All fields saved correctly

**Test Case 1.5**: Validation - empty title
- [ ] Tap + button
- [ ] Leave title empty
- [ ] ✅ "Add Todo" button is disabled

### 2. Read Todos (CRUD - Read)

**Test Case 2.1**: View all todos
- [ ] Create 3-5 todos
- [ ] ✅ All todos appear in list
- [ ] ✅ Newest at top or ordered correctly

**Test Case 2.2**: Real-time sync
- [ ] Open app on two devices (or web + mobile)
- [ ] Create todo on device 1
- [ ] ✅ Todo appears on device 2 instantly

**Test Case 2.3**: Empty state
- [ ] Delete all todos
- [ ] ✅ Empty state message appears
- [ ] ✅ "No todos yet" or similar message

### 3. Update Todo (CRUD - Update)

**Test Case 3.1**: Edit todo title
- [ ] Tap on a todo item
- [ ] Change title
- [ ] Tap "Update"
- [ ] ✅ Title updated in list

**Test Case 3.2**: Edit description
- [ ] Edit a todo
- [ ] Change description
- [ ] ✅ Description updated

**Test Case 3.3**: Edit due date
- [ ] Edit a todo
- [ ] Change due date
- [ ] ✅ New date appears

**Test Case 3.4**: Mark as complete
- [ ] Tap checkbox on a todo
- [ ] ✅ Todo text has strikethrough
- [ ] ✅ Checkbox is filled

**Test Case 3.5**: Mark as incomplete
- [ ] Tap checkbox on a completed todo
- [ ] ✅ Strikethrough removed
- [ ] ✅ Checkbox is empty

### 4. Delete Todo (CRUD - Delete)

**Test Case 4.1**: Swipe to delete
- [ ] Swipe left on a todo
- [ ] Red delete button appears
- [ ] Tap delete button
- [ ] ✅ Todo removed from list

**Test Case 4.2**: Delete completed todo
- [ ] Mark a todo as complete
- [ ] Swipe to delete it
- [ ] ✅ Deleted successfully

**Test Case 4.3**: Delete with description
- [ ] Delete a todo that has description
- [ ] ✅ Entire todo removed

### 5. Search Functionality

**Test Case 5.1**: Search by title
- [ ] Type in search bar
- [ ] ✅ Matching todos appear
- [ ] ✅ Non-matching todos hidden

**Test Case 5.2**: Search by description
- [ ] Search for text in description
- [ ] ✅ Matching todos appear

**Test Case 5.3**: No results
- [ ] Search for non-existent text
- [ ] ✅ "No todos found" message appears

**Test Case 5.4**: Clear search
- [ ] Enter search term
- [ ] Tap X to clear
- [ ] ✅ All todos reappear

### 6. Filter Functionality

**Test Case 6.1**: Filter "All"
- [ ] Create some completed and active todos
- [ ] Tap "All" filter
- [ ] ✅ All todos visible

**Test Case 6.2**: Filter "Active"
- [ ] Tap "Active" filter
- [ ] ✅ Only incomplete todos visible
- [ ] ✅ Completed todos hidden

**Test Case 6.3**: Filter "Completed"
- [ ] Tap "Completed" filter
- [ ] ✅ Only completed todos visible
- [ ] ✅ Active todos hidden

**Test Case 6.4**: Filter with no results
- [ ] Delete all completed todos
- [ ] Tap "Completed" filter
- [ ] ✅ Empty state appears

### 7. Theme Switching

**Test Case 7.1**: Switch to dark theme
- [ ] App starts in light theme
- [ ] Tap moon icon
- [ ] ✅ Theme changes to dark
- [ ] ✅ All colors update smoothly

**Test Case 7.2**: Switch to light theme
- [ ] In dark theme, tap sun icon
- [ ] ✅ Theme changes to light
- [ ] ✅ Smooth transition

**Test Case 7.3**: Theme persistence
- [ ] Switch theme
- [ ] Close app completely
- [ ] Reopen app
- [ ] ✅ Theme is remembered

### 8. UI/UX Elements

**Test Case 8.1**: Loading indicator
- [ ] Clear app data
- [ ] Open app
- [ ] ✅ Loading spinner appears briefly

**Test Case 8.2**: Stats display
- [ ] Check header stats
- [ ] ✅ Shows "X active, Y completed"
- [ ] Mark todo complete
- [ ] ✅ Stats update instantly

**Test Case 8.3**: Modal open/close
- [ ] Tap + button
- [ ] Tap X or Cancel
- [ ] ✅ Modal closes
- [ ] ✅ No data saved

**Test Case 8.4**: Smooth animations
- [ ] Create a todo
- [ ] ✅ Appears with smooth animation
- [ ] Toggle complete
- [ ] ✅ Checkbox animates smoothly

### 9. Edge Cases

**Test Case 9.1**: Very long title
- [ ] Create todo with 100+ character title
- [ ] ✅ Text truncates properly
- [ ] ✅ No layout breaks

**Test Case 9.2**: Very long description
- [ ] Create todo with long description
- [ ] ✅ Description truncates with ellipsis
- [ ] ✅ Readable in edit mode

**Test Case 9.3**: Special characters
- [ ] Title: "Test @#$% & special chars"
- [ ] ✅ Saves and displays correctly

**Test Case 9.4**: Multiple rapid clicks
- [ ] Rapidly tap + button multiple times
- [ ] ✅ Modal opens only once

**Test Case 9.5**: Offline behavior
- [ ] Turn off internet
- [ ] Try to create todo
- [ ] ✅ Error message or graceful handling

### 10. Responsive Design

**Test Case 10.1**: Portrait mode
- [ ] App displays correctly in portrait
- [ ] ✅ All elements visible

**Test Case 10.2**: Landscape mode
- [ ] Rotate device to landscape
- [ ] ✅ Layout adjusts properly
- [ ] ✅ No UI overlap

**Test Case 10.3**: Different screen sizes
- [ ] Test on tablet (or emulator)
- [ ] ✅ Scales appropriately

## 📊 Test Results Summary

Fill this after testing:

| Feature | Passed | Failed | Notes |
|---------|--------|--------|-------|
| Create | ☐ | ☐ | |
| Read | ☐ | ☐ | |
| Update | ☐ | ☐ | |
| Delete | ☐ | ☐ | |
| Search | ☐ | ☐ | |
| Filter | ☐ | ☐ | |
| Theme | ☐ | ☐ | |
| UI/UX | ☐ | ☐ | |
| Edge Cases | ☐ | ☐ | |
| Responsive | ☐ | ☐ | |

## ✅ Sign-Off

- [ ] All critical features tested
- [ ] All bugs documented
- [ ] App ready for submission

**Tester Name**: _______________  
**Date**: _______________  
**Signature**: _______________

---

## 🐛 Bug Report Template

If you find bugs, document them:

```
Bug ID: #001
Title: [Short description]
Severity: Critical / High / Medium / Low
Steps to Reproduce:
1. 
2. 
3. 

Expected: [What should happen]
Actual: [What actually happened]
Device: [Android/iOS, version]
Screenshot: [If available]
```

---

**Testing Complete! Ready for submission.** 🎉

# Todo App - Stage 3B

A sophisticated Todo List application built with React Native (Expo) and Convex for real-time backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo Go app on your phone (optional)
- Convex account (free at https://convex.dev)

### Setup in 3 Steps

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Setup Convex Backend
```bash
# Login to Convex (opens browser)
npx convex login

# Start Convex development server (keep this running)
npx convex dev
```

Copy the URL it provides (e.g., `https://happy-animal-123.convex.cloud`)

#### 3. Configure Environment
Edit the `.env` file and add your Convex URL:
```env
EXPO_PUBLIC_CONVEX_URL=https://your-actual-url.convex.cloud
```

#### 4. Start the App
```bash
npm start
```

Then:
- Scan QR code with **Expo Go** app, OR
- Press `a` for Android emulator, OR
- Press `i` for iOS simulator (Mac only), OR
- Press `w` for web browser

## ✨ Features

### Core CRUD Operations
- ✅ **Create** todos with title, description, and due date
- ✅ **Read** todos with real-time synchronization
- ✅ **Update** todos (edit any field)
- ✅ **Delete** todos with swipe-to-delete gesture
- ✅ **Toggle** completion status

### UI/UX Features
- ✅ Light & Dark theme with smooth transitions
- ✅ Theme persistence (saves preference)
- ✅ Search todos by title or description
- ✅ Filter by status: All / Active / Completed
- ✅ Swipe-to-delete gesture
- ✅ Empty states and loading indicators
- ✅ Smooth animations
- ✅ Responsive design for all screen sizes

### Real-time Features
- ✅ Instant updates across all devices
- ✅ Optimistic UI updates
- ✅ Automatic synchronization via Convex

## 📁 Project Structure

```
todo-app-stage-3b/
├── App.js                  # Entry point with providers
├── theme.js                # Theme configuration (light/dark)
├── .env                    # Environment variables
├── package.json            # Dependencies
├── app.json                # Expo configuration
├── components/
│   ├── TodoScreen.js       # Main UI component
│   ├── TodoItem.js         # Individual todo item
│   └── TodoInput.js        # Create/Edit modal
└── convex/
    ├── schema.ts           # Database schema
    ├── todos.js            # CRUD operations
    └── tsconfig.json       # TypeScript config
```

## 🎨 Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Convex (real-time database)
- **State Management**: React Hooks + Convex React
- **Storage**: AsyncStorage (theme persistence)
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler
- **Icons**: Expo Vector Icons

## 📊 Database Schema

```typescript
todos: {
  _id: Id<"todos">,
  title: string,
  description?: string,
  dueDate?: string,
  completed: boolean,
  createdAt: number,
  order: number
}
```

## 🔧 Available Scripts

```bash
npm start              # Start Expo development server
npm run android        # Run on Android
npm run ios            # Run on iOS (Mac only)
npm run web            # Run in browser
npm run convex:dev     # Start Convex backend
npm run convex:deploy  # Deploy Convex to production
```

## 📱 Building APK

```bash
# Install EAS CLI (one-time)
npm install -g eas-cli

# Login to Expo
eas login

# Build Android APK
eas build --platform android --profile preview

# Build iOS app (Mac only)
eas build --platform ios --profile preview
```

The build takes 10-15 minutes. You'll get a download link when complete.

## 🧪 Testing

Test all features:

1. **Create Todo**: Tap + button, fill form, save
2. **Edit Todo**: Tap on a todo item
3. **Complete Todo**: Tap checkbox
4. **Delete Todo**: Swipe left on todo
5. **Search**: Type in search bar
6. **Filter**: Tap All/Active/Completed buttons
7. **Theme**: Tap sun/moon icon
8. **Persistence**: Close and reopen app (theme should persist)

See `TESTING.md` for comprehensive test cases.

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start -c
```

### Convex not connecting
- Ensure `npx convex dev` is running
- Check `.env` file has correct URL
- Verify internet connection

### Build failed
- Update EAS CLI: `npm install -g eas-cli@latest`
- Login again: `eas login`
- Check `app.json` configuration

### Theme not persisting
- Check AsyncStorage permissions
- Clear app data and try again

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EXPO_PUBLIC_CONVEX_URL` | Convex deployment URL | `https://xxx.convex.cloud` |

## 🎯 Acceptance Criteria

All requirements met:
- ✅ Pixel-perfect UI implementation
- ✅ Light/Dark theme with smooth transitions
- ✅ Theme persistence across app restarts
- ✅ Full CRUD operations via Convex
- ✅ Real-time synchronization
- ✅ Search and filter functionality
- ✅ Swipe-to-delete gesture
- ✅ Error handling
- ✅ Responsive design
- ✅ Clean, modular code
- ✅ Comprehensive documentation

## 📤 Submission

For submission, you need:

1. **APK file** - Built with EAS
2. **Demo video** - Screen recording with voice-over
3. **GitHub repository** - Complete source code
4. **Google Drive link** - APK + video

See `SUBMISSION.md` for detailed checklist.

## 📞 Support

- Expo Docs: https://docs.expo.dev
- Convex Docs: https://docs.convex.dev
- React Native Docs: https://reactnative.dev

## 📄 License

MIT License

---

**Made with ❤️ using React Native and Convex**
# Todo-list

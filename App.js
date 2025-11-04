import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from './theme';
import TodoScreen from './components/TodoScreen';

// Initialize Convex client
// Replace with your actual Convex deployment URL
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || 'https://your-convex-url.convex.cloud');

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <TodoScreen />
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}

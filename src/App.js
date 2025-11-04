import React from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from './theme';
import TodoScreen from './components/TodoScreen.web';

const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL || 'https://your-convex-url.convex.cloud');

export default function App() {
  return (
    <div style={{ display: 'flex', flex: 1, minHeight: '100vh' }}>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <TodoScreen />
        </ThemeProvider>
      </ConvexProvider>
    </div>
  );
}

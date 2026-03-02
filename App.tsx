import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ChecklistProvider} from './src/context/ChecklistContext';
import {RootNavigator} from './src/navigation/RootNavigator';
import {ErrorBoundary} from './src/components/common/ErrorBoundary';

function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <StatusBar barStyle="dark-content" />
        <ChecklistProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ChecklistProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;

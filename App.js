import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import { AuthStack } from './navigation/AuthStack';
import { MainTab } from './navigation/MainTab';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const RootNavigator = () => {
  const { user, isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return null; // Hoặc SplashScreen nếu bạn có
  }

  return user ? <MainTab /> : <AuthStack />;
};

export default App;
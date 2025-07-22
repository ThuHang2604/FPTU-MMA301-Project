import { Stack } from './index';
import HomeScreen from '../screens/Home/HomeScreen';
import DetailScreen from '../screens/Home/DetailScreen';

export const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen 
      name="Detail" 
      component={DetailScreen}
      options={{ headerShown: true, title: 'Product Details' }}
    />
  </Stack.Navigator>
);
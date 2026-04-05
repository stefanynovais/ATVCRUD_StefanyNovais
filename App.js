import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './src/screens/HomeScreen.js';
import AddEditScreen from './src/screens/AddEditScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="AddEditScreen"
          component={AddEditScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



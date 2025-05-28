import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import 'nativewind';

// Import screens
import LoginScreen from './screens/Auth/Login';
import RegisterScreen from './screens/Auth/Register';
import Step1CompanyInfo from './screens/Onboarding/Step1CompanyInfo';
import Step2Design from './screens/Onboarding/Step2Design';
import Step3Links from './screens/Onboarding/Step3Links';
import Step4Program from './screens/Onboarding/Step4Program';
import Step5Preview from './screens/Onboarding/Step5Preview';
import DashboardScreen from './screens/Dashboard/DashboardScreen';

// Import context
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// Create stack navigators
const AuthStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Onboarding Navigator
const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardingStack.Screen name="Step1CompanyInfo" component={Step1CompanyInfo} />
      <OnboardingStack.Screen name="Step2Design" component={Step2Design} />
      <OnboardingStack.Screen name="Step3Links" component={Step3Links} />
      <OnboardingStack.Screen name="Step4Program" component={Step4Program} />
      <OnboardingStack.Screen name="Step5Preview" component={Step5Preview} />
    </OnboardingStack.Navigator>
  );
};

// Dashboard Navigator
const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DashboardStack.Screen name="Home" component={DashboardScreen} />
    </DashboardStack.Navigator>
  );
};

// Auth Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

// Root Navigator with Authentication Flow
const RootNavigator = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <RootStack.Screen name="Dashboard" component={DashboardNavigator} />
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        </>
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

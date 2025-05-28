import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert,
  StatusBar
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingOverlay from '../../components/common/LoadingOverlay';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signInWithEmail, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password');
      return;
    }
    
    try {
      await signInWithEmail(email, password);
      // If successful, the AuthContext will handle navigation
      navigation.navigate('Onboarding', { screen: 'Step1CompanyInfo' });
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
      Alert.alert('Login failed', errorMessage);
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          className="flex-1"
          contentContainerClassName="p-6 justify-center"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-blue-500 mb-2">Welcome Back</Text>
            <Text className="text-gray-500">Sign in to your business account</Text>
          </View>
          
          <View className="w-full mb-4">
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              className="mb-4"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              className="mb-6"
              secureTextEntry
            />
            
            <Button
              mode="contained"
              onPress={handleLogin}
              disabled={isLoading}
              className="bg-blue-500 py-2"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </View>
          
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600">Don't have an account?</Text>
            <TouchableOpacity onPress={handleRegisterPress} className="ml-1">
              <Text className="text-blue-500 font-bold">Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {isLoading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default LoginScreen; 
import React, { useState } from 'react';
import { 
  View, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Keyboard,
  StatusBar
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import components
import ProfilePhotoSelector from '../../components/register/ProfilePhotoSelector';
import LoadingOverlay from '../../components/common/LoadingOverlay';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Detect if we're on a small device
const isSmallDevice = height < 700;

const RegisterScreen = ({ navigation }: any) => {
  // State variables
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  
  const { createUserWithEmail, isLoading } = useAuth();

  // Validate email with regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Registration handler
  const handleRegister = async () => {
    // Validate all required fields
    if (!businessName || !businessAddress || !email || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill in all required fields');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address');
      return;
    }

    // Check password length
    if (password.length < 6) {
      Alert.alert('Password too short', 'Password must be at least 6 characters long');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure your passwords match');
      return;
    }

    try {
      let logoURL = '';
      
      // Upload logo to Firebase Storage if it exists
      if (logo) {
        const response = await fetch(logo);
        const blob = await response.blob();
        const storageRef = ref(storage, `company-logos/${Date.now()}`);
        await uploadBytes(storageRef, blob);
        logoURL = await getDownloadURL(storageRef);
      }
      
      // Register the user with email and password
      await createUserWithEmail(email, password, businessName, businessAddress);
      
      // Navigate to the first onboarding screen
      navigation.navigate('Onboarding', { screen: 'Step1CompanyInfo' });
    } catch (error) {
      console.error('Registration error:', error);
      
      // Type checking for the error
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
        
      Alert.alert('Registration failed', errorMessage);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          className="flex-1"
          contentContainerClassName="p-6"
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={(width, height) => {
            setContentHeight(height);
          }}
        >
          <Text className="text-3xl font-bold text-center text-blue-500 mb-2">Create Business Account</Text>
          <Text className="text-gray-500 text-center mb-8">Please fill in your business details</Text>
          
          <ProfilePhotoSelector 
            image={logo} 
            setImage={setLogo}
            size={isSmallDevice ? 90 : 120} 
          />
          
          <View className="w-full mb-4">
            <TextInput
              label="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
              mode="outlined"
              className="mb-4"
            />
            
            <TextInput
              label="Business Address"
              value={businessAddress}
              onChangeText={setBusinessAddress}
              mode="outlined"
              className="mb-4"
            />
            
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
              className="mb-4"
              secureTextEntry
            />
            
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              className="mb-6"
              secureTextEntry
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            
            <Button
              mode="contained"
              onPress={handleRegister}
              disabled={isLoading}
              className="bg-blue-500 py-2"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </View>
          
          <View className="flex-row justify-center items-center mt-6 mb-4">
            <Text className="text-gray-600">Already have an account?</Text>
            <TouchableOpacity onPress={handleLoginPress} className="ml-1">
              <Text className="text-blue-500 font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {isLoading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default RegisterScreen; 
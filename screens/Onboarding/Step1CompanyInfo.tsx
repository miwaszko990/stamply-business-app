import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useOnboardingStore } from '../../lib/store/onboardingStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const Step1CompanyInfo = ({ navigation }: any) => {
  // Get company info from store
  const { companyInfo, setCompanyInfo } = useOnboardingStore();
  
  // Local state for form fields
  const [companyName, setCompanyName] = useState(companyInfo.companyName);
  const [phoneNumber, setPhoneNumber] = useState(companyInfo.phoneNumber);
  const [website, setWebsite] = useState(companyInfo.website);
  const [address, setAddress] = useState(companyInfo.address);
  
  // Handle next button press
  const handleNext = () => {
    // Validate required fields
    if (!companyName.trim()) {
      Alert.alert('Missing Information', 'Please enter your company name');
      return;
    }
    
    if (!address.trim()) {
      Alert.alert('Missing Information', 'Please enter your company address');
      return;
    }
    
    // Save to global state
    setCompanyInfo({
      companyName,
      phoneNumber,
      website,
      address
    });
    
    // Navigate to next step
    navigation.navigate('Step2Design');
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="p-6">
            <Text className="text-3xl font-bold mb-2 text-center mt-6 text-blue-500">Company Information</Text>
            <Text className="text-gray-500 text-center mb-8">Step 1 of 5</Text>
            
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Company Name <Text className="text-red-500">*</Text></Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="Enter your company name"
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Address <Text className="text-red-500">*</Text></Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="Enter your company address"
                value={address}
                onChangeText={setAddress}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium">Website</Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="https://yourbusiness.com"
                keyboardType="url"
                autoCapitalize="none"
                value={website}
                onChangeText={setWebsite}
              />
            </View>
            
            <TouchableOpacity 
              className="bg-blue-500 p-4 rounded-lg mt-6"
              onPress={handleNext}
            >
              <Text className="text-white text-center font-bold text-lg">Next Step</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Step1CompanyInfo; 
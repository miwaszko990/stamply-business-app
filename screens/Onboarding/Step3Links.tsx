import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../lib/store/onboardingStore';

const Step3Links = ({ navigation }: any) => {
  // Get link info from Zustand store
  const { linkInfo, setLinkInfo } = useOnboardingStore();
  
  // Local state
  const [instagram, setInstagram] = useState(linkInfo.instagram);
  const [booksyLink, setBooksyLink] = useState(linkInfo.booksyLink);
  
  // Handle next button press
  const handleNext = () => {
    // Validate Instagram (required)
    if (!instagram.trim()) {
      Alert.alert('Missing Information', 'Please enter your Instagram handle');
      return;
    }
    
    // Format Instagram handle (ensure it starts with @)
    const formattedInstagram = instagram.startsWith('@') ? instagram : `@${instagram}`;
    
    // Save to Zustand store
    setLinkInfo({
      ...linkInfo,
      instagram: formattedInstagram,
      booksyLink,
    });
    
    // Navigate to the next step
    navigation.navigate('Step4Program');
  };
  
  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="p-6">
            <Text className="text-3xl font-bold mb-2 text-center mt-6 text-blue-500">Connect Your Business</Text>
            <Text className="text-gray-500 text-center mb-8">Step 3 of 5</Text>
            
            {/* Instagram Handle */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium">Instagram Handle <Text className="text-red-500">*</Text></Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="@yourbusiness"
                autoCapitalize="none"
                autoCorrect={false}
                value={instagram}
                onChangeText={setInstagram}
              />
              <Text className="text-gray-500 text-xs mt-1">Your Instagram handle will be displayed on your loyalty card</Text>
            </View>
            
            {/* Booksy Link */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium">Booksy Link (Optional)</Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="https://booksy.com/yourbusiness"
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
                value={booksyLink}
                onChangeText={setBooksyLink}
              />
              <Text className="text-gray-500 text-xs mt-1">Add your Booksy link if you use it for appointments</Text>
            </View>
            
            {/* Navigation buttons */}
            <View className="flex-row justify-between mt-10">
              <TouchableOpacity 
                className="bg-gray-200 p-4 rounded-lg w-[48%]"
                onPress={handleBack}
              >
                <Text className="text-center font-bold text-gray-700">Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="bg-blue-500 p-4 rounded-lg w-[48%]"
                onPress={handleNext}
              >
                <Text className="text-white text-center font-bold">Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Step3Links; 
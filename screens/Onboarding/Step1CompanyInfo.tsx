import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Step1CompanyInfo = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-2 text-center mt-6">Company Information</Text>
        <Text className="text-gray-500 text-center mb-8">Step 1 of 5</Text>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Company Name</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="Enter your company name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Company Address</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="Enter your company address"
          />
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Phone Number</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Business Description</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50 h-24"
            placeholder="Briefly describe your business"
            multiline={true}
            textAlignVertical="top"
          />
        </View>
        
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mt-6">
          <Text className="text-white text-center font-bold text-lg">Next Step</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step1CompanyInfo; 
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

const Step5Preview = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-2 text-center mt-6">Preview & Launch</Text>
        <Text className="text-gray-500 text-center mb-8">Step 5 of 5</Text>
        
        <View className="bg-gray-50 rounded-xl p-5 mb-6">
          <Text className="text-lg font-bold mb-2">Company Information</Text>
          <View className="flex-row mb-2">
            <Text className="text-gray-500 w-24">Name:</Text>
            <Text className="text-gray-800 flex-1">Coffee House</Text>
          </View>
          <View className="flex-row mb-2">
            <Text className="text-gray-500 w-24">Address:</Text>
            <Text className="text-gray-800 flex-1">123 Main St, San Francisco</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-500 mt-2">Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-gray-50 rounded-xl p-5 mb-6">
          <Text className="text-lg font-bold mb-2">Card Design</Text>
          <View className="h-48 bg-white rounded-xl border border-gray-300 items-center justify-center mb-2">
            <Text className="text-gray-500">Card Preview</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-500 mt-2">Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-gray-50 rounded-xl p-5 mb-6">
          <Text className="text-lg font-bold mb-2">Connected Accounts</Text>
          <View className="flex-row mb-2">
            <Text className="text-gray-500 w-24">Website:</Text>
            <Text className="text-gray-800 flex-1">coffeehouse.com</Text>
          </View>
          <View className="flex-row mb-2">
            <Text className="text-gray-500 w-24">Instagram:</Text>
            <Text className="text-gray-800 flex-1">@coffeehouse</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-500 mt-2">Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-gray-50 rounded-xl p-5 mb-6">
          <Text className="text-lg font-bold mb-2">Loyalty Program</Text>
          <View className="flex-row mb-2">
            <Text className="text-gray-500 w-24">Name:</Text>
            <Text className="text-gray-800 flex-1">Coffee Rewards</Text>
          </View>
          <View className="flex-row mb-2">
            <Text className="text-gray-500 w-24">Stamps:</Text>
            <Text className="text-gray-800 flex-1">10 stamps for reward</Text>
          </View>
          <View className="flex-row mb-2">
            <Text className="text-gray-500 w-24">Reward:</Text>
            <Text className="text-gray-800 flex-1">Free coffee of choice</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-500 mt-2">Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity className="bg-gray-200 p-4 rounded-lg w-[48%]">
            <Text className="text-center font-bold text-gray-700">Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-green-500 p-4 rounded-lg w-[48%]">
            <Text className="text-white text-center font-bold">Launch Program</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Step5Preview; 
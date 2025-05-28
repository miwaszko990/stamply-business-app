import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

const Step2Design = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-2 text-center mt-6">Design Your Loyalty Card</Text>
        <Text className="text-gray-500 text-center mb-8">Step 2 of 5</Text>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-4 text-lg font-medium">Select Card Style</Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-[48%] h-40 bg-gray-100 rounded-xl mb-4 border-2 border-blue-500 overflow-hidden">
              <View className="w-full h-full items-center justify-center">
                <Text className="text-center font-medium">Minimal</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-[48%] h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <View className="w-full h-full items-center justify-center">
                <Text className="text-center font-medium">Modern</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-[48%] h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <View className="w-full h-full items-center justify-center">
                <Text className="text-center font-medium">Elegant</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-[48%] h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <View className="w-full h-full items-center justify-center">
                <Text className="text-center font-medium">Bold</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-4 text-lg font-medium">Choose Color Scheme</Text>
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity className="w-12 h-12 rounded-full bg-blue-500 border-2 border-gray-300"></TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-red-500"></TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-green-500"></TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-purple-500"></TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-orange-500"></TouchableOpacity>
          </View>
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-4 text-lg font-medium">Preview</Text>
          <View className="h-48 bg-gray-100 rounded-xl border border-gray-300 items-center justify-center">
            <Text className="text-gray-500">Card Preview</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity className="bg-gray-200 p-4 rounded-lg w-[48%]">
            <Text className="text-center font-bold text-gray-700">Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-blue-500 p-4 rounded-lg w-[48%]">
            <Text className="text-white text-center font-bold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Step2Design; 
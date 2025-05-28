import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Step4Program = () => {
  const [rewardType, setRewardType] = React.useState('discount');
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-2 text-center mt-6">Loyalty Program</Text>
        <Text className="text-gray-500 text-center mb-8">Step 4 of 5</Text>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 text-lg font-medium">Program Name</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50 mb-4"
            placeholder="Enter your loyalty program name"
          />
          
          <Text className="text-gray-700 mb-2 text-lg font-medium">Stamps Required</Text>
          <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-lg p-2">
            <TextInput 
              className="flex-1 p-2"
              placeholder="10"
              keyboardType="number-pad"
            />
            <Text className="text-gray-500 mr-2">stamps</Text>
          </View>
          <Text className="text-gray-500 text-xs mt-1">How many stamps needed to earn a reward</Text>
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-4 text-lg font-medium">Reward Type</Text>
          
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity 
              className={`w-[48%] p-4 rounded-xl mb-4 ${rewardType === 'discount' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border border-gray-300'}`}
              onPress={() => setRewardType('discount')}
            >
              <Text className={`text-center font-medium ${rewardType === 'discount' ? 'text-blue-700' : 'text-gray-700'}`}>Discount</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`w-[48%] p-4 rounded-xl mb-4 ${rewardType === 'free_item' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border border-gray-300'}`}
              onPress={() => setRewardType('free_item')}
            >
              <Text className={`text-center font-medium ${rewardType === 'free_item' ? 'text-blue-700' : 'text-gray-700'}`}>Free Item</Text>
            </TouchableOpacity>
          </View>
          
          {rewardType === 'discount' && (
            <View className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <Text className="text-gray-700 mb-2">Discount Percentage</Text>
              <View className="flex-row items-center bg-white border border-gray-300 rounded-lg p-2">
                <TextInput 
                  className="flex-1 p-2"
                  placeholder="20"
                  keyboardType="number-pad"
                />
                <Text className="text-gray-500 mr-2">%</Text>
              </View>
            </View>
          )}
          
          {rewardType === 'free_item' && (
            <View className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <Text className="text-gray-700 mb-2">Free Item Description</Text>
              <TextInput 
                className="bg-white border border-gray-300 rounded-lg p-3"
                placeholder="e.g. Free coffee, Any pastry, etc."
              />
            </View>
          )}
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

export default Step4Program; 
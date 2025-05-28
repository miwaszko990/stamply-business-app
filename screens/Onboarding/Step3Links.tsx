import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';

const Step3Links = () => {
  const [socialMediaEnabled, setSocialMediaEnabled] = React.useState(false);
  const [websiteEnabled, setWebsiteEnabled] = React.useState(false);
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-2 text-center mt-6">Connect Your Business</Text>
        <Text className="text-gray-500 text-center mb-8">Step 3 of 5</Text>
        
        <View className="mb-6 bg-gray-50 p-4 rounded-xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-700 font-medium text-lg">Website</Text>
            <Switch 
              value={websiteEnabled}
              onValueChange={setWebsiteEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
            />
          </View>
          
          {websiteEnabled && (
            <View>
              <Text className="text-gray-700 mb-2">Website URL</Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-white"
                placeholder="https://yourbusiness.com"
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
          )}
        </View>
        
        <View className="mb-6 bg-gray-50 p-4 rounded-xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-700 font-medium text-lg">Social Media</Text>
            <Switch 
              value={socialMediaEnabled}
              onValueChange={setSocialMediaEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
            />
          </View>
          
          {socialMediaEnabled && (
            <View>
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Instagram</Text>
                <TextInput 
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  placeholder="@yourbusiness"
                  autoCapitalize="none"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Facebook</Text>
                <TextInput 
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  placeholder="facebook.com/yourbusiness"
                  autoCapitalize="none"
                />
              </View>
              
              <View>
                <Text className="text-gray-700 mb-2">Twitter</Text>
                <TextInput 
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  placeholder="@yourbusiness"
                  autoCapitalize="none"
                />
              </View>
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

export default Step3Links; 
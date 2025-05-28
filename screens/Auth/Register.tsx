import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const RegisterScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-8 text-center mt-10">Create Account</Text>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Business Name</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="Enter your business name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Password</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="Create a password"
            secureTextEntry={true}
          />
        </View>
        
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Confirm Password</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="Confirm your password"
            secureTextEntry={true}
          />
        </View>
        
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mb-4">
          <Text className="text-white text-center font-bold text-lg">Register</Text>
        </TouchableOpacity>
        
        <View className="flex-row justify-center mt-4 mb-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen; 
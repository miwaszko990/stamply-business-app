import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold mb-8 text-center">Login</Text>
      
      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Email</Text>
        <TextInput 
          className="border border-gray-300 rounded-lg p-3 bg-gray-50"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Password</Text>
        <TextInput 
          className="border border-gray-300 rounded-lg p-3 bg-gray-50"
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>
      
      <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
        <Text className="text-white text-center font-bold text-lg">Login</Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">Don't have an account? </Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-bold">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen; 
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text } from 'react-native-paper';

interface LogoSelectorProps {
  logo: string | null;
  setLogo: (uri: string | null) => void;
  size?: number;
}

const LogoSelector = ({ logo, setLogo, size = 120 }: LogoSelectorProps) => {
  const pickLogo = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to allow access to your photos to upload a company logo.');
      return;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };
  
  return (
    <View className="items-center mb-6">
      <Text className="text-gray-700 text-lg font-medium mb-4">Company Logo</Text>
      <TouchableOpacity 
        onPress={pickLogo} 
        style={{ width: size, height: size }}
        className="rounded-xl overflow-hidden bg-gray-100 border border-gray-300 mb-2 items-center justify-center"
      >
        {logo ? (
          <Image source={{ uri: logo }} className="w-full h-full" />
        ) : (
          <View className="items-center justify-center">
            <Text className="text-gray-500 text-center px-4">Tap to upload your company logo</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text className="text-gray-500 text-sm text-center">
        Your logo will appear on your loyalty card
      </Text>
    </View>
  );
};

export default LogoSelector; 
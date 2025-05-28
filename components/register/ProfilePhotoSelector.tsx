import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text } from 'react-native-paper';

interface ProfilePhotoSelectorProps {
  image: string | null;
  setImage: (uri: string | null) => void;
  size?: number;
}

const ProfilePhotoSelector = ({ image, setImage, size = 120 }: ProfilePhotoSelectorProps) => {
  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to allow access to your photos to upload a profile picture.');
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
      setImage(result.assets[0].uri);
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={[styles.photoContainer, { width: size, height: size }]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.photo} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Add Logo</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.helperText}>Tap to select a company logo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoContainer: {
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ProfilePhotoSelector; 
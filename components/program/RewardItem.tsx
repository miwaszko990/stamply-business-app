import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface RewardItemProps {
  stampNumber: number;
  description: string;
  onUpdate: (stampNumber: number, description: string) => void;
  onDelete: () => void;
  isEditable?: boolean;
}

const RewardItem = ({ 
  stampNumber, 
  description, 
  onUpdate, 
  onDelete,
  isEditable = true
}: RewardItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localStampNumber, setLocalStampNumber] = useState(stampNumber.toString());
  const [localDescription, setLocalDescription] = useState(description);

  const handleSave = () => {
    const newStampNumber = parseInt(localStampNumber);
    if (!isNaN(newStampNumber)) {
      onUpdate(newStampNumber, localDescription);
      setIsEditing(false);
    }
  };

  return (
    <View className="mb-3 bg-white rounded-lg border border-gray-200 p-3">
      {isEditing && isEditable ? (
        <View>
          <View className="flex-row items-center mb-2">
            <Text className="mr-2">After</Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-lg py-1 px-2 w-12 text-center"
              value={localStampNumber}
              onChangeText={setLocalStampNumber}
              keyboardType="number-pad"
            />
            <Text className="ml-2">stamps:</Text>
          </View>
          <TextInput
            className="bg-gray-50 border border-gray-300 rounded-lg p-2 mb-2"
            value={localDescription}
            onChangeText={setLocalDescription}
            placeholder="Reward description"
          />
          <View className="flex-row justify-end">
            <TouchableOpacity 
              onPress={() => setIsEditing(false)}
              className="px-3 py-1 mr-2"
            >
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSave}
              className="bg-blue-500 px-3 py-1 rounded"
            >
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-2">
                <Text className="text-white font-bold">{stampNumber}</Text>
              </View>
              <Text className="text-gray-800 font-medium">stamps:</Text>
            </View>
            <Text className="text-gray-700 mt-1 ml-10">{description}</Text>
          </View>
          
          {isEditable && (
            <View className="flex-row">
              <TouchableOpacity 
                onPress={() => setIsEditing(true)}
                className="p-2"
              >
                <Ionicons name="pencil" size={18} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={onDelete}
                className="p-2"
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default RewardItem; 
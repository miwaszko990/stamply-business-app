import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ColorOption {
  color: string;
  name: string;
}

interface ColorPickerProps {
  title: string;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  colors: ColorOption[];
}

const ColorPicker = ({ title, selectedColor, onSelectColor, colors }: ColorPickerProps) => {
  return (
    <View className="mb-6">
      <Text className="text-gray-700 text-lg font-medium mb-4">{title}</Text>
      <View className="flex-row flex-wrap">
        {colors.map((colorOption) => (
          <TouchableOpacity
            key={colorOption.color}
            onPress={() => onSelectColor(colorOption.color)}
            className={`w-14 h-14 rounded-full mr-4 mb-4 items-center justify-center ${
              selectedColor === colorOption.color ? 'border-2 border-gray-800' : ''
            }`}
            style={{ backgroundColor: colorOption.color }}
          >
            {selectedColor === colorOption.color && (
              <View className="w-4 h-4 rounded-full bg-white" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ColorPicker; 
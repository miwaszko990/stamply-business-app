import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LoyaltyCardPreviewProps {
  companyName: string;
  logo: string | null;
  instagram: string;
  cardBackgroundColor: string;
  stampColor: string;
  totalStamps: number;
}

const LoyaltyCardPreview = ({
  companyName,
  logo,
  instagram,
  cardBackgroundColor,
  stampColor,
  totalStamps
}: LoyaltyCardPreviewProps) => {
  // Calculate the number of stamps to display (max 10)
  const displayStamps = Math.min(totalStamps, 10);
  
  // Calculate rows and columns for stamps
  const stampLayout = calculateStampLayout(displayStamps);
  
  return (
    <View className="rounded-xl overflow-hidden shadow-md" style={{ backgroundColor: cardBackgroundColor }}>
      <View className="p-4">
        {/* Card Header */}
        <View className="flex-row justify-between items-center mb-4">
          {logo ? (
            <Image 
              source={{ uri: logo }} 
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center">
              <Text className="text-gray-500 font-bold">{companyName.substring(0, 2).toUpperCase()}</Text>
            </View>
          )}
          
          <View className="items-end">
            <Text className="text-lg font-bold" style={{ color: stampColor }}>{companyName}</Text>
            {instagram && (
              <View className="flex-row items-center mt-1">
                <Ionicons name="logo-instagram" size={14} color={stampColor} />
                <Text className="text-xs ml-1" style={{ color: stampColor }}>{instagram}</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* Stamp Area */}
        <View className="my-2">
          {stampLayout.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} className="flex-row justify-center my-2">
              {row.map((stampIndex) => (
                <View 
                  key={`stamp-${stampIndex}`}
                  className="w-10 h-10 rounded-full mx-1 items-center justify-center"
                  style={{ borderWidth: 2, borderColor: stampColor }}
                >
                  <Text style={{ color: stampColor }}>•</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        
        {/* Card Footer */}
        <View className="items-center mt-2 mb-1">
          <Text className="text-sm" style={{ color: stampColor }}>
            Collect {totalStamps} stamps for a reward
          </Text>
        </View>
      </View>
    </View>
  );
};

// Helper function to calculate the layout of stamps in rows
const calculateStampLayout = (totalStamps: number): number[][] => {
  // For stamps 1-5, use a single row
  if (totalStamps <= 5) {
    return [Array.from({ length: totalStamps }, (_, i) => i)];
  }
  
  // For stamps 6-10, use two rows
  const firstRow = Array.from({ length: Math.ceil(totalStamps / 2) }, (_, i) => i);
  const secondRow = Array.from({ length: Math.floor(totalStamps / 2) }, (_, i) => i + firstRow.length);
  
  return [firstRow, secondRow];
};

export default LoyaltyCardPreview; 
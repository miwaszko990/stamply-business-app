import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../lib/store/onboardingStore';
import LogoSelector from '../../components/design/LogoSelector';
import ColorPicker from '../../components/design/ColorPicker';

// Define available colors
const CARD_COLORS = [
  { color: '#FFFFFF', name: 'White' },
  { color: '#F3F4F6', name: 'Light Gray' },
  { color: '#DBEAFE', name: 'Light Blue' },
  { color: '#FEF3C7', name: 'Light Yellow' },
  { color: '#ECFDF5', name: 'Light Green' },
  { color: '#FEE2E2', name: 'Light Red' }
];

const STAMP_COLORS = [
  { color: '#3B82F6', name: 'Blue' },
  { color: '#EF4444', name: 'Red' },
  { color: '#10B981', name: 'Green' },
  { color: '#8B5CF6', name: 'Purple' },
  { color: '#F59E0B', name: 'Orange' },
  { color: '#000000', name: 'Black' }
];

const Step2Design = ({ navigation }: any) => {
  // Get design info from Zustand store
  const { designInfo, setDesignInfo } = useOnboardingStore();
  
  // Local state
  const [logo, setLogo] = useState<string | null>(designInfo.logo);
  const [cardStyle, setCardStyle] = useState(designInfo.cardStyle);
  const [cardBackgroundColor, setCardBackgroundColor] = useState(designInfo.cardBackgroundColor);
  const [stampColor, setStampColor] = useState(designInfo.stampColor);
  
  // Handle card style selection
  const handleCardStyleSelect = (style: string) => {
    setCardStyle(style);
  };

  // Handle next button press
  const handleNext = () => {
    // Update global state
    setDesignInfo({
      logo,
      cardStyle,
      colorScheme: 'custom', // Since we're now using custom colors
      cardBackgroundColor,
      stampColor
    });
    
    // Navigate to next step
    navigation.navigate('Step3Links');
  };

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="p-6">
            <Text className="text-3xl font-bold mb-2 text-center mt-6 text-blue-500">Design Your Loyalty Card</Text>
            <Text className="text-gray-500 text-center mb-8">Step 2 of 5</Text>
            
            {/* Logo selector */}
            <LogoSelector
              logo={logo}
              setLogo={setLogo}
              size={150}
            />
            
            {/* Card style selection */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-4 text-lg font-medium">Select Card Style</Text>
              <View className="flex-row flex-wrap justify-between">
                <TouchableOpacity 
                  className={`w-[48%] h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden ${cardStyle === 'minimal' ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                  onPress={() => handleCardStyleSelect('minimal')}
                >
                  <View className="w-full h-full items-center justify-center">
                    <Text className="text-center font-medium">Minimal</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={`w-[48%] h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden ${cardStyle === 'modern' ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                  onPress={() => handleCardStyleSelect('modern')}
                >
                  <View className="w-full h-full items-center justify-center">
                    <Text className="text-center font-medium">Modern</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={`w-[48%] h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden ${cardStyle === 'elegant' ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                  onPress={() => handleCardStyleSelect('elegant')}
                >
                  <View className="w-full h-full items-center justify-center">
                    <Text className="text-center font-medium">Elegant</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={`w-[48%] h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden ${cardStyle === 'bold' ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                  onPress={() => handleCardStyleSelect('bold')}
                >
                  <View className="w-full h-full items-center justify-center">
                    <Text className="text-center font-medium">Bold</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Color pickers */}
            <ColorPicker
              title="Card Background Color"
              selectedColor={cardBackgroundColor}
              onSelectColor={setCardBackgroundColor}
              colors={CARD_COLORS}
            />
            
            <ColorPicker
              title="Stamp Color"
              selectedColor={stampColor}
              onSelectColor={setStampColor}
              colors={STAMP_COLORS}
            />
            
            {/* Card preview */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-4 text-lg font-medium">Preview</Text>
              <View 
                className="h-56 rounded-xl border border-gray-300 items-center justify-center overflow-hidden"
                style={{ backgroundColor: cardBackgroundColor }}
              >
                {logo ? (
                  <View className="absolute top-4 left-4 w-16 h-16 rounded-full overflow-hidden">
                    <Image source={{ uri: logo }} className="w-full h-full" />
                  </View>
                ) : null}
                
                <Text className="text-lg font-bold" style={{ color: stampColor }}>
                  Your Loyalty Card
                </Text>
                
                <View className="flex-row mt-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <View 
                      key={num} 
                      className="w-8 h-8 rounded-full mx-1 items-center justify-center"
                      style={{ borderWidth: 2, borderColor: stampColor }}
                    >
                      <Text style={{ color: stampColor }}>•</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            
            {/* Navigation buttons */}
            <View className="flex-row justify-between mt-6">
              <TouchableOpacity 
                className="bg-gray-200 p-4 rounded-lg w-[48%]"
                onPress={handleBack}
              >
                <Text className="text-center font-bold text-gray-700">Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="bg-blue-500 p-4 rounded-lg w-[48%]"
                onPress={handleNext}
              >
                <Text className="text-white text-center font-bold">Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Step2Design; 
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../lib/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import RewardItem from '../../components/program/RewardItem';

interface Reward {
  stampNumber: number;
  description: string;
}

const Step4Program = ({ navigation }: any) => {
  // Get program info from Zustand store
  const { programInfo, setProgramInfo } = useOnboardingStore();
  
  // Local state
  const [programName, setProgramName] = useState(programInfo.programName);
  const [stampsRequired, setStampsRequired] = useState(programInfo.stampsRequired.toString());
  const [rewards, setRewards] = useState<Reward[]>(programInfo.rewards);
  const [newRewardStampNumber, setNewRewardStampNumber] = useState('');
  const [newRewardDescription, setNewRewardDescription] = useState('');
  
  // Handle stamp number change
  const handleStampsRequiredChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setStampsRequired(value);
    }
  };
  
  // Add a new reward
  const addReward = () => {
    if (!newRewardStampNumber.trim() || !newRewardDescription.trim()) {
      Alert.alert('Missing Fields', 'Please fill in both stamp number and reward description');
      return;
    }
    
    const stampNumber = parseInt(newRewardStampNumber);
    if (isNaN(stampNumber) || stampNumber <= 0) {
      Alert.alert('Invalid Stamp Number', 'Please enter a valid stamp number greater than 0');
      return;
    }
    
    // Check if this stamp number already has a reward
    const existingReward = rewards.find(r => r.stampNumber === stampNumber);
    if (existingReward) {
      Alert.alert('Duplicate Stamp Number', 'A reward already exists for this stamp number');
      return;
    }
    
    const maxStamps = parseInt(stampsRequired);
    if (!isNaN(maxStamps) && stampNumber > maxStamps) {
      Alert.alert('Stamp Number Too High', `Stamp number cannot exceed total stamps (${maxStamps})`);
      return;
    }
    
    const newReward: Reward = {
      stampNumber,
      description: newRewardDescription
    };
    
    // Add to rewards and sort by stamp number
    const updatedRewards = [...rewards, newReward].sort((a, b) => a.stampNumber - b.stampNumber);
    setRewards(updatedRewards);
    
    // Clear input fields
    setNewRewardStampNumber('');
    setNewRewardDescription('');
  };
  
  // Update an existing reward
  const updateReward = (index: number, stampNumber: number, description: string) => {
    const updatedRewards = [...rewards];
    updatedRewards[index] = { stampNumber, description };
    
    // Sort rewards by stamp number
    setRewards(updatedRewards.sort((a, b) => a.stampNumber - b.stampNumber));
  };
  
  // Delete a reward
  const deleteReward = (index: number) => {
    const updatedRewards = rewards.filter((_, i) => i !== index);
    setRewards(updatedRewards);
  };
  
  // Handle next button press
  const handleNext = () => {
    // Validate required fields
    if (!programName.trim()) {
      Alert.alert('Missing Information', 'Please enter a program name');
      return;
    }
    
    const totalStamps = parseInt(stampsRequired);
    if (isNaN(totalStamps) || totalStamps <= 0) {
      Alert.alert('Invalid Total Stamps', 'Please enter a valid number of stamps greater than 0');
      return;
    }
    
    if (rewards.length === 0) {
      Alert.alert('No Rewards', 'Please add at least one reward to your program');
      return;
    }
    
    // Save to global state
    setProgramInfo({
      programName,
      stampsRequired: totalStamps,
      rewards,
    });
    
    // Navigate to next step
    navigation.navigate('Step5Preview');
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
            <Text className="text-3xl font-bold mb-2 text-center mt-6 text-blue-500">Loyalty Program</Text>
            <Text className="text-gray-500 text-center mb-8">Step 4 of 5</Text>
            
            {/* Program Name */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 text-lg font-medium">Program Name <Text className="text-red-500">*</Text></Text>
              <TextInput 
                className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                placeholder="Enter your loyalty program name"
                value={programName}
                onChangeText={setProgramName}
              />
            </View>
            
            {/* Total Stamps Required */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 text-lg font-medium">Total Stamps Required <Text className="text-red-500">*</Text></Text>
              <View className="flex-row items-center">
                <TextInput 
                  className="border border-gray-300 rounded-lg p-3 bg-gray-50 flex-1"
                  placeholder="10"
                  keyboardType="number-pad"
                  value={stampsRequired}
                  onChangeText={handleStampsRequiredChange}
                />
                <Text className="text-gray-500 ml-2">stamps</Text>
              </View>
              <Text className="text-gray-500 text-xs mt-1">Total stamps needed to complete the card</Text>
            </View>
            
            {/* Rewards Section */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-4 text-lg font-medium">Rewards <Text className="text-red-500">*</Text></Text>
              
              {/* Existing Rewards */}
              {rewards.length > 0 ? (
                <View className="mb-4">
                  {rewards.map((reward, index) => (
                    <RewardItem
                      key={`${reward.stampNumber}-${index}`}
                      stampNumber={reward.stampNumber}
                      description={reward.description}
                      onUpdate={(stampNumber, description) => updateReward(index, stampNumber, description)}
                      onDelete={() => deleteReward(index)}
                    />
                  ))}
                </View>
              ) : (
                <View className="items-center py-4 mb-4 bg-gray-50 rounded-lg">
                  <Text className="text-gray-500">No rewards added yet</Text>
                </View>
              )}
              
              {/* Add New Reward */}
              <View className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Text className="text-gray-700 font-medium mb-2">Add New Reward</Text>
                
                <View className="flex-row items-center mb-3">
                  <Text className="mr-2">After</Text>
                  <TextInput 
                    className="bg-white border border-gray-300 rounded-lg py-1 px-2 w-12 text-center"
                    placeholder="5"
                    keyboardType="number-pad"
                    value={newRewardStampNumber}
                    onChangeText={setNewRewardStampNumber}
                  />
                  <Text className="ml-2">stamps:</Text>
                </View>
                
                <TextInput 
                  className="bg-white border border-gray-300 rounded-lg p-2 mb-3"
                  placeholder="Reward description (e.g. 10% off, Free item)"
                  value={newRewardDescription}
                  onChangeText={setNewRewardDescription}
                />
                
                <TouchableOpacity 
                  className="bg-blue-500 rounded-lg py-2 items-center flex-row justify-center"
                  onPress={addReward}
                >
                  <Ionicons name="add-circle-outline" size={20} color="#fff" />
                  <Text className="text-white font-medium ml-1">Add Reward</Text>
                </TouchableOpacity>
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

export default Step4Program; 
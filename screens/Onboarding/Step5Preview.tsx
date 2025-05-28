import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../lib/store/onboardingStore';
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import LoyaltyCardPreview from '../../components/preview/LoyaltyCardPreview';
import RewardsList from '../../components/preview/RewardsList';

const Step5Preview = ({ navigation }: any) => {
  const { companyInfo, designInfo, linkInfo, programInfo } = useOnboardingStore();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Helper function to convert rewards array to an object with stamp numbers as keys
  const createRewardPositions = () => {
    const rewardPositions: Record<string, string> = {};
    programInfo.rewards.forEach(reward => {
      rewardPositions[reward.stampNumber] = reward.description;
    });
    return rewardPositions;
  };
  
  // Handle confirmation and data upload
  const handleConfirm = async () => {
    if (!user) {
      Alert.alert('Authentication Error', 'You must be logged in to complete setup');
      return;
    }
    
    setIsLoading(true);
    
    try {
      let logoURL = '';
      
      // Upload logo to Firebase Storage if it exists
      if (designInfo.logo) {
        const response = await fetch(designInfo.logo);
        const blob = await response.blob();
        const storageRef = ref(storage, `company-logos/${user.uid}`);
        await uploadBytes(storageRef, blob);
        logoURL = await getDownloadURL(storageRef);
      }
      
      // Prepare the data structure for Firestore based on the screenshots
      const companyData = {
        // Company info
        name: companyInfo.companyName,
        address: companyInfo.address,
        phone: companyInfo.phoneNumber,
        email: user.email || '',
        website: companyInfo.website,
        
        // Design info
        logo: logoURL,
        cardBackgroundColor: designInfo.cardBackgroundColor,
        stampColor: designInfo.stampColor,
        
        // Links info
        instagram: linkInfo.instagram,
        booksyLink: linkInfo.booksyLink,
        
        // Stamp config
        stampConfig: {
          totalStamps: programInfo.stampsRequired,
          rewardPositions: createRewardPositions()
        },
        
        // Description (hardcoded for now)
        description: "A business using Stamply for loyalty cards",
        
        // Timestamps
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Save to Firestore with the company name as the document ID
      const sanitizedCompanyName = companyInfo.companyName
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, '')  // Remove special characters
        .toLowerCase();
      
      // Use the sanitized company name as the document ID, or user ID if name is empty
      const docId = sanitizedCompanyName || user.uid;
      
      // Write to Firestore
      await setDoc(doc(db, 'companies', docId), companyData);
      
      // Success message
      Alert.alert(
        'Setup Complete', 
        'Your loyalty program has been successfully created!',
        [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
      );
      
    } catch (error) {
      console.error('Error saving company data:', error);
      Alert.alert('Error', 'There was a problem saving your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-3xl font-bold mb-2 text-center mt-6 text-blue-500">Preview & Launch</Text>
          <Text className="text-gray-500 text-center mb-8">Step 5 of 5</Text>
          
          {/* Loyalty Card Preview */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-4 text-gray-700">Your Loyalty Card</Text>
            <LoyaltyCardPreview
              companyName={companyInfo.companyName}
              logo={designInfo.logo}
              instagram={linkInfo.instagram}
              cardBackgroundColor={designInfo.cardBackgroundColor}
              stampColor={designInfo.stampColor}
              totalStamps={programInfo.stampsRequired}
            />
          </View>
          
          {/* Company Information */}
          <View className="bg-gray-50 rounded-xl p-5 mb-6">
            <Text className="text-lg font-bold mb-2 text-gray-700">Company Information</Text>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-24">Name:</Text>
              <Text className="text-gray-800 flex-1">{companyInfo.companyName}</Text>
            </View>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-24">Address:</Text>
              <Text className="text-gray-800 flex-1">{companyInfo.address}</Text>
            </View>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-24">Phone:</Text>
              <Text className="text-gray-800 flex-1">{companyInfo.phoneNumber}</Text>
            </View>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-24">Website:</Text>
              <Text className="text-gray-800 flex-1">{companyInfo.website}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Step1CompanyInfo')}>
              <Text className="text-blue-500 mt-2">Edit</Text>
            </TouchableOpacity>
          </View>
          
          {/* Connected Accounts */}
          <View className="bg-gray-50 rounded-xl p-5 mb-6">
            <Text className="text-lg font-bold mb-2 text-gray-700">Connected Accounts</Text>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-24">Instagram:</Text>
              <Text className="text-gray-800 flex-1">{linkInfo.instagram}</Text>
            </View>
            {linkInfo.booksyLink ? (
              <View className="flex-row mb-2">
                <Text className="text-gray-500 w-24">Booksy:</Text>
                <Text className="text-gray-800 flex-1">{linkInfo.booksyLink}</Text>
              </View>
            ) : null}
            <TouchableOpacity onPress={() => navigation.navigate('Step3Links')}>
              <Text className="text-blue-500 mt-2">Edit</Text>
            </TouchableOpacity>
          </View>
          
          {/* Loyalty Program */}
          <View className="bg-gray-50 rounded-xl p-5 mb-6">
            <Text className="text-lg font-bold mb-2 text-gray-700">Loyalty Program</Text>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-24">Name:</Text>
              <Text className="text-gray-800 flex-1">{programInfo.programName}</Text>
            </View>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-24">Stamps:</Text>
              <Text className="text-gray-800 flex-1">{programInfo.stampsRequired} total stamps</Text>
            </View>
            
            <Text className="text-gray-700 font-medium mt-4 mb-2">Rewards:</Text>
            <RewardsList rewards={programInfo.rewards} stampColor={designInfo.stampColor} />
            
            <TouchableOpacity onPress={() => navigation.navigate('Step4Program')}>
              <Text className="text-blue-500 mt-4">Edit</Text>
            </TouchableOpacity>
          </View>
          
          {/* Navigation buttons */}
          <View className="flex-row justify-between mt-6 mb-10">
            <TouchableOpacity 
              className="bg-gray-200 p-4 rounded-lg w-[48%]"
              onPress={handleBack}
              disabled={isLoading}
            >
              <Text className="text-center font-bold text-gray-700">Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-green-500 p-4 rounded-lg w-[48%]"
              onPress={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-bold">Launch Program</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Step5Preview; 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user) return;
      
      try {
        // First try to fetch using the user ID
        const userDocRef = doc(db, 'companies', user.uid);
        let companySnap = await getDoc(userDocRef);
        
        // If document doesn't exist with user ID, try to find by company name in user's email
        if (!companySnap.exists() && user.email) {
          const emailPrefix = user.email.split('@')[0];
          const sanitizedName = emailPrefix.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
          
          const nameDocRef = doc(db, 'companies', sanitizedName);
          companySnap = await getDoc(nameDocRef);
        }
        
        if (companySnap.exists()) {
          setCompanyData({ id: companySnap.id, ...companySnap.data() });
        } else {
          setError('Company data not found');
        }
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [user]);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Loading dashboard...</Text>
      </SafeAreaView>
    );
  }
  
  if (error || !companyData) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center p-6">
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text className="mt-4 text-xl text-center font-bold text-gray-800">
          {error || 'Something went wrong'}
        </Text>
        <Text className="mt-2 text-gray-600 text-center">
          We couldn't load your business data. Please try again later.
        </Text>
        <TouchableOpacity 
          className="mt-6 bg-blue-500 py-3 px-6 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  // Calculate stats
  const totalStamps = companyData.stampConfig?.totalStamps || 0;
  const numRewards = Object.keys(companyData.stampConfig?.rewardPositions || {}).length;
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-blue-500 p-6 pb-12">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-2xl font-bold">{companyData.name}</Text>
              <Text className="text-blue-100 mt-1">Business Dashboard</Text>
            </View>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Stats Cards */}
        <View className="px-6 mt-(-6)">
          <View className="bg-white rounded-xl shadow-md p-5 mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-4">Loyalty Program Summary</Text>
            
            <View className="flex-row mb-4">
              <View className="bg-blue-50 rounded-xl p-4 flex-1 mr-3">
                <Text className="text-blue-500 text-xl font-bold">{totalStamps}</Text>
                <Text className="text-gray-600 text-sm">Total Stamps</Text>
              </View>
              
              <View className="bg-green-50 rounded-xl p-4 flex-1">
                <Text className="text-green-500 text-xl font-bold">{numRewards}</Text>
                <Text className="text-gray-600 text-sm">Rewards</Text>
              </View>
            </View>
            
            <TouchableOpacity className="bg-blue-500 p-3 rounded-lg">
              <Text className="text-white text-center font-medium">Edit Loyalty Program</Text>
            </TouchableOpacity>
          </View>
          
          {/* Company Info */}
          <View className="bg-white rounded-xl shadow-md p-5 mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-4">Business Information</Text>
            
            <View className="flex-row items-center mb-4">
              {companyData.logo ? (
                <Image 
                  source={{ uri: companyData.logo }} 
                  className="w-16 h-16 rounded-full mr-4"
                />
              ) : (
                <View className="w-16 h-16 rounded-full bg-gray-200 mr-4 items-center justify-center">
                  <Text className="text-gray-500 font-bold text-xl">
                    {companyData.name.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}
              
              <View className="flex-1">
                <Text className="text-gray-800 font-bold">{companyData.name}</Text>
                <Text className="text-gray-600">{companyData.address}</Text>
              </View>
            </View>
            
            <View className="border-t border-gray-100 pt-4">
              <View className="flex-row mb-2">
                <Text className="text-gray-500 w-24">Phone:</Text>
                <Text className="text-gray-800">{companyData.phone || 'Not provided'}</Text>
              </View>
              
              <View className="flex-row mb-2">
                <Text className="text-gray-500 w-24">Email:</Text>
                <Text className="text-gray-800">{companyData.email || 'Not provided'}</Text>
              </View>
              
              {companyData.instagram && (
                <View className="flex-row mb-2">
                  <Text className="text-gray-500 w-24">Instagram:</Text>
                  <Text className="text-gray-800">{companyData.instagram}</Text>
                </View>
              )}
              
              {companyData.booksyLink && (
                <View className="flex-row mb-2">
                  <Text className="text-gray-500 w-24">Booksy:</Text>
                  <Text className="text-gray-800">{companyData.booksyLink}</Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Card Preview */}
          <View className="bg-white rounded-xl shadow-md p-5 mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-4">Your Loyalty Card</Text>
            
            <View 
              className="rounded-xl p-4 mb-3 overflow-hidden"
              style={{ backgroundColor: companyData.cardBackgroundColor || '#FFFFFF' }}
            >
              <View className="flex-row justify-between items-center mb-3">
                {companyData.logo ? (
                  <Image 
                    source={{ uri: companyData.logo }} 
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
                    <Text className="text-gray-500 font-bold">
                      {companyData.name.substring(0, 2).toUpperCase()}
                    </Text>
                  </View>
                )}
                
                <View className="items-end">
                  <Text 
                    className="text-lg font-bold"
                    style={{ color: companyData.stampColor || '#3B82F6' }}
                  >
                    {companyData.name}
                  </Text>
                  {companyData.instagram && (
                    <Text 
                      className="text-xs"
                      style={{ color: companyData.stampColor || '#3B82F6' }}
                    >
                      {companyData.instagram}
                    </Text>
                  )}
                </View>
              </View>
              
              <View className="flex-row justify-center flex-wrap">
                {Array.from({ length: Math.min(totalStamps, 5) }).map((_, i) => (
                  <View 
                    key={`stamp-${i}`}
                    className="w-10 h-10 rounded-full m-1 items-center justify-center"
                    style={{ 
                      borderWidth: 2, 
                      borderColor: companyData.stampColor || '#3B82F6' 
                    }}
                  >
                    <Text style={{ color: companyData.stampColor || '#3B82F6' }}>•</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <TouchableOpacity className="bg-blue-500 p-3 rounded-lg">
              <Text className="text-white text-center font-medium">Edit Card Design</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen; 
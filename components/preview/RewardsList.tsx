import React from 'react';
import { View, Text } from 'react-native';

interface Reward {
  stampNumber: number;
  description: string;
}

interface RewardsListProps {
  rewards: Reward[];
  stampColor: string;
}

const RewardsList = ({ rewards, stampColor }: RewardsListProps) => {
  // Sort rewards by stamp number
  const sortedRewards = [...rewards].sort((a, b) => a.stampNumber - b.stampNumber);
  
  return (
    <View className="bg-white rounded-lg">
      {sortedRewards.map((reward, index) => (
        <View 
          key={`reward-${index}`} 
          className={`p-3 flex-row items-center ${index < sortedRewards.length - 1 ? 'border-b border-gray-100' : ''}`}
        >
          <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: stampColor }}>
            <Text className="text-white font-bold">{reward.stampNumber}</Text>
          </View>
          <Text className="text-gray-800">{reward.description}</Text>
        </View>
      ))}
      
      {sortedRewards.length === 0 && (
        <View className="p-4 items-center">
          <Text className="text-gray-500">No rewards configured</Text>
        </View>
      )}
    </View>
  );
};

export default RewardsList; 
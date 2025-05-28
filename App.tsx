import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'nativewind';

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">Welcome to Stamply Business!</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

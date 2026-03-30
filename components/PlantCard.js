import { View, Text, TouchableOpacity } from 'react-native';

export default function PlantCard({ plant, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 16,
          marginBottom: 12,
          backgroundColor: '#ffffff',
          borderRadius: 12,
        }}
      >
        <Text>{plant?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
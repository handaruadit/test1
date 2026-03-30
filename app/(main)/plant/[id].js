import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DataCard from '../../../components/DataCard';

export default function Detail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <DataCard title="Battery Voltage" value={48.5} unit="V" />
      <DataCard title="PV Current" value={10.2} unit="A" />
    </View>
  );
}
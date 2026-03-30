import { View, FlatList, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { router } from 'expo-router';
import PlantCard from '../../components/PlantCard';

export default function Home() {
  const { user } = useContext(AuthContext); // ✅ DI DALAM COMPONENT
  
  const plants = [
    { id: 1, name: 'Plant 1' },
    { id: 2, name: 'Plant 2' },
  ];

  console.log("PLANTS:", plants);

  return (
    <View style={{ flex: 1, padding: 20 }}>

      {/* 👇 tombol hanya muncul untuk admin */}
      {user?.role === 'admin' && (
        <Button
          title="Tambah Plant"
          onPress={() => router.push('/add-plant')}
        />
      )}

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() => router.push(`/plant/${item.id}`)}
          />
        )}
      />

    </View>
  );
}
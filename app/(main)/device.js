import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useContext, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import DeviceCard from '../../components/DeviceCard';

export default function DeviceScreen() {
  const { user, setSelectedDevice, devices } = useContext(AuthContext);
  const [search, setSearch] = useState('');

  const filteredDevices = useMemo(() => {
    return devices.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.sn?.toLowerCase().includes(keyword) ||
        item.location?.toLowerCase().includes(keyword)
      );
    });
  }, [search, devices]);

  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
    router.push('/(main)/overview');
  };

  const handleAddDevice = () => {
    router.push('/(main)/add-device');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Device</Text>

        {user?.role === 'admin' && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
            <Text style={styles.addText}>＋</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Name/SN/PN"
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DeviceCard
            device={item}
            onPress={() => handleSelectDevice(item)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada device.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  addText: {
    fontSize: 32,
    color: '#111827',
    lineHeight: 36,
  },
  searchBox: {
    marginTop: 14,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 48,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 24,
    fontSize: 15,
  },
});
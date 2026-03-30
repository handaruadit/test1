import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';

export default function AddDeviceScreen() {
  const { devices, setDevices } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [sn, setSn] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    if (!name || !sn || !location) {
      Alert.alert('Peringatan', 'Nama, SN, dan lokasi harus diisi.');
      return;
    }

    const newDevice = {
      id: Date.now(),
      name,
      sn,
      location,
      updatedAt: '2026-03-30 08:27:08 (UTC +07:00)',
      productionToday: 0,
      weather: '27°C',
      production: 0,
      grid: 0,
      battery: 0,
      upsLoad: 0,
      load: 0,
      status: 'On grid',
      batteryVoltage: '0 V',
      batteryCurrent: '0 A',
      inverterVoltage: '0 V',
      inverterCurrent: '0 A',
      pvVoltage: '0 V',
      pvCurrent: '0 A',
      outputPower: '0 W',
    };

    setDevices([...devices, newDevice]);

    Alert.alert('Berhasil', 'Device berhasil ditambahkan.');
    router.push('/(main)/device');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tambah Device</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama device"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Serial Number"
        value={sn}
        onChangeText={setSn}
      />

      <TextInput
        style={styles.input}
        placeholder="Lokasi"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan Device</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
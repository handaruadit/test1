LIST API

URL:https://nonfissionable-rocio-datable.ngrok-free.dev/
*AUTHENTICATION*
REGISTER 
api/auth/register
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
},
body: JSON.stringify({
    email: email,
    password: password,
    phone: phone,
}),

LOGIN
api/auth/login
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
},
body: JSON.stringify({
    email: email,
    password: password,
}),

*PLANT*
CREATE PLANT
api/plant/create
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},
body: JSON.stringify({
    name: name,
    location: location,
    latitude: latitude,
    longitude: longitude,
    timezone: timezone,
    system_type: system_type,
    pv_capacity: pv_capacity,
    battery_capacity: battery_capacity,
    electricity_price: electricity_price,
    currency: currency,
}),

ASSIGN DEVICE
api/plant/assign-device
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},
body: JSON.stringify({
    deviceId: deviceId,
    plant_id: plant_id,
}),

ASSIGN USER
api/plant/assign-user
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},
body: JSON.stringify({
    email: email,
    plant_id: plant_id,
    role: role,
}),

GET PLANT
api/plant/
method: 'GET',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
}

*DATA*
DATA TERBARU
api/data/?plantId=1&category=grid&limit=10
- plantId (wajib)

- category (data_bms)
- type (voltage, current, soc, cycle, alarm, cells_{1})

- category (setting_bms)
- type (sw_bal, sw_chg, sw_dis)

- category (grid)
- type (voltage, frequency, power)

- category (out)
- type (voltage, frequency, power, vaPower)

- category (baterai)
- type (voltage, current, power, soc)

- category (pv)
- type (voltage, current, power, chargePower)

- limit (berapa data yang mau diambil)

- startDate (tahun-bulan-tanggal)

- endDate (tahun-bulan-tanggal)

method: 'GET',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},

DATA DAILY
api/data/daily?plantId=1&date=2026-03-15
- plantId (wajib)
- date (wajib, YYYY-MM-DD)

- category (data_bms)
- type (voltage, current, soc, cycle, alarm, cells_{1})

- category (setting_bms)
- type (sw_bal, sw_chg, sw_dis)

- category (grid)
- type (voltage, frequency, power)

- category (out)
- type (voltage, frequency, power, vaPower)

- category (baterai)
- type (voltage, current, power, soc)

- category (pv)
- type (voltage, current, power, chargePower)

method: 'GET',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},

DATA MONTHLY
api/data/daily?plantId=1&date=2026-03
- plantId (wajib)
- date (wajib, YYYY-MM)

- category (data_bms)
- type (voltage, current, soc, cycle, alarm, cells_{1})

- category (setting_bms)
- type (sw_bal, sw_chg, sw_dis)

- category (grid)
- type (voltage, frequency, power)

- category (out)
- type (voltage, frequency, power, vaPower)

- category (baterai)
- type (voltage, current, power, soc)

- category (pv)
- type (voltage, current, power, chargePower)

method: 'GET',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},

DATA YEARLY
api/data/daily?plantId=1&date=2026
- plantId (wajib)
- date (wajib, YYYY)

- category (data_bms)
- type (voltage, current, soc, cycle, alarm, cells_{1})

- category (setting_bms)
- type (sw_bal, sw_chg, sw_dis)

- category (grid)
- type (voltage, frequency, power)

- category (out)
- type (voltage, frequency, power, vaPower)

- category (baterai)
- type (voltage, current, power, soc)

- category (pv)
- type (voltage, current, power, chargePower)

method: 'GET',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},

DATA LIFETIME
api/data/daily?plantId=1
- plantId (wajib)

- category (data_bms)
- type (voltage, current, soc, cycle, alarm, cells_{1})

- category (setting_bms)
- type (sw_bal, sw_chg, sw_dis)

- category (grid)
- type (voltage, frequency, power)

- category (out)
- type (voltage, frequency, power, vaPower)

- category (baterai)
- type (voltage, current, power, soc)

- category (pv)
- type (voltage, current, power, chargePower)

method: 'GET',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},

*MQTT*
PUBLISH
api/mqtt/publish
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
},
body: JSON.stringify({
    topik: topik,
    message: message,
}),

*CARA_PAKAI_POST*
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, ActivityIndicator } from 'react-native';
// 1. Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Perhatian', 'Email dan Password tidak boleh kosong!');
      return;
    }

    // Ingat: Gunakan URL Ngrok Anda
    const BASE_URL = 'https://nonfissionable-rocio-datable.ngrok-free.dev'; 
    const endpoint = `${BASE_URL}/api/auth/login`;

    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const jsonResponse = await response.json();

      // 2. Mengecek status dari response
      // Asumsinya API Anda mengembalikan { status: "success", token: "eyJhbG..." }
      if (response.ok && jsonResponse.status === 'success') {
        
        // 3. Menangkap Token
        const userToken = jsonResponse.token;

        // 4. Menyimpan Token ke penyimpanan lokal HP
        await AsyncStorage.setItem('userToken', userToken);

        Alert.alert('Sukses', 'Berhasil Login!');
        console.log('Token tersimpan:', userToken);
        
        // Di sini biasanya Anda menavigasi user ke Halaman Utama (Home/Dashboard)
        // navigation.replace('Home');

      } else {
        // Jika login gagal (misal password salah)
        Alert.alert('Login Gagal', jsonResponse.message || 'Email atau password salah.');
      }
    } catch (error) {
      Alert.alert('Error Jaringan', 'Tidak dapat terhubung ke server.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Masukkan Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default LoginScreen;

*CARA_PAKAI_GET*
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataScreen = () => {
  // State untuk menampung data yang bentuknya array/daftar (karena limit=10)
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      // 1. Ambil token dari penyimpanan lokal
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        Alert.alert('Error', 'Sesi Anda telah habis, silakan login kembali.');
        setIsLoading(false);
        return;
      }

      // 2. Siapkan parameter secara dinamis (Best Practice)
      // Ini lebih baik daripada mengetik URL panjang secara manual
      const BASE_URL = 'https://nonfissionable-rocio-datable.ngrok-free.dev';
      const deviceId = 'BS26031001';
      const category = 'grid';
      const limit = 10;

      // Rangkai URL menggunakan Template Literals (tanda backtick `)
      const endpoint = `${BASE_URL}/api/data/?deviceId=${deviceId}&category=${category}&limit=${limit}`;

      // 3. Tembak API dengan metode GET dan sertakan Bearer Token
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Otentikasi masuk di sini
        },
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        // Asumsi data dari API bentuknya: { status: "success", data: [...] }
        // Sesuaikan 'jsonResponse.data' dengan struktur asli API Anda
        setDataList(jsonResponse.data);
      } else {
        Alert.alert('Gagal', jsonResponse.message || 'Gagal mengambil data perangkat');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi masalah jaringan atau server Ngrok mati.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Desain komponen untuk setiap baris data (item)
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titleText}>Device: {item.deviceId}</Text>
      {/* Ganti item.value atau item.timestamp sesuai dengan nama kolom di database Anda */}
      <Text style={styles.text}>Kategori: {item.category}</Text>
      <Text style={styles.text}>Nilai: {item.value || 'N/A'}</Text> 
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Data Perangkat Grid</Text>
      
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Memuat data perangkat...</Text>
        </View>
      ) : (
        // FlatList sangat optimal untuk merender data berulang secara performa
        <FlatList
          data={dataList}
          keyExtractor={(item, index) => index.toString()} // Gunakan ID unik jika API menyediakannya (misal: item.id)
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          // Tampilan jika data dari API ternyata kosong
          ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada data ditemukan.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // Bayangan untuk Android
    shadowColor: '#000', // Bayangan untuk iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default DataScreen;

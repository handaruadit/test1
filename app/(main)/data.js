import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

function DataBox({ title, value }) {
  return (
    <View style={styles.box}>
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.boxValue}>{value}</Text>
    </View>
  );
}

export default function DataScreen() {
  const { selectedDevice } = useContext(AuthContext);

  if (!selectedDevice) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Belum ada device dipilih</Text>
        <Text style={styles.emptyText}>
          Pilih salah satu device di tab Device.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.name}>{selectedDevice.name}</Text>
        <Text style={styles.info}>SN: {selectedDevice.sn || '-'}</Text>
        <Text style={styles.info}>Location: {selectedDevice.location || '-'}</Text>

        <View style={styles.grid}>
          <DataBox
            title="Battery Voltage"
            value={selectedDevice.batteryVoltage || '-'}
          />
          <DataBox
            title="Battery Current"
            value={selectedDevice.batteryCurrent || '-'}
          />
          <DataBox
            title="Inverter Voltage"
            value={selectedDevice.inverterVoltage || '-'}
          />
          <DataBox
            title="Inverter Current"
            value={selectedDevice.inverterCurrent || '-'}
          />
          <DataBox
            title="PV Voltage"
            value={selectedDevice.pvVoltage || '-'}
          />
          <DataBox
            title="PV Current"
            value={selectedDevice.pvCurrent || '-'}
          />
          <DataBox
            title="Output Power"
            value={selectedDevice.outputPower || '-'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  info: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 4,
  },
  grid: {
    marginTop: 18,
    gap: 12,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  boxTitle: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
  },
  boxValue: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
  },
});
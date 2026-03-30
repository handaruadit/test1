import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

function InfoCard({ title, value }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function DeviceDetail() {
  const params = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.deviceName}>{params.name}</Text>
      <Text style={styles.deviceSub}>SN: {params.sn}</Text>
      <Text style={styles.deviceSub}>Owner: {params.owner}</Text>
      <Text style={styles.deviceSub}>Location: {params.location}</Text>

      <View style={styles.grid}>
        <InfoCard title="Battery Voltage" value={params.batteryVoltage} />
        <InfoCard title="Battery Current" value={params.batteryCurrent} />
        <InfoCard title="Inverter Voltage" value={params.inverterVoltage} />
        <InfoCard title="Inverter Current" value={params.inverterCurrent} />
        <InfoCard title="PV Voltage" value={params.pvVoltage} />
        <InfoCard title="PV Current" value={params.pvCurrent} />
        <InfoCard title="Output Power" value={params.outputPower} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  deviceName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  deviceSub: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 4,
  },
  grid: {
    marginTop: 20,
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
});
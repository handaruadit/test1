import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DeviceCard({ device, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageBox}>
        <View style={styles.fakeDeviceScreen} />
        <View style={styles.fakeDeviceBody} />
        <View style={styles.statusDot} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{device.name}</Text>
        <Text style={styles.sn}>SN: {device.sn}</Text>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{device.category || 'Other'}</Text>
          </View>
          <Text style={styles.location}>{device.location || '-'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageBox: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fakeDeviceScreen: {
    width: 64,
    height: 36,
    backgroundColor: '#0D2A1F',
    borderRadius: 6,
    marginBottom: 6,
  },
  fakeDeviceBody: {
    width: 72,
    height: 88,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
  },
  statusDot: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  sn: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '500',
  },
  location: {
    color: '#6B7280',
    fontSize: 13,
  },
});
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PowerFlowDiagram from '../../components/PowerFlowDiagram';

export default function OverviewScreen() {
  const { selectedDevice } = useContext(AuthContext);

  const plantData = {
    plantName: selectedDevice?.name || 'No Device Selected',
    productionToday: selectedDevice?.productionToday || 0,
    weather: selectedDevice?.weather || '27°C',
    address: selectedDevice?.location || '-',
    updatedAt: selectedDevice?.updatedAt || '-',
    production: selectedDevice?.production || 0,
    grid: selectedDevice?.grid || 0,
    battery: selectedDevice?.battery || 0,
    upsLoad: selectedDevice?.upsLoad || 0,
    load: selectedDevice?.load || 0,
    status: selectedDevice?.status || '-',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/images/solar-bg.jpg')}
          style={styles.headerBg}
          imageStyle={styles.headerBgImage}
        >
          <View style={styles.overlay}>
            <View style={styles.topRow}>
              <Text style={styles.plantName}>{plantData.plantName}</Text>

              <TouchableOpacity>
                <Text style={styles.menuText}>⋯</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryBlock}>
                <Text style={styles.summaryTitle}>Production Today</Text>
                <Text style={styles.summaryValue}>
                  {plantData.productionToday}
                  <Text style={styles.summaryUnit}> kWh</Text>
                </Text>
              </View>

              <View style={styles.summaryBlock}>
                <Text style={styles.summaryTitle}>Weather</Text>
                <Text style={styles.summaryValue}>{plantData.weather}</Text>
              </View>
            </View>

            <Text style={styles.infoText}>{plantData.address}</Text>
            <Text style={styles.infoText}>{plantData.updatedAt}</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.powerHeader}>
            <Text style={styles.powerTitle}>Power flow</Text>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.powerRightTitle}>Plant data</Text>
              <Text style={styles.gridStatus}>{plantData.status}</Text>
            </View>
          </View>

          <PowerFlowDiagram data={plantData} />

          <View style={styles.segmentCard}>
            <View style={styles.segmentRow}>
              <TouchableOpacity style={[styles.segmentButton, styles.segmentButtonActive]}>
                <Text style={styles.segmentTextActive}>Day</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.segmentButton}>
                <Text style={styles.segmentText}>Month</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.segmentButton}>
                <Text style={styles.segmentText}>Year</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.segmentButton}>
                <Text style={styles.segmentText}>Lifetime</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.arrowText}>‹</Text>
              <Text style={styles.dateText}>2026-03-30</Text>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerBg: {
    height: 300,
    justifyContent: 'flex-start',
  },
  headerBgImage: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.55)',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  plantName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginRight: 12,
  },
  menuText: {
    fontSize: 28,
    color: '#111827',
    width: 30,
    textAlign: 'right',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  summaryBlock: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  summaryUnit: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '700',
    marginBottom: 8,
  },
  content: {
    marginTop: -8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  powerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 14,
    marginBottom: 18,
  },
  powerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  powerRightTitle: {
    fontSize: 16,
    color: '#374151',
  },
  gridStatus: {
    marginTop: 4,
    color: '#22C55E',
    fontSize: 14,
    fontWeight: '600',
  },
  segmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  segmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  segmentButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: {
    color: '#6B7280',
    fontSize: 14,
  },
  segmentTextActive: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 28,
    color: '#6B7280',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});
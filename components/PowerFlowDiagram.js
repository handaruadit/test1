import { View, Text, StyleSheet } from 'react-native';

function FlowBox({ title, value, unit = 'kW', topLabel }) {
  return (
    <View style={styles.flowBox}>
      <View style={styles.iconPlaceholder} />
      {topLabel ? <Text style={styles.topLabel}>{topLabel}</Text> : null}
      <Text style={styles.flowValue}>
        {value}
        <Text style={styles.flowUnit}> {unit}</Text>
      </Text>
      <Text style={styles.flowLabel}>{title}</Text>
    </View>
  );
}

export default function PowerFlowDiagram({ data }) {
  return (
    <View style={styles.diagramWrap}>
      {/* ROW ATAS */}
      <View style={styles.topRow}>
        <FlowBox
          title="Production"
          value={Number(data.production).toFixed(2)}
        />
        <FlowBox
          title="Grid"
          value={Number(data.grid).toFixed(2)}
          topLabel={data.status}
        />
      </View>

      {/* CENTER */}
      <View style={styles.centerWrapper}>
        <View style={styles.centerBox}>
          <View style={styles.centerIcon} />
        </View>
      </View>

      {/* ROW BAWAH */}
      <View style={styles.bottomRow}>
        <FlowBox
          title="Battery"
          value={Number(data.battery).toFixed(2)}
        />
        <FlowBox
          title="Ups-Load"
          value={Number(data.upsLoad).toFixed(2)}
        />
        <FlowBox
          title="Load"
          value={Number(data.load).toFixed(2)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  diagramWrap: {
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  centerWrapper: {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 35,   
  marginBottom: 70,
},

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  flowBox: {
    width: 96,
    alignItems: 'center',
  },

  centerBox: {
    width: 80,
    height: 80,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  centerIcon: {
    width: 44,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },

  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },

  topLabel: {
    color: '#22C55E',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },

  flowValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  flowUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },

  flowLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
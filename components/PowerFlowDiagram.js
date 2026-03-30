import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CONTENT_WIDTH = width - 32;

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
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        {/* Production → Inverter */}
        <Path
          d="M 80 70 L 160 70 L 160 160"
          stroke="#374151"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Grid → Inverter */}
        <Path
          d="M 300 70 L 240 70 L 240 160"
          stroke="#374151"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Inverter → Battery */}
        <Path
          d="M 160 210 L 160 300 L 85 300"
          stroke="#374151"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Inverter → UPS */}
        <Path
          d="M 200 210 L 200 300"
          stroke="#374151"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Inverter → Load */}
        <Path
          d="M 240 210 L 240 300 L 315 300"
          stroke="#374151"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Arrows */}
        <Polygon points="155,155 165,155 160,165" fill="#111827" />
        <Polygon points="235,155 245,155 240,165" fill="#111827" />
        <Polygon points="80,295 80,305 68,300" fill="#111827" />
        <Polygon points="195,295 205,295 200,308" fill="#111827" />
        <Polygon points="310,295 320,295 315,308" fill="#111827" />

        {/* Dots */}
        <Circle cx="160" cy="115" r="6" fill="#60A5FA" />
        <Circle cx="240" cy="115" r="6" fill="#22C55E" />
        <Circle cx="160" cy="255" r="6" fill="#60A5FA" />
        <Circle cx="200" cy="255" r="6" fill="#60A5FA" />
      </Svg>

      {/* TOP LEFT */}
      <View style={[styles.absBox, { top: 16, left: 16 }]}>
        <FlowBox title="Production" value={Number(data.production).toFixed(2)} />
      </View>

      {/* TOP RIGHT */}
      <View style={[styles.absBox, { top: 16, right: 16 }]}>
        <FlowBox
          title="Grid"
          value={Number(data.grid).toFixed(2)}
          topLabel={data.status}
        />
      </View>

      {/* CENTER */}
      <View style={styles.centerBox}>
        <View style={styles.centerIcon} />
      </View>

      {/* BOTTOM LEFT */}
      <View style={[styles.absBox, { bottom: 16, left: 16 }]}>
        <FlowBox title="Battery" value={Number(data.battery).toFixed(2)} />
      </View>

      {/* BOTTOM CENTER */}
      <View style={[styles.absBox, { bottom: 16, left: CONTENT_WIDTH / 2 - 82 }]}>
        <FlowBox title="Ups-Load" value={Number(data.upsLoad).toFixed(2)} />
      </View>

      {/* BOTTOM RIGHT */}
      <View style={[styles.absBox, { bottom: 16, right: 16 }]}>
        <FlowBox title="Load" value={Number(data.load).toFixed(2)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  diagramWrap: {
    position: 'relative',
    height: 430,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  absBox: {
    position: 'absolute',
    width: 96,
    alignItems: 'center',
  },
  centerBox: {
    position: 'absolute',
    top: 150,
    left: '50%',
    marginLeft: -48,
    width: 96,
    height: 96,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  centerIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  flowBox: {
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 18,
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
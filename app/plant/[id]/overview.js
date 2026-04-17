import PowerFlowDiagram from "@/components/PowerFlowDiagram";
import { AuthContext } from "@/context/AuthContext";
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line, Path, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;
const CHART_WIDTH = screenWidth - 60;
const CHART_HEIGHT = 220;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round2(value) {
  return Number(value.toFixed(2));
}

function generateDailySeries() {
  const production = [];
  const grid = [];
  const battery = [];
  const upsLoad = [];
  const load = [];

  for (let minute = 0; minute <= 24 * 60; minute += 5) {
    const hour = minute / 60;

    const loadVal = clamp(
      0.6 +
        0.12 * Math.sin((hour / 24) * Math.PI * 2) +
        0.08 * Math.sin((hour / 24) * Math.PI * 5),
      0.35,
      1.1
    );

    const upsVal = clamp(
      0.9 +
        0.18 * Math.sin((hour / 24) * Math.PI * 2 + 0.8) +
        0.1 * Math.cos((hour / 24) * Math.PI * 4),
      0.55,
      1.4
    );

    let solar = 0;
    if (hour >= 6 && hour <= 18) {
      const normalized = (hour - 6) / 12;
      solar =
        2.4 * Math.sin(normalized * Math.PI) +
        0.2 * Math.sin(normalized * Math.PI * 5);
      solar = Math.max(0, solar);
    }

    let batt = 0;
    if (hour >= 8 && hour <= 16) {
      batt = 0.7 * Math.sin(((hour - 8) / 8) * Math.PI);
    } else if (hour > 18 || hour < 6) {
      const n = hour > 18 ? hour - 18 : hour + 6;
      batt = -0.6 * Math.sin((n / 12) * Math.PI);
    } else {
      batt = -0.08;
    }

    const prodVal = clamp(solar, 0, 2.7);
    const battVal = clamp(batt, -0.8, 0.9);
    const gridVal = clamp(loadVal + upsVal - prodVal - battVal, -1.2, 2.2);

    production.push(round2(prodVal));
    grid.push(round2(gridVal));
    battery.push(round2(battVal));
    upsLoad.push(round2(upsVal));
    load.push(round2(loadVal));
  }

  return { production, grid, battery, upsLoad, load };
}

function buildLinePath(data, minY, maxY, width, height, pad) {
  const innerWidth = width - pad.left - pad.right;
  const innerHeight = height - pad.top - pad.bottom;

  return data
    .map((value, index) => {
      const x = pad.left + (index / (data.length - 1)) * innerWidth;
      const y =
        pad.top + ((maxY - value) / (maxY - minY || 1)) * innerHeight;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildAreaPath(data, minY, maxY, width, height, pad) {
  const innerWidth = width - pad.left - pad.right;
  const innerHeight = height - pad.top - pad.bottom;
  const baseY = pad.top + ((maxY - 0) / (maxY - minY || 1)) * innerHeight;

  const points = data.map((value, index) => {
    const x = pad.left + (index / (data.length - 1)) * innerWidth;
    const y =
      pad.top + ((maxY - value) / (maxY - minY || 1)) * innerHeight;
    return { x, y };
  });

  const first = points[0];
  const last = points[points.length - 1];

  return [
    `M ${first.x} ${baseY}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${last.x} ${baseY}`,
    "Z",
  ].join(" ");
}

function DailyOverviewChart({ series }) {
  const pad = { top: 12, right: 10, bottom: 28, left: 38 };

  const datasets = [
    { key: "production", label: "Production", color: "#22C55E", data: series.production },
    { key: "grid", label: "Grid", color: "#F59E0B", data: series.grid },
    { key: "battery", label: "Battery", color: "#3B82F6", data: series.battery },
    { key: "upsLoad", label: "Ups-Load", color: "#8B5CF6", data: series.upsLoad },
    { key: "load", label: "Load", color: "#EF4444", data: series.load },
  ];

  const allValues = datasets.flatMap((d) => d.data);
  const minY = Math.min(-1.5, Math.floor(Math.min(...allValues) - 0.2));
  const maxY = Math.max(3, Math.ceil(Math.max(...allValues) + 0.2));

  const yTicks = 5;
  const xTickHours = [0, 4, 8, 12, 16, 20, 24];
  const innerWidth = CHART_WIDTH - pad.left - pad.right;
  const innerHeight = CHART_HEIGHT - pad.top - pad.bottom;

  return (
    <View style={styles.chartSection}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const value = minY + ((maxY - minY) / yTicks) * i;
          const y = pad.top + ((maxY - value) / (maxY - minY)) * innerHeight;

          return (
            <View key={`y-${i}`}>
              <Line
                x1={pad.left}
                y1={y}
                x2={CHART_WIDTH - pad.right}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <SvgText
                x={pad.left - 8}
                y={y + 4}
                fontSize="10"
                fill="#6B7280"
                textAnchor="end"
              >
                {value.toFixed(1)}
              </SvgText>
            </View>
          );
        })}

        {xTickHours.map((hour) => {
          const ratio = hour / 24;
          const x = pad.left + ratio * innerWidth;

          return (
            <View key={`x-${hour}`}>
              <Line
                x1={x}
                y1={pad.top}
                x2={x}
                y2={CHART_HEIGHT - pad.bottom}
                stroke="#F3F4F6"
                strokeWidth="1"
              />
              <SvgText
                x={x}
                y={CHART_HEIGHT - 8}
                fontSize="10"
                fill="#6B7280"
                textAnchor="middle"
              >
                {String(hour).padStart(2, "0")}:00
              </SvgText>
            </View>
          );
        })}

        {datasets.map((item) => (
          <Path
            key={`${item.key}-area`}
            d={buildAreaPath(item.data, minY, maxY, CHART_WIDTH, CHART_HEIGHT, pad)}
            fill={item.color}
            opacity={0.08}
          />
        ))}

        {datasets.map((item) => (
          <Path
            key={`${item.key}-line`}
            d={buildLinePath(item.data, minY, maxY, CHART_WIDTH, CHART_HEIGHT, pad)}
            stroke={item.color}
            strokeWidth="2"
            fill="none"
          />
        ))}

        <SvgText
          x={12}
          y={16}
          fontSize="11"
          fill="#6B7280"
          textAnchor="start"
        >
          kW
        </SvgText>
      </Svg>

      <View style={styles.legendWrap}>
        {datasets.map((item) => (
          <View key={item.key} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function OverviewScreen() {
  const { selectedDevice } = useContext(AuthContext);
  const [activeSegment, setActiveSegment] = useState("day");
  const [fetchedData, setFetchedData] = useState(null);
  const dailySeries = useMemo(() => generateDailySeries(), []);
  const { id } = useLocalSearchParams();
  const plantId = id || 1; // Default to 1 if no id

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MDUyYmI1MS1lNGMyLTQwNGMtYmNiNC04MWFmMDJlMTYxMGUiLCJpYXQiOjE3NzUwMzY0MDcsImV4cCI6MTc3NTY0MTIwN30.aERX8Mw2BdAEc0lzEmll7QAt7CmUVccVm3TjGoWxJec";
  
  if (!token) {
    Alert.alert('Error', 'Sesi Anda telah habis, silakan login kembali.');
    return;
  }

  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `${BASE_URL}/api/data/device-id?plantId=${plantId}`;
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const jsonResponse = await response.json();
        console.log("API Response:", jsonResponse.data);
        setFetchedData(jsonResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data from API.');
      }
    };
    fetchData();
  }, [plantId]);

  const plantData = {
    plantName: fetchedData?.name || selectedDevice?.name || "No Device Selected",
    productionToday: fetchedData?.productionToday || selectedDevice?.productionToday || 0,
    weather: fetchedData?.weather || selectedDevice?.weather || "27°C",
    address: fetchedData?.location || selectedDevice?.location || "-",
    updatedAt: fetchedData?.updatedAt || selectedDevice?.updatedAt || "-",
    production: fetchedData?.production || selectedDevice?.production || 0,
    grid: fetchedData?.grid || selectedDevice?.grid || 0,
    battery: fetchedData?.battery || selectedDevice?.battery || 0,
    upsLoad: fetchedData?.upsLoad || selectedDevice?.upsLoad || 0,
    load: fetchedData?.load || selectedDevice?.load || 0,
    status: fetchedData?.status || selectedDevice?.status || "-",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("@/assets/images/solar-bg.jpg")}
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

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.powerRightTitle}>Plant data</Text>
              <Text style={styles.gridStatus}>{plantData.status}</Text>
            </View>
          </View>

          <PowerFlowDiagram data={plantData} />

          <View style={styles.segmentCard}>
            <View style={styles.segmentRow}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  activeSegment === "day" && styles.segmentButtonActive,
                ]}
                onPress={() => setActiveSegment("day")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    activeSegment === "day" && styles.segmentTextActive,
                  ]}
                >
                  Day
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  activeSegment === "month" && styles.segmentButtonActive,
                ]}
                onPress={() => setActiveSegment("month")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    activeSegment === "month" && styles.segmentTextActive,
                  ]}
                >
                  Month
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  activeSegment === "year" && styles.segmentButtonActive,
                ]}
                onPress={() => setActiveSegment("year")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    activeSegment === "year" && styles.segmentTextActive,
                  ]}
                >
                  Year
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  activeSegment === "lifetime" && styles.segmentButtonActive,
                ]}
                onPress={() => setActiveSegment("lifetime")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    activeSegment === "lifetime" && styles.segmentTextActive,
                  ]}
                >
                  Lifetime
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.arrowText}>‹</Text>
              <Text style={styles.dateText}>2026-03-30</Text>
              <Text style={styles.arrowText}>›</Text>
            </View>

            {activeSegment === "day" && (
              <DailyOverviewChart series={dailySeries} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  headerBg: {
    height: 300,
    justifyContent: "flex-start",
  },
  headerBgImage: {
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.55)",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  plantName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginRight: 12,
  },
  menuText: {
    fontSize: 28,
    color: "#111827",
    width: 30,
    textAlign: "right",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  summaryBlock: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  summaryUnit: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "700",
    marginBottom: 8,
  },
  content: {
    marginTop: -8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  powerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 14,
    marginBottom: 18,
  },
  powerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  powerRightTitle: {
    fontSize: 16,
    color: "#374151",
  },
  gridStatus: {
    marginTop: 4,
    color: "#22C55E",
    fontSize: 14,
    fontWeight: "600",
  },
  segmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  segmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  segmentButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  segmentButtonActive: {
    backgroundColor: "#FFFFFF",
  },
  segmentText: {
    color: "#6B7280",
    fontSize: 14,
  },
  segmentTextActive: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 28,
    color: "#6B7280",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  chartSection: {
    marginTop: 14,
  },
  legendWrap: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#4B5563",
  },
});
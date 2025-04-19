import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  LineChart,
  BarChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function Placements() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>NIT Delhi Placement Overview</Text>

      {/* Line Chart: Avg CTC Over Years */}
      <Text style={styles.chartTitle}>Average CTC (LPA)</Text>
      <LineChart
        data={{
          labels: ['2023–24', '2024–25'],
          datasets: [
            {
              data: [11.05, 15.55],
              color: () => '#4CAF50',
              strokeWidth: 2,
            },
          ],
          legend: ['Avg CTC'],
        }}
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Bar Chart: Department-Wise Highest CTC */}
      <Text style={styles.chartTitle}>Highest CTC (LPA) by Department</Text>
      <BarChart
        data={{
          labels: ['CSE', 'ECE', 'EEE'],
          datasets: [
            {
              data: [82.0, 48.0, 20.0],
            },
          ],
        }}
        width={screenWidth - 30}
        height={250}
        yAxisSuffix="L"
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        style={styles.chart}
      />

      {/* Bar Chart: Placement % by Year */}
      <Text style={styles.chartTitle}>Placement Percentage</Text>
      <BarChart
        data={{
          labels: ['2023–24', '2024–25'],
          datasets: [
            {
              data: [85, 90],
            },
          ],
        }}
        width={screenWidth - 30}
        height={220}
        yAxisSuffix="%"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Text Summary */}
      <View style={styles.statsBox}>
        <Text style={styles.statsHeading}>Quick Stats</Text>
        <Text style={styles.stat}>📌 Total Offers (2023–24): 153</Text>
        <Text style={styles.stat}>📌 Avg CTC (2023–24): ₹11.05 LPA</Text>
        <Text style={styles.stat}>📌 Highest CTC (CSE): ₹82 LPA</Text>
        <Text style={styles.stat}>📌 Avg CTC (2024–25): ₹15.55 LPA</Text>
        <Text style={styles.stat}>📌 Highest CTC (2024–25): ₹82 LPA</Text>
        <Text style={styles.stat}>🎯 Top Recruiters: Amazon, Atlassian, Microsoft, Razorpay, Flipkart, ZS Associates</Text>
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  decimalPlaces: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2C3E50',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 5,
    marginTop: 15,
  },
  chart: {
    borderRadius: 12,
    marginBottom: 10,
  },
  statsBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ECF0F1',
    borderRadius: 12,
  },
  statsHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2C3E50',
  },
  stat: {
    fontSize: 15,
    color: '#34495E',
    marginBottom: 6,
  },
});

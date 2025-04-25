import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Droplets, Wind, Thermometer } from 'lucide-react-native';
import CustomIcon from '../components/CustomIcon';
import { FIELD_TOOLS, RECENT_FIELD_CARDS } from '../constants/fieldTools';

type RootStackParamList = {
  Home: undefined;
  CulvertSizing: undefined;
  TreeHealth: undefined;
  PebbleCount: undefined;
  RestorationMonitoring: undefined;
  RoadInspection: undefined;
  GullyAssessment: undefined;
  FirePredictor: undefined;
  LandslidePredictor: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Location Bar */}
      <View style={styles.locationBar}>
        <View style={styles.locationInfo}>
          <Droplets color="#047857" size={18} />
          <Text style={styles.locationText}>Nanaimo Watershed</Text>
        </View>
        <View style={styles.weatherInfo}>
          <View style={styles.weatherItem}>
            <Wind color="#047857" size={16} />
            <Text style={styles.weatherText}>12 km/h</Text>
          </View>
          <View style={styles.weatherItem}>
            <Thermometer color="#047857" size={16} />
            <Text style={styles.weatherText}>14°C</Text>
          </View>
        </View>
      </View>

      {/* Recent Field Cards */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Field Cards</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          {RECENT_FIELD_CARDS.map((card) => (
            <TouchableOpacity key={card.id} style={styles.card}>
              <View style={[styles.iconContainer, {backgroundColor: '#f0fdf4'}]}>
                <CustomIcon name={card.icon} size={20} color="#059669" />
              </View>
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Text style={styles.cardDate}>{card.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Field Tools */}
      <View style={styles.toolsContainer}>
        <Text style={styles.sectionTitle}>Field Tools</Text>
        <View style={styles.toolsGrid}>
          {FIELD_TOOLS.map((tool) => (
            <TouchableOpacity 
              key={tool.id} 
              style={styles.toolCard}
              onPress={() => tool.route && navigation.navigate(tool.route as keyof RootStackParamList)}
            >
              <View style={[styles.toolIconContainer, {backgroundColor: '#f0fdf4'}]}>
                <CustomIcon name={tool.icon} size={18} color="#059669" />
              </View>
              <Text style={styles.toolTitle}>{tool.name}</Text>
              <Text style={styles.toolDescription}>{tool.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
  },
  locationBar: {
    backgroundColor: '#d1fae5',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontWeight: '500',
    fontSize: 16,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  weatherText: {
    fontSize: 14,
  },
  sectionContainer: {
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '500',
  },
  cardsContainer: {
    paddingBottom: 8,
    gap: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 14,
  },
  cardDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  toolsContainer: {
    flex: 1,
    paddingBottom: 16,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
  toolCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toolIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolTitle: {
    fontWeight: '700',
    fontSize: 14,
  },
  toolDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default HomeScreen;

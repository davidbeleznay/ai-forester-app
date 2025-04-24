import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  SafeAreaView
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, FIELD_TOOLS, DEFAULT_SETTINGS } from '../config/constants';
import { getFieldCards, FieldCard } from '../utils/storage';
import ConnectivityStatus from '../components/ConnectivityStatus';
import { Path, Svg } from 'react-native-svg';

// Use specific icons
const { Droplets, Wind, Thermometer, Camera, Layers, AlertTriangle } = LucideIcons;

// Custom icon component for tools that don't have direct icons
const CustomIcon = ({ name, color, size }: { name: string, color: string, size: number }) => {
  switch (name) {
    case 'tree':
      return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M12 22V12M12 12L18 6M12 12L6 6M18 6H15.3333M18 6V8.66667M6 6H8.66667M6 6V8.66667" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      );
    case 'road':
      return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M4 19L8 5M12 19L16 5M20 19L16 5M4 19L8 5M4 19H20M8 5H16" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      );
    case 'circle':
      return (
        <View style={{ 
          width: size, 
          height: size, 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: color,
          borderRadius: size/2
        }}/>
      );
    default:
      return null;
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [recentCards, setRecentCards] = useState<FieldCard[]>([]);
  const [weather, setWeather] = useState({
    temperature: 14,
    windSpeed: 12,
    location: DEFAULT_SETTINGS.defaultLocation.name
  });
  
  // Load recent field cards on mount
  useEffect(() => {
    loadRecentCards();
    
    // Set up a listener for when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      loadRecentCards();
    });
    
    return unsubscribe;
  }, [navigation]);
  
  const loadRecentCards = async () => {
    const cards = await getFieldCards();
    // Sort by createdAt timestamp in descending order (most recent first)
    const sortedCards = cards.sort((a, b) => b.createdAt - a.createdAt);
    // Take just the first few cards
    setRecentCards(sortedCards.slice(0, 5));
  };
  
  const handleToolPress = (toolId: string) => {
    switch (toolId) {
      case 'culvert-sizing':
        // @ts-ignore - navigation typing will be fixed when we set up proper navigation types
        navigation.navigate('CulvertInput');
        break;
      default:
        // For now, other tools are not implemented
        alert(`The ${toolId} tool is coming soon!`);
        break;
    }
  };
  
  const formatDate = (timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);
    
    if (now.toDateString() === date.toDateString()) {
      return 'Today';
    } else if (new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  const renderRecentCard = ({ item }: { item: FieldCard }) => {
    let iconName;
    let iconColor;
    let iconBgColor;
    
    switch (item.type) {
      case 'culvert-sizing':
        iconName = 'droplet';
        iconColor = COLORS.danger;
        iconBgColor = COLORS.danger + '20'; // 20% opacity
        break;
      case 'tree-health':
        iconName = 'tree';
        iconColor = COLORS.success;
        iconBgColor = COLORS.success + '20';
        break;
      case 'wolman-pebble':
        iconName = 'camera';
        iconColor = COLORS.secondary;
        iconBgColor = COLORS.secondary + '20';
        break;
      default:
        iconName = 'circle';
        iconColor = COLORS.gray[500];
        iconBgColor = COLORS.gray[100];
    }
    
    return (
      <TouchableOpacity 
        style={styles.recentCard}
        onPress={() => console.log('View card:', item.id)}
      >
        <View style={[styles.cardIcon, { backgroundColor: iconBgColor }]}>
          {iconName === 'droplet' ? (
            <Droplets width={20} height={20} stroke={iconColor} />
          ) : iconName === 'camera' ? (
            <Camera width={20} height={20} stroke={iconColor} />
          ) : (
            <CustomIcon name={iconName} color={iconColor} size={20} />
          )}
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardDate}>
          {formatDate(item.createdAt)}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Forester Field Companion</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <ConnectivityStatus />
          
          {/* Location Bar */}
          <View style={styles.locationBar}>
            <View style={styles.locationInfo}>
              <Droplets width={18} height={18} stroke={COLORS.primary} />
              <Text style={styles.locationText}>{weather.location}</Text>
            </View>
            <View style={styles.weatherInfo}>
              <View style={styles.weatherItem}>
                <Wind width={16} height={16} stroke={COLORS.primary} />
                <Text style={styles.weatherText}>{weather.windSpeed} km/h</Text>
              </View>
              <View style={styles.weatherItem}>
                <Thermometer width={16} height={16} stroke={COLORS.primary} />
                <Text style={styles.weatherText}>{weather.temperature}°C</Text>
              </View>
            </View>
          </View>
          
          {/* Recent Field Cards */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Field Cards</Text>
              <TouchableOpacity>
                <Text style={styles.sectionAction}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {recentCards.length > 0 ? (
              <FlatList
                data={recentCards}
                renderItem={renderRecentCard}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recentCardsList}
              />
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  No field cards yet. Create one using the tools below.
                </Text>
              </View>
            )}
          </View>
          
          {/* Field Tools */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Field Tools</Text>
            
            <View style={styles.toolsGrid}>
              {FIELD_TOOLS.map(tool => (
                <TouchableOpacity
                  key={tool.id}
                  style={styles.toolCard}
                  onPress={() => handleToolPress(tool.id)}
                >
                  <View 
                    style={[
                      styles.toolIcon, 
                      { backgroundColor: tool.backgroundColor }
                    ]}
                  >
                    {tool.icon === 'droplet' ? (
                      <Droplets width={18} height={18} stroke={tool.iconColor} />
                    ) : tool.icon === 'camera' ? (
                      <Camera width={18} height={18} stroke={tool.iconColor} />
                    ) : tool.icon === 'layers' ? (
                      <Layers width={18} height={18} stroke={tool.iconColor} />
                    ) : tool.icon === 'alert-triangle' ? (
                      <AlertTriangle width={18} height={18} stroke={tool.iconColor} />
                    ) : (
                      <CustomIcon name={tool.icon} color={tool.iconColor} size={18} />
                    )}
                  </View>
                  <Text style={styles.toolTitle} numberOfLines={1}>
                    {tool.name}
                  </Text>
                  <Text style={styles.toolDescription} numberOfLines={1}>
                    {tool.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[100],
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerVersion: {
    color: COLORS.white,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  locationBar: {
    backgroundColor: COLORS.gray[50],
    padding: SPACING.md,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: SPACING.sm,
    fontWeight: '500',
    color: COLORS.gray[800],
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  weatherText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.gray[700],
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray[800],
  },
  sectionAction: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  recentCardsList: {
    paddingRight: SPACING.md,
  },
  recentCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginRight: SPACING.md,
    width: 150,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.gray[500],
  },
  emptyStateContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  emptyStateText: {
    color: COLORS.gray[500],
    textAlign: 'center',
    fontSize: 14,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    width: '48%',
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toolIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 2,
  },
  toolDescription: {
    fontSize: 12,
    color: COLORS.gray[500],
  },
});

export default HomeScreen;
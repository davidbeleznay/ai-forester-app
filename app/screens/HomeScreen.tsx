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
import { COLORS, SPACING, FIELD_TOOLS, DEFAULT_SETTINGS } from '../config/constants';
import { getFieldCards, FieldCard } from '../utils/storage';
import ConnectivityStatus from '../components/ConnectivityStatus';
import { Path, Svg } from 'react-native-svg';

// Simple Circle component for fallback icons
const CircleIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
  }} />
);

// Tree icon component
const TreeIcon = ({ size, color }: { size: number, color: string }) => (
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

// Road icon component
const RoadIcon = ({ size, color }: { size: number, color: string }) => (
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

// Droplet icon component
const DropletIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Camera icon component
const CameraIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Layers icon component
const LayersIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 2L2 7L12 12L22 7L12 2Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M2 17L12 22L22 17" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M2 12L12 17L22 12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Alert Triangle icon component
const AlertTriangleIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M10.29 3.86L1.82 18C1.64 18.32 1.49 18.68 1.38 19.08C1.26 19.47 1.2 19.88 1.2 20.3C1.2 21.3 1.54 22.12 2.22 22.74C2.9 23.36 3.72 23.65 4.68 23.65H19.32C20.28 23.65 21.1 23.35 21.78 22.73C22.46 22.11 22.8 21.29 22.8 20.29C22.8 19.87 22.74 19.46 22.62 19.07C22.5 18.68 22.35 18.32 22.18 18L13.71 3.86C13.36 3.32 12.93 2.9 12.42 2.58C11.91 2.27 11.36 2.1 10.76 2.1C10.17 2.1 9.63 2.26 9.14 2.58C8.65 2.9 8.21 3.32 7.87 3.86H10.29Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12 17H12.01" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12 9V13" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Wind icon component
const WindIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.41A2 2 0 1 0 14 16H2M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Thermometer icon component
const ThermometerIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M14 14.76V3.5C14 2.83696 13.7366 2.20107 13.2678 1.73223C12.7989 1.26339 12.163 1 11.5 1C10.837 1 10.2011 1.26339 9.73223 1.73223C9.26339 2.20107 9 2.83696 9 3.5V14.76C8.19728 15.2963 7.58832 16.0564 7.25806 16.9351C6.92781 17.8139 6.89176 18.7672 7.15336 19.6661C7.41496 20.565 7.96023 21.3617 8.7091 21.9442C9.45798 22.5268 10.3669 22.8661 11.305 22.9169C12.2431 22.9677 13.1796 22.7273 13.9913 22.2286C14.8031 21.7299 15.4517 20.9992 15.8392 20.1262C16.2267 19.2531 16.336 18.2817 16.1514 17.3442C15.9669 16.4068 15.4975 15.5483 14.81 14.89C14.73 14.8297 14.66 14.761 14.6 14.69L14 14.76Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Custom icon resolver
const getIconComponent = (iconName: string, size: number, color: string) => {
  switch (iconName) {
    case 'tree':
      return <TreeIcon size={size} color={color} />;
    case 'road':
      return <RoadIcon size={size} color={color} />;
    case 'droplet':
      return <DropletIcon size={size} color={color} />;
    case 'camera':
      return <CameraIcon size={size} color={color} />;
    case 'layers':
      return <LayersIcon size={size} color={color} />;
    case 'alert-triangle':
      return <AlertTriangleIcon size={size} color={color} />;
    case 'wind':
      return <WindIcon size={size} color={color} />;
    case 'thermometer':
      return <ThermometerIcon size={size} color={color} />;
    case 'circle':
    default:
      return <CircleIcon size={size} color={color} />;
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
          {getIconComponent(iconName, 20, iconColor)}
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
              {getIconComponent('droplet', 18, COLORS.primary)}
              <Text style={styles.locationText}>{weather.location}</Text>
            </View>
            <View style={styles.weatherInfo}>
              <View style={styles.weatherItem}>
                {getIconComponent('wind', 16, COLORS.primary)}
                <Text style={styles.weatherText}>{weather.windSpeed} km/h</Text>
              </View>
              <View style={styles.weatherItem}>
                {getIconComponent('thermometer', 16, COLORS.primary)}
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
                    {getIconComponent(tool.icon, 18, tool.iconColor)}
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
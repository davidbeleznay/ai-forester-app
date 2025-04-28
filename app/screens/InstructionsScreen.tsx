import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { COLORS, SPACING } from '../config/constants';
import { Path, Svg } from 'react-native-svg';

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

// Book Open icon component
const BookOpenIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Info icon component
const InfoIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12 16V12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12 8H12.01" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Chevron Right icon component
const ChevronRightIcon = ({ size, color }: { size: number, color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M9 18L15 12L9 6" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  </View>
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

// Get icon component helper
const getIconComponent = (iconName: string, size: number, color: string) => {
  switch (iconName) {
    case 'droplet':
      return <DropletIcon size={size} color={color} />;
    case 'camera':
      return <CameraIcon size={size} color={color} />;
    case 'book-open':
      return <BookOpenIcon size={size} color={color} />;
    case 'info':
      return <InfoIcon size={size} color={color} />;
    case 'chevron-right':
      return <ChevronRightIcon size={size} color={color} />;
    case 'tree':
      return <TreeIcon size={size} color={color} />;
    case 'road':
      return <RoadIcon size={size} color={color} />;
    default:
      return null;
  }
};

interface ToolGuideProps {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: string;
  onPress: () => void;
}

const ToolGuide: React.FC<ToolGuideProps> = ({
  icon,
  iconColor,
  iconBgColor,
  title,
  description,
  onPress
}) => (
  <TouchableOpacity 
    style={styles.toolGuideItem}
    onPress={onPress}
  >
    <View style={[styles.toolGuideIcon, { backgroundColor: iconBgColor }]}>
      {getIconComponent(icon, 16, iconColor)}
    </View>
    <View style={styles.toolGuideContent}>
      <Text style={styles.toolGuideTitle}>{title}</Text>
      <Text style={styles.toolGuideDescription}>{description}</Text>
    </View>
    {getIconComponent('chevron-right', 16, COLORS.gray[400])}
  </TouchableOpacity>
);

const InstructionsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Instructions</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tool Guides</Text>
            
            <View style={styles.toolGuideContainer}>
              <ToolGuide
                icon="droplet"
                iconColor={COLORS.danger}
                iconBgColor={COLORS.danger + '20'}
                title="Culvert Sizing"
                description="How to properly size culverts for forestry roads"
                onPress={() => console.log('Culvert guide')}
              />
              
              <ToolGuide
                icon="tree"
                iconColor={COLORS.success}
                iconBgColor={COLORS.success + '20'}
                title="Tree Health"
                description="Using vision analysis to assess tree health conditions"
                onPress={() => console.log('Tree health guide')}
              />
              
              <ToolGuide
                icon="camera"
                iconColor={COLORS.secondary}
                iconBgColor={COLORS.secondary + '20'}
                title="Wolman Pebble Count"
                description="Automated streambed material assessment"
                onPress={() => console.log('Wolman guide')}
              />
              
              <ToolGuide
                icon="road"
                iconColor={COLORS.info}
                iconBgColor={COLORS.info + '20'}
                title="Road Inspection"
                description="AI-powered risk analysis for forestry roads"
                onPress={() => console.log('Road inspection guide')}
              />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General Tips</Text>
            
            <View style={styles.card}>
              <View style={styles.tipItem}>
                <View style={styles.tipHeader}>
                  {getIconComponent('info', 18, COLORS.primary)}
                  <Text style={styles.tipTitle}>Offline Usage</Text>
                </View>
                <Text style={styles.tipContent}>
                  All tools function without internet connection. Sync when connection is available.
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.tipItem}>
                <View style={styles.tipHeader}>
                  {getIconComponent('info', 18, COLORS.primary)}
                  <Text style={styles.tipTitle}>Data Backup</Text>
                </View>
                <Text style={styles.tipContent}>
                  Field cards are automatically backed up when you connect to the internet.
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.tipItem}>
                <View style={styles.tipHeader}>
                  {getIconComponent('info', 18, COLORS.primary)}
                  <Text style={styles.tipTitle}>Battery Optimization</Text>
                </View>
                <Text style={styles.tipContent}>
                  Turn on Battery Saver mode in Settings for extended field use.
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Reference</Text>
            
            <View style={styles.card}>
              <View style={styles.referenceItem}>
                {getIconComponent('book-open', 18, COLORS.primary)}
                <View style={styles.referenceContent}>
                  <Text style={styles.referenceTitle}>Culvert Sizing Guidelines</Text>
                  <TouchableOpacity>
                    <Text style={styles.referenceLink}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.referenceItem}>
                {getIconComponent('book-open', 18, COLORS.primary)}
                <View style={styles.referenceContent}>
                  <Text style={styles.referenceTitle}>Stream Classification Reference</Text>
                  <TouchableOpacity>
                    <Text style={styles.referenceLink}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.referenceItem}>
                {getIconComponent('book-open', 18, COLORS.primary)}
                <View style={styles.referenceContent}>
                  <Text style={styles.referenceTitle}>Field Assessment Checklists</Text>
                  <TouchableOpacity>
                    <Text style={styles.referenceLink}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Help & Support</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.supportItem}>
                <Text style={styles.supportTitle}>Contact Support</Text>
                {getIconComponent('chevron-right', 16, COLORS.gray[400])}
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.supportItem}>
                <Text style={styles.supportTitle}>Report a Bug</Text>
                {getIconComponent('chevron-right', 16, COLORS.gray[400])}
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.supportItem}>
                <Text style={styles.supportTitle}>Frequently Asked Questions</Text>
                {getIconComponent('chevron-right', 16, COLORS.gray[400])}
              </TouchableOpacity>
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
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  toolGuideContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toolGuideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  toolGuideIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  toolGuideContent: {
    flex: 1,
  },
  toolGuideTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
    marginBottom: 2,
  },
  toolGuideDescription: {
    fontSize: 12,
    color: COLORS.gray[600],
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipItem: {
    padding: SPACING.md,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
    marginLeft: SPACING.sm,
  },
  tipContent: {
    fontSize: 13,
    color: COLORS.gray[600],
    paddingLeft: 26, // Align with title text
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  referenceItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    alignItems: 'center',
  },
  referenceContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
  },
  referenceLink: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
  },
  supportItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
  },
});

export default InstructionsScreen;
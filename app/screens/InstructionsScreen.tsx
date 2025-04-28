import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { 
  Droplet, 
  Camera, 
  BookOpen, 
  Info,
  ChevronRight
} from 'lucide-react-native';
import { COLORS, SPACING } from '../config/constants';
import { Path, Svg } from 'react-native-svg';

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
      {icon === 'droplet' ? (
        <Droplet size={16} color={iconColor} />
      ) : icon === 'camera' ? (
        <Camera size={16} color={iconColor} />
      ) : (
        <CustomIcon name={icon} color={iconColor} size={16} />
      )}
    </View>
    <View style={styles.toolGuideContent}>
      <Text style={styles.toolGuideTitle}>{title}</Text>
      <Text style={styles.toolGuideDescription}>{description}</Text>
    </View>
    <ChevronRight size={16} color={COLORS.gray[400]} />
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
                  <Info size={18} color={COLORS.primary} />
                  <Text style={styles.tipTitle}>Offline Usage</Text>
                </View>
                <Text style={styles.tipContent}>
                  All tools function without internet connection. Sync when connection is available.
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.tipItem}>
                <View style={styles.tipHeader}>
                  <Info size={18} color={COLORS.primary} />
                  <Text style={styles.tipTitle}>Data Backup</Text>
                </View>
                <Text style={styles.tipContent}>
                  Field cards are automatically backed up when you connect to the internet.
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.tipItem}>
                <View style={styles.tipHeader}>
                  <Info size={18} color={COLORS.primary} />
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
                <BookOpen size={18} color={COLORS.primary} />
                <View style={styles.referenceContent}>
                  <Text style={styles.referenceTitle}>Culvert Sizing Guidelines</Text>
                  <TouchableOpacity>
                    <Text style={styles.referenceLink}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.referenceItem}>
                <BookOpen size={18} color={COLORS.primary} />
                <View style={styles.referenceContent}>
                  <Text style={styles.referenceTitle}>Stream Classification Reference</Text>
                  <TouchableOpacity>
                    <Text style={styles.referenceLink}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.referenceItem}>
                <BookOpen size={18} color={COLORS.primary} />
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
                <ChevronRight size={16} color={COLORS.gray[400]} />
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.supportItem}>
                <Text style={styles.supportTitle}>Report a Bug</Text>
                <ChevronRight size={16} color={COLORS.gray[400]} />
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.supportItem}>
                <Text style={styles.supportTitle}>Frequently Asked Questions</Text>
                <ChevronRight size={16} color={COLORS.gray[400]} />
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
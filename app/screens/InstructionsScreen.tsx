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

// Simple colored circle icon component
const SimpleIcon = ({ color, size }: { color: string, size: number }) => (
  <View style={{ 
    width: size, 
    height: size, 
    backgroundColor: color,
    borderRadius: size / 2 
  }} />
);

interface ToolGuideProps {
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: string;
  onPress: () => void;
}

const ToolGuide: React.FC<ToolGuideProps> = ({
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
      <SimpleIcon size={16} color={iconColor} />
    </View>
    <View style={styles.toolGuideContent}>
      <Text style={styles.toolGuideTitle}>{title}</Text>
      <Text style={styles.toolGuideDescription}>{description}</Text>
    </View>
    <SimpleIcon size={16} color={COLORS.gray[400]} />
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
                iconColor={COLORS.danger}
                iconBgColor={COLORS.danger + '20'}
                title="Culvert Sizing"
                description="How to properly size culverts for forestry roads"
                onPress={() => console.log('Culvert guide')}
              />
              
              <ToolGuide
                iconColor={COLORS.success}
                iconBgColor={COLORS.success + '20'}
                title="Tree Health"
                description="Using vision analysis to assess tree health conditions"
                onPress={() => console.log('Tree health guide')}
              />
              
              <ToolGuide
                iconColor={COLORS.secondary}
                iconBgColor={COLORS.secondary + '20'}
                title="Wolman Pebble Count"
                description="Automated streambed material assessment"
                onPress={() => console.log('Wolman guide')}
              />
              
              <ToolGuide
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
                  <SimpleIcon size={18} color={COLORS.primary} />
                  <Text style={styles.tipTitle}>Offline Usage</Text>
                </View>
                <Text style={styles.tipContent}>
                  All tools function without internet connection. Sync when connection is available.
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.tipItem}>
                <View style={styles.tipHeader}>
                  <SimpleIcon size={18} color={COLORS.primary} />
                  <Text style={styles.tipTitle}>Data Backup</Text>
                </View>
                <Text style={styles.tipContent}>
                  Field cards are automatically backed up when you connect to the internet.
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.tipItem}>
                <View style={styles.tipHeader}>
                  <SimpleIcon size={18} color={COLORS.primary} />
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
                <SimpleIcon size={18} color={COLORS.primary} />
                <View style={styles.referenceContent}>
                  <Text style={styles.referenceTitle}>Culvert Sizing Guidelines</Text>
                  <TouchableOpacity>
                    <Text style={styles.referenceLink}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.referenceItem}>
                <SimpleIcon size={18} color={COLORS.primary} />
                <View style={styles.referenceContent}>
                  <Text style={styles.referenceTitle}>Stream Classification Reference</Text>
                  <TouchableOpacity>
                    <Text style={styles.referenceLink}>View PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.referenceItem}>
                <SimpleIcon size={18} color={COLORS.primary} />
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
                <SimpleIcon size={16} color={COLORS.gray[400]} />
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.supportItem}>
                <Text style={styles.supportTitle}>Report a Bug</Text>
                <SimpleIcon size={16} color={COLORS.gray[400]} />
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.supportItem}>
                <Text style={styles.supportTitle}>Frequently Asked Questions</Text>
                <SimpleIcon size={16} color={COLORS.gray[400]} />
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
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import { TOOL_GUIDES } from '../constants/fieldTools';

const InstructionsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Tool Guides Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tool Guides</Text>
        
        {TOOL_GUIDES.map((guide) => (
          <View key={guide.id} style={styles.guideItem}>
            <View style={styles.guideHeader}>
              <View style={[styles.iconContainer, {backgroundColor: '#f0fdf4'}]}>
                <CustomIcon name={guide.icon} size={16} color="#059669" />
              </View>
              <View>
                <Text style={styles.guideTitle}>{guide.name}</Text>
                <Text style={styles.guideDescription}>{guide.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      
      {/* General Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Tips</Text>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipTitle}>Offline Usage</Text>
          <Text style={styles.tipDescription}>
            All tools function without internet connection. Sync when connection is available.
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipTitle}>Data Backup</Text>
          <Text style={styles.tipDescription}>
            Field cards are automatically backed up when you connect to the internet.
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipTitle}>Battery Optimization</Text>
          <Text style={styles.tipDescription}>
            Turn on Battery Saver mode in Settings for extended field use.
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipTitle}>Location Services</Text>
          <Text style={styles.tipDescription}>
            Disable high-precision location when not needed to conserve battery.
          </Text>
        </View>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipTitle}>Camera Usage</Text>
          <Text style={styles.tipDescription}>
            For best results with vision analysis tools, ensure adequate lighting and steady positioning.
          </Text>
        </View>
      </View>
      
      {/* Quick Start Guide */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start Guide</Text>
        
        <View style={styles.quickStartItem}>
          <View style={styles.quickStartNumber}>
            <Text style={styles.numberText}>1</Text>
          </View>
          <View style={styles.quickStartContent}>
            <Text style={styles.quickStartTitle}>Select a Field Tool</Text>
            <Text style={styles.quickStartDescription}>
              Choose the appropriate tool from the home screen for your field task.
            </Text>
          </View>
        </View>
        
        <View style={styles.quickStartItem}>
          <View style={styles.quickStartNumber}>
            <Text style={styles.numberText}>2</Text>
          </View>
          <View style={styles.quickStartContent}>
            <Text style={styles.quickStartTitle}>Enter Data or Capture Images</Text>
            <Text style={styles.quickStartDescription}>
              Follow the tool-specific instructions to collect field data.
            </Text>
          </View>
        </View>
        
        <View style={styles.quickStartItem}>
          <View style={styles.quickStartNumber}>
            <Text style={styles.numberText}>3</Text>
          </View>
          <View style={styles.quickStartContent}>
            <Text style={styles.quickStartTitle}>Review Results</Text>
            <Text style={styles.quickStartDescription}>
              Check the AI-generated analysis and recommendations.
            </Text>
          </View>
        </View>
        
        <View style={styles.quickStartItem}>
          <View style={styles.quickStartNumber}>
            <Text style={styles.numberText}>4</Text>
          </View>
          <View style={styles.quickStartContent}>
            <Text style={styles.quickStartTitle}>Save and Export</Text>
            <Text style={styles.quickStartDescription}>
              Save your field card and export results as needed.
            </Text>
          </View>
        </View>
      </View>
      
      {/* Version Info */}
      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>AI Forester Field Companion v1.0</Text>
        <Text style={styles.copyrightText}>© 2025 AI Forester</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  guideItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 12,
    marginBottom: 12,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  guideDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  tipItem: {
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#4b5563',
  },
  quickStartItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  quickStartNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#047857',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  quickStartContent: {
    flex: 1,
  },
  quickStartTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  quickStartDescription: {
    fontSize: 14,
    color: '#4b5563',
  },
  versionInfo: {
    alignItems: 'center',
    marginVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#6b7280',
  },
  copyrightText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});

export default InstructionsScreen;

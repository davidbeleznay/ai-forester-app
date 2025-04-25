import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import CustomIcon from '../components/CustomIcon';

const SettingsScreen = () => {
  const [useMetric, setUseMetric] = useState(true);
  const [useCelsius, setUseCelsius] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [highPrecisionGPS, setHighPrecisionGPS] = useState(true);
  const [batterySaver, setBatterySaver] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
      {/* Units Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Units</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Measurement System</Text>
            <Text style={styles.settingDescription}>Change units displayed throughout the app</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, useMetric ? styles.activeButton : {}]}
              onPress={() => setUseMetric(true)}
            >
              <Text style={[styles.buttonText, useMetric ? styles.activeButtonText : {}]}>Metric</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !useMetric ? styles.activeButton : {}]}
              onPress={() => setUseMetric(false)}
            >
              <Text style={[styles.buttonText, !useMetric ? styles.activeButtonText : {}]}>Imperial</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Temperature</Text>
            <Text style={styles.settingDescription}>Temperature display units</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, useCelsius ? styles.activeButton : {}]}
              onPress={() => setUseCelsius(true)}
            >
              <Text style={[styles.buttonText, useCelsius ? styles.activeButtonText : {}]}>°C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !useCelsius ? styles.activeButton : {}]}
              onPress={() => setUseCelsius(false)}
            >
              <Text style={[styles.buttonText, !useCelsius ? styles.activeButtonText : {}]}>°F</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Location Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Default Location</Text>
            <Text style={styles.settingDescription}>Used when GPS is unavailable</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.linkText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.locationPreview}>
          <Text style={styles.locationText}>Nanaimo Watershed, Vancouver Island</Text>
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>GPS Precision</Text>
            <Text style={styles.settingDescription}>Higher precision uses more battery</Text>
          </View>
          <Switch
            trackColor={{ false: '#e5e7eb', true: '#d1fae5' }}
            thumbColor={highPrecisionGPS ? '#047857' : '#a1a1aa'}
            ios_backgroundColor="#e5e7eb"
            onValueChange={setHighPrecisionGPS}
            value={highPrecisionGPS}
          />
        </View>
      </View>
      
      {/* Data Management Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Auto-Backup</Text>
            <Text style={styles.settingDescription}>Backup field cards when online</Text>
          </View>
          <Switch
            trackColor={{ false: '#e5e7eb', true: '#d1fae5' }}
            thumbColor={autoBackup ? '#047857' : '#a1a1aa'}
            ios_backgroundColor="#e5e7eb"
            onValueChange={setAutoBackup}
            value={autoBackup}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Offline Mode</Text>
            <Text style={styles.settingDescription}>Disable all network connectivity</Text>
          </View>
          <Switch
            trackColor={{ false: '#e5e7eb', true: '#d1fae5' }}
            thumbColor={offlineMode ? '#047857' : '#a1a1aa'}
            ios_backgroundColor="#e5e7eb"
            onValueChange={setOfflineMode}
            value={offlineMode}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Battery Saver</Text>
            <Text style={styles.settingDescription}>Reduce app power consumption</Text>
          </View>
          <Switch
            trackColor={{ false: '#e5e7eb', true: '#d1fae5' }}
            thumbColor={batterySaver ? '#047857' : '#a1a1aa'}
            ios_backgroundColor="#e5e7eb"
            onValueChange={setBatterySaver}
            value={batterySaver}
          />
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Export All Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Clear Saved Field Cards</Text>
        </TouchableOpacity>
      </View>
      
      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.aboutItem}>
          <Text style={styles.aboutTitle}>AI Forester Field Companion</Text>
          <Text style={styles.aboutDescription}>Version 1.0.0 (Build 104)</Text>
        </View>
        
        <View style={styles.aboutItem}>
          <Text style={styles.aboutTitle}>Developer</Text>
          <Text style={styles.aboutDescription}>AI Forester Technologies</Text>
        </View>
        
        <View style={styles.aboutItem}>
          <Text style={styles.aboutTitle}>Privacy Policy</Text>
          <Text style={styles.aboutDescription}>Last updated: April 15, 2025</Text>
        </View>
        
        <View style={styles.logoContainer}>
          <CustomIcon name="tree" size={48} color="#047857" />
          <Text style={styles.logoText}>AI Forester</Text>
        </View>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  buttonGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 14,
    color: '#374151',
  },
  activeButton: {
    backgroundColor: '#047857',
  },
  activeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  linkText: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '500',
  },
  locationPreview: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#4b5563',
  },
  actionButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  dangerButton: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#b91c1c',
  },
  aboutItem: {
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  aboutDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#047857',
    marginTop: 8,
  },
});

export default SettingsScreen;

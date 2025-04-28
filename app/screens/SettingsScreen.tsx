import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  SafeAreaView
} from 'react-native';

/**
 * Ultra-simplified SettingsScreen with no external dependencies
 */
const SettingsScreen = () => {
  // Simple state for toggles
  const [metricUnits, setMetricUnits] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Metric Units</Text>
              <Switch
                value={metricUnits}
                onValueChange={setMetricUnits}
                trackColor={{ false: '#CBD5E0', true: '#48BB78' }}
                thumbColor={'#FFFFFF'}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Auto Backup</Text>
              <Switch
                value={autoBackup}
                onValueChange={setAutoBackup}
                trackColor={{ false: '#CBD5E0', true: '#48BB78' }}
                thumbColor={'#FFFFFF'}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#CBD5E0', true: '#48BB78' }}
                thumbColor={'#FFFFFF'}
              />
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Data Management</Text>
            
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Export Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Backup to Cloud</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.settingButton, styles.dangerButton]}>
              <Text style={styles.dangerButtonText}>Clear All Data</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              AI Forester Field Companion App v1.0{'\n'}
              Developed by AI Forester Technologies{'\n'}
              © 2025 All Rights Reserved
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2F855A', // Green primary color
  },
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Light background
  },
  header: {
    backgroundColor: '#2F855A',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerVersion: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#4A5568',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  settingButton: {
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  settingButtonText: {
    fontSize: 16,
    color: '#2D3748',
  },
  dangerButton: {
    backgroundColor: '#FED7D7',
  },
  dangerButtonText: {
    fontSize: 16,
    color: '#E53E3E',
  },
  aboutText: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default SettingsScreen;
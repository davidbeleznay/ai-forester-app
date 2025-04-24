import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Switch,
  SafeAreaView
} from 'react-native';
import { getUserSettings, saveUserSettings, clearAllFieldCards } from '../utils/storage';
import { COLORS, SPACING, DEFAULT_SETTINGS } from '../config/constants';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    units: 'metric',
    temperature: 'celsius',
    gpsPrecision: 'medium',
    autoBackup: true,
    defaultLocation: {
      name: 'Nanaimo Watershed',
      latitude: 49.1659,
      longitude: -123.9401,
    },
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadSettings();
  }, []);
  
  const loadSettings = async () => {
    try {
      const userSettings = await getUserSettings();
      setSettings(userSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateSettings = async (newSettings: any) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      await saveUserSettings(updatedSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };
  
  const handleClearData = () => {
    Alert.alert(
      'Clear All Field Cards',
      'Are you sure you want to delete all saved field cards? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllFieldCards();
              Alert.alert('Success', 'All field cards have been deleted');
            } catch (error) {
              console.error('Error clearing field cards:', error);
              Alert.alert('Error', 'Failed to clear field cards');
            }
          },
        },
      ]
    );
  };
  
  const exportAllData = () => {
    Alert.alert(
      'Export Data',
      'This will export all your field cards as a CSV file.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Export',
          onPress: () => {
            // In a real app, this would call a function to export the data
            Alert.alert('Coming Soon', 'This feature will be available in a future update.');
          },
        },
      ]
    );
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading settings...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          {/* Units Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Units</Text>
            
            <View style={styles.card}>
              <View style={styles.settingItem}>
                <View style={styles.settingLabelContainer}>
                  <Text style={styles.settingLabel}>Measurement System</Text>
                  <Text style={styles.settingDescription}>
                    Change units displayed throughout the app
                  </Text>
                </View>
                
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.units === 'metric' && styles.toggleButtonActive,
                    ]}
                    onPress={() => updateSettings({ units: 'metric' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.units === 'metric' && styles.toggleTextActive,
                      ]}
                    >
                      Metric
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.units === 'imperial' && styles.toggleButtonActive,
                    ]}
                    onPress={() => updateSettings({ units: 'imperial' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.units === 'imperial' && styles.toggleTextActive,
                      ]}
                    >
                      Imperial
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingLabelContainer}>
                  <Text style={styles.settingLabel}>Temperature</Text>
                  <Text style={styles.settingDescription}>
                    Temperature display units
                  </Text>
                </View>
                
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.temperature === 'celsius' && styles.toggleButtonActive,
                    ]}
                    onPress={() => updateSettings({ temperature: 'celsius' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.temperature === 'celsius' && styles.toggleTextActive,
                      ]}
                    >
                      °C
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.temperature === 'fahrenheit' && styles.toggleButtonActive,
                    ]}
                    onPress={() => updateSettings({ temperature: 'fahrenheit' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.temperature === 'fahrenheit' && styles.toggleTextActive,
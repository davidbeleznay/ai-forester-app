// src/screens/SettingsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  SafeAreaView,
} from 'react-native';
import {
  getUserSettings,
  saveUserSettings,
  clearAllFieldCards,
} from '../utils/storage';
import { COLORS, SPACING } from '../config/constants';

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
    (async () => {
      try {
        const userSettings = await getUserSettings();
        setSettings(userSettings);
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateSettings = async (newSettings: Partial<typeof settings>) => {
    try {
      const merged = { ...settings, ...newSettings };
      setSettings(merged);
      await saveUserSettings(merged);
    } catch (err) {
      console.error('Error saving settings:', err);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleClearData = () =>
    Alert.alert(
      'Clear All Field Cards',
      'Are you sure you want to delete all saved field cards? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllFieldCards();
              Alert.alert('Success', 'All field cards have been deleted');
            } catch (err) {
              console.error('Error clearing field cards:', err);
              Alert.alert('Error', 'Failed to clear field cards');
            }
          },
        },
      ],
    );

  const exportAllData = () =>
    Alert.alert(
      'Export Data',
      'This will export all your field cards as a CSV file.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () =>
            Alert.alert('Coming Soon', 'This feature will be available later.'),
        },
      ],
    );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading settings…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ───── Header ───── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* ───── Units Section ───── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Units</Text>

            <View style={styles.card}>
              {/* Measurement System */}
              <View style={styles.settingItem}>
                <View style={styles.settingLabelContainer}>
                  <Text style={styles.settingLabel}>Measurement System</Text>
                  <Text style={styles.settingDescription}>
                    Change units displayed throughout the app
                  </Text>
                </View>

                <View style={styles.toggleContainer}>
                  {/* Metric */}
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.units === 'metric'
                        ? styles.toggleButtonActive
                        : null,
                    ]}
                    onPress={() => updateSettings({ units: 'metric' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.units === 'metric'
                          ? styles.toggleTextActive
                          : null,
                      ]}
                    >
                      Metric
                    </Text>
                  </TouchableOpacity>

                  {/* Imperial */}
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.units === 'imperial'
                        ? styles.toggleButtonActive
                        : null,
                    ]}
                    onPress={() => updateSettings({ units: 'imperial' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.units === 'imperial'
                          ? styles.toggleTextActive
                          : null,
                      ]}
                    >
                      Imperial
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Temperature */}
              <View style={styles.settingItem}>
                <View style={styles.settingLabelContainer}>
                  <Text style={styles.settingLabel}>Temperature</Text>
                  <Text style={styles.settingDescription}>
                    Temperature display units
                  </Text>
                </View>

                <View style={styles.toggleContainer}>
                  {/* Celsius */}
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.temperature === 'celsius'
                        ? styles.toggleButtonActive
                        : null,
                    ]}
                    onPress={() => updateSettings({ temperature: 'celsius' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.temperature === 'celsius'
                          ? styles.toggleTextActive
                          : null,
                      ]}
                    >
                      °C
                    </Text>
                  </TouchableOpacity>

                  {/* Fahrenheit */}
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      settings.temperature === 'fahrenheit'
                        ? styles.toggleButtonActive
                        : null,
                    ]}
                    onPress={() =>
                      updateSettings({ temperature: 'fahrenheit' })
                    }
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.temperature === 'fahrenheit'
                          ? styles.toggleTextActive
                          : null,
                      ]}
                    >
                      °F
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* ───── Misc Section (auto-backup, clear data, export) ───── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Management</Text>

            <View style={styles.card}>
              {/* Auto-backup */}
              <View style={styles.settingItem}>
                <View style={styles.settingLabelContainer}>
                  <Text style={styles.settingLabel}>Auto-backup</Text>
                  <Text style={styles.settingDescription}>
                    Backup field cards automatically
                  </Text>
                </View>

                <Switch
                  value={settings.autoBackup}
                  onValueChange={(val) => updateSettings({ autoBackup: val })}
                />
              </View>

              <View style={styles.divider} />

              {/* Clear all field cards */}
              <TouchableOpacity onPress={handleClearData}>
                <Text style={styles.destructiveText}>Clear all field cards</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Export */}
              <TouchableOpacity onPress={exportAllData}>
                <Text style={styles.primaryText}>Export field cards (CSV)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

/* ────────────────────────────────────────
   Styles
   ──────────────────────────────────────── */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerVersion: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  /* Sections */
  scrollView: { flex: 1 },
  section: { marginBottom: SPACING.xl },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  settingLabelContainer: { flexShrink: 1 },
  settingLabel: { fontSize: 16, fontWeight: '500' },
  settingDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  toggleContainer: { flexDirection: 'row' },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.toggle,
  },
  toggleButtonActive: { backgroundColor: COLORS.primary },
  toggleText: { fontSize: 14, color: COLORS.textSecondary },
  toggleTextActive: { color: COLORS.onPrimary },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.sm,
  },
  destructiveText: { color: COLORS.destructive, fontSize: 16 },
  primaryText: { color: COLORS.primary, fontSize: 16 },
});

export default SettingsScreen;

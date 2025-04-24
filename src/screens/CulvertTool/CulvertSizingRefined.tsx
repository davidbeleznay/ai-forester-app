import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CulvertSizingRefined = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Culvert Sizing (Refined)</Text>
      <Text style={styles.subtitle}>This is a placeholder screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: 'gray', marginTop: 10 },
});

export default CulvertSizingRefined;

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../config/constants';
import { CulvertFieldCard, getFieldCards, deleteFieldCard } from '../../utils/storage';
import ConnectivityStatus from '../../components/ConnectivityStatus';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [fieldCards, setFieldCards] = useState<CulvertFieldCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Load field cards
  const loadFieldCards = async () => {
    try {
      const cards = await getFieldCards();
      // Sort by timestamp (newest first)
      cards.sort((a, b) => b.timestamp - a.timestamp);
      setFieldCards(cards);
    } catch (error) {
      console.error('Error loading field cards:', error);
      Alert.alert('Error', 'Failed to load field cards');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Load data when screen focuses
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadFieldCards();
    }, [])
  );
  
  // Refresh data
  const handleRefresh = () => {
    setRefreshing(true);
    loadFieldCards();
  };
  
  // View field card details
  const handleViewFieldCard = (fieldCard: CulvertFieldCard) => {
    navigation.navigate('CulvertResult', { fieldCard });
  };
  
  // Delete field card
  const handleDeleteFieldCard = async (id: string) => {
    Alert.alert(
      'Delete Field Card',
      'Are you sure you want to delete this field card? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await deleteFieldCard(id);
              if (success) {
                // Update the local state
                setFieldCards(fieldCards.filter(card => card.id !== id));
              } else {
                Alert.alert('Error', 'Failed to delete field card');
              }
            } catch (error) {
              console.error('Error deleting field card:', error);
              Alert.alert('Error', 'Failed to delete field card');
            }
          },
        },
      ]
    );
  };
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-outline" size={64} color={COLORS.textLight} />
      <Text style={styles.emptyStateText}>No field cards found</Text>
      <Text style={styles.emptyStateSubtext}>
        Complete culvert sizing calculations to save field cards
      </Text>
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => navigation.navigate('CulvertInput')}
      >
        <Ionicons name="add-circle-outline" size={18} color={COLORS.white} />
        <Text style={styles.newButtonText}>New Calculation</Text>
      </TouchableOpacity>
    </View>
  );
  
  // Render field card item
  const renderFieldCard = ({ item }: { item: CulvertFieldCard }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleViewFieldCard(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>{formatDate(item.timestamp)}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteFieldCard(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Watershed:</Text>
          <Text style={styles.detailValue}>{item.inputValues.basinArea.toFixed(2)} km²</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Road Type:</Text>
          <Text style={styles.detailValue}>{item.inputValues.roadType}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Stream Type:</Text>
          <Text style={styles.detailValue}>{item.inputValues.streamType}</Text>
        </View>
        
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationLabel}>Recommended Culvert:</Text>
          <Text style={styles.recommendationValue}>
            {item.recommendedSize.type === 'round'
              ? `${item.recommendedSize.diameter} mm Diameter`
              : `${item.recommendedSize.width} × ${item.recommendedSize.height} mm Box`
            }
          </Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        {item.location ? (
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color={COLORS.primary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.location.latitude.toFixed(5)}, {item.location.longitude.toFixed(5)}
            </Text>
          </View>
        ) : (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color={COLORS.textLight} />
            <Text style={styles.noLocationText}>No location data</Text>
          </View>
        )}
        
        <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <ConnectivityStatus />
      
      <View style={styles.header}>
        <Text style={styles.title}>Culvert Field Cards</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CulvertInput')}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading field cards...</Text>
        </View>
      ) : (
        <FlatList
          data={fieldCards}
          renderItem={renderFieldCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: SPACING.small,
    color: COLORS.textLight,
    fontSize: 16,
  },
  listContent: {
    padding: SPACING.medium,
    paddingBottom: SPACING.large,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xlarge,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.medium,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.small,
    marginBottom: SPACING.medium,
    paddingHorizontal: SPACING.large,
  },
  newButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: SPACING.tiny,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  cardDate: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  deleteButton: {
    padding: SPACING.tiny,
  },
  cardDetails: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: SPACING.small,
    marginBottom: SPACING.small,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.tiny,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  recommendationContainer: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: 4,
    padding: SPACING.small,
    marginTop: SPACING.small,
  },
  recommendationLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  recommendationValue: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
    maxWidth: 200,
  },
  noLocationText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginLeft: 4,
  },
});

export default HistoryScreen;
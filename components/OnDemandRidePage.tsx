import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface OnDemandRidePageProps {
  navigation?: any
  user?: any
}

export function OnDemandRidePage({ navigation, user }: OnDemandRidePageProps) {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [searching, setSearching] = useState(false)

  const handleRequestRide = () => {
    if (!pickup.trim() || !destination.trim()) {
      Alert.alert('Missing Information', 'Please enter both pickup and destination')
      return
    }

    setSearching(true)
    // Simulate searching for drivers
    setTimeout(() => {
      setSearching(false)
      Alert.alert('Searching...', 'Looking for available drivers near you')
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request a Ride</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map-outline" size={64} color="#E5E5E5" />
        <Text style={styles.mapText}>Map View</Text>
        <Text style={styles.mapSubText}>Live tracking with Mapbox</Text>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <Text style={styles.title}>Where to?</Text>

        {/* Pickup Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="location" size={20} color="#10B981" />
          <TextInput
            style={styles.input}
            placeholder="Pickup location"
            placeholderTextColor="#999"
            value={pickup}
            onChangeText={setPickup}
          />
          {pickup ? (
            <TouchableOpacity onPress={() => setPickup('')}>
              <Ionicons name="close-circle" size={20} color="#717182" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Destination Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="location" size={20} color="#F37A33" />
          <TextInput
            style={styles.input}
            placeholder="Where are you going?"
            placeholderTextColor="#999"
            value={destination}
            onChangeText={setDestination}
          />
          {destination ? (
            <TouchableOpacity onPress={() => setDestination('')}>
              <Ionicons name="close-circle" size={20} color="#717182" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Passenger Count */}
        <View style={styles.passengerSection}>
          <Text style={styles.passengerLabel}>Number of Passengers</Text>
          <View style={styles.passengerControl}>
            <TouchableOpacity
              style={styles.passengerButton}
              onPress={() => setPassengers(Math.max(1, passengers - 1))}
            >
              <Ionicons name="remove-circle" size={32} color="#F37A33" />
            </TouchableOpacity>
            <Text style={styles.passengerCount}>{passengers}</Text>
            <TouchableOpacity
              style={styles.passengerButton}
              onPress={() => setPassengers(Math.min(4, passengers + 1))}
            >
              <Ionicons name="add-circle" size={32} color="#F37A33" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Estimate */}
        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Estimated Price</Text>
            <Text style={styles.priceValue}>$8 - $15</Text>
          </View>
          <Text style={styles.priceSubtext}>
            Final price depends on driver and route
          </Text>
        </View>

        {/* Request Button */}
        <TouchableOpacity
          style={[styles.requestButton, searching && styles.searchingButton]}
          onPress={handleRequestRide}
          disabled={searching}
        >
          {searching ? (
            <>
              <Ionicons name="search" size={20} color="#FFFFFF" />
              <Text style={styles.requestButtonText}>Searching for drivers...</Text>
            </>
          ) : (
            <>
              <Ionicons name="radio-outline" size={20} color="#FFFFFF" />
              <Text style={styles.requestButtonText}>Request Ride Now</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Quick Locations */}
        <View style={styles.quickLocations}>
          <TouchableOpacity
            style={styles.quickLocationButton}
            onPress={() => setDestination('Campus Library')}
          >
            <Ionicons name="book-outline" size={20} color="#F37A33" />
            <Text style={styles.quickLocationText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickLocationButton}
            onPress={() => setDestination('Student Union')}
          >
            <Ionicons name="people-outline" size={20} color="#F37A33" />
            <Text style={styles.quickLocationText}>Union</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickLocationButton}
            onPress={() => setDestination('Downtown')}
          >
            <Ionicons name="business-outline" size={20} color="#F37A33" />
            <Text style={styles.quickLocationText}>Downtown</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 16,
  },
  mapSubText: {
    fontSize: 14,
    color: '#717182',
    marginTop: 4,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C2C2C',
    marginLeft: 12,
  },
  passengerSection: {
    marginVertical: 20,
  },
  passengerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 12,
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  passengerButton: {
    padding: 4,
  },
  passengerCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C2C2C',
    minWidth: 50,
    textAlign: 'center',
  },
  priceCard: {
    backgroundColor: '#FFF5F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C2C2C',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F37A33',
  },
  priceSubtext: {
    fontSize: 12,
    color: '#717182',
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F37A33',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  searchingButton: {
    opacity: 0.7,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  quickLocations: {
    flexDirection: 'row',
    gap: 8,
  },
  quickLocationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 6,
  },
  quickLocationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F37A33',
  },
})

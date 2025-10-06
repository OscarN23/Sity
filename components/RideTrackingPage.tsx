import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface RideTrackingPageProps {
  navigation?: any
  route?: any
}

export function RideTrackingPage({ navigation, route }: RideTrackingPageProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map-outline" size={64} color="#E5E5E5" />
        <Text style={styles.mapText}>Map View</Text>
        <Text style={styles.mapSubText}>Mapbox integration required</Text>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Live Ride Tracking</Text>
        <Text style={styles.subtitle}>This feature requires Mapbox integration</Text>

        <TouchableOpacity style={styles.endRideButton} onPress={() => navigation?.goBack()}>
          <Text style={styles.endRideButtonText}>End Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#717182',
    marginBottom: 24,
  },
  endRideButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  endRideButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

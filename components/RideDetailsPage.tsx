import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface RideDetailsPageProps {
  navigation?: any
  route?: any
}

export function RideDetailsPage({ navigation, route }: RideDetailsPageProps) {
  const [seats, setSeats] = useState(1)

  // Mock ride data
  const ride = {
    id: '1',
    driver: {
      name: 'Sarah Johnson',
      rating: 4.8,
      totalRides: 127,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69b6b42?w=150&h=150&fit=crop&crop=face',
    },
    car: {
      make: 'Toyota',
      model: 'Camry',
      color: 'Silver',
      plate: 'XYZ-789',
    },
    departure: {
      location: 'Campus Center',
      time: 'Today, 2:30 PM',
    },
    destination: {
      location: 'Downtown Mall',
      estimatedArrival: '3:15 PM',
    },
    price: 8,
    availableSeats: 3,
    distance: '12.5 miles',
    duration: '45 min',
    features: {
      allowHopIn: true,
      allowBidUp: false,
      gpsTracking: true,
      verified: true,
    },
  }

  const handleBookRide = () => {
    const totalPrice = ride.price * seats
    Alert.alert(
      'Confirm Booking',
      `Book ${seats} seat(s) for ${totalPrice}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Ride booked successfully!')
            navigation?.goBack()
          },
        },
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ride Details</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color="#2C2C2C" />
          </TouchableOpacity>
        </View>

        {/* Driver Info */}
        <View style={styles.driverSection}>
          <Image source={{ uri: ride.driver.avatar }} style={styles.driverAvatar} />
          <View style={styles.driverInfo}>
            <View style={styles.driverHeader}>
              <Text style={styles.driverName}>{ride.driver.name}</Text>
              {ride.features.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
            <View style={styles.driverStats}>
              <View style={styles.stat}>
                <Ionicons name="star" size={16} color="#F37A33" />
                <Text style={styles.statText}>{ride.driver.rating}</Text>
              </View>
              <View style={styles.statDivider} />
              <Text style={styles.statText}>{ride.driver.totalRides} rides</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#F37A33" />
          </TouchableOpacity>
        </View>

        {/* Car Details */}
        <View style={styles.carSection}>
          <View style={styles.carIcon}>
            <Ionicons name="car" size={24} color="#F37A33" />
          </View>
          <View style={styles.carInfo}>
            <Text style={styles.carText}>
              {ride.car.color} {ride.car.make} {ride.car.model}
            </Text>
            <Text style={styles.carPlate}>{ride.car.plate}</Text>
          </View>
        </View>

        {/* Route Details */}
        <View style={styles.routeSection}>
          <Text style={styles.sectionTitle}>Route</Text>
          
          <View style={styles.routeCard}>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, styles.routeDotStart]} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeLocation}>{ride.departure.location}</Text>
                <Text style={styles.routeTime}>{ride.departure.time}</Text>
              </View>
            </View>

            <View style={styles.routeLine} />

            <View style={styles.routePoint}>
              <View style={[styles.routeDot, styles.routeDotEnd]} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>Dropoff</Text>
                <Text style={styles.routeLocation}>{ride.destination.location}</Text>
                <Text style={styles.routeTime}>Est. {ride.destination.estimatedArrival}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tripStats}>
            <View style={styles.tripStat}>
              <Ionicons name="car-outline" size={20} color="#717182" />
              <Text style={styles.tripStatText}>{ride.distance}</Text>
            </View>
            <View style={styles.tripStat}>
              <Ionicons name="time-outline" size={20} color="#717182" />
              <Text style={styles.tripStatText}>{ride.duration}</Text>
            </View>
            <View style={styles.tripStat}>
              <Ionicons name="people-outline" size={20} color="#717182" />
              <Text style={styles.tripStatText}>{ride.availableSeats} seats left</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.features}>
            {ride.features.gpsTracking && (
              <View style={styles.feature}>
                <Ionicons name="location" size={18} color="#10B981" />
                <Text style={styles.featureText}>GPS Tracking</Text>
              </View>
            )}
            {ride.features.allowHopIn && (
              <View style={styles.feature}>
                <Ionicons name="hand-left" size={18} color="#3B82F6" />
                <Text style={styles.featureText}>Hop-In Allowed</Text>
              </View>
            )}
            {ride.features.verified && (
              <View style={styles.feature}>
                <Ionicons name="shield-checkmark" size={18} color="#8B5CF6" />
                <Text style={styles.featureText}>University Verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Seat Selection */}
        <View style={styles.seatSection}>
          <Text style={styles.sectionTitle}>Select Seats</Text>
          <View style={styles.seatControl}>
            <TouchableOpacity
              style={styles.seatButton}
              onPress={() => setSeats(Math.max(1, seats - 1))}
            >
              <Ionicons name="remove-circle" size={32} color="#F37A33" />
            </TouchableOpacity>
            <Text style={styles.seatCount}>{seats}</Text>
            <TouchableOpacity
              style={styles.seatButton}
              onPress={() => setSeats(Math.min(ride.availableSeats, seats + 1))}
            >
              <Ionicons name="add-circle" size={32} color="#F37A33" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${ride.price * seats}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  scrollView: {
    flex: 1,
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
  driverSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 2,
  },
  driverStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  statText: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 8,
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  carInfo: {
    flex: 1,
  },
  carText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  carPlate: {
    fontSize: 14,
    color: '#717182',
  },
  routeSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 16,
  },
  routeCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
  },
  routeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
    marginTop: 4,
  },
  routeDotStart: {
    backgroundColor: '#10B981',
  },
  routeDotEnd: {
    backgroundColor: '#F37A33',
  },
  routeInfo: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#717182',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  routeLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  routeTime: {
    fontSize: 14,
    color: '#717182',
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E5E5E5',
    marginLeft: 7,
    marginVertical: 8,
  },
  tripStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tripStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripStatText: {
    fontSize: 14,
    color: '#717182',
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2C2C2C',
  },
  seatSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
    marginBottom: 100,
  },
  seatControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  seatButton: {
    padding: 4,
  },
  seatCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C2C2C',
    minWidth: 50,
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#717182',
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F37A33',
  },
  bookButton: {
    backgroundColor: '#F37A33',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

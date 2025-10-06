import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface FindRidesPageProps {
  user: any
  navigation?: any
}

export function FindRidesPage({ user, navigation }: FindRidesPageProps) {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('Today')
  const [passengers, setPassengers] = useState(1)

  const availableRides = [
    {
      id: '1',
      driver: {
        name: 'Sarah Johnson',
        rating: 4.8,
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69b6b42?w=150&h=150&fit=crop&crop=face',
      },
      departure: 'Campus Center',
      destination: 'Downtown Mall',
      time: '2:30 PM',
      price: 8,
      seats: 2,
    },
    {
      id: '2',
      driver: {
        name: 'Mike Chen',
        rating: 4.9,
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      departure: 'Engineering Building',
      destination: 'Airport',
      time: '3:15 PM',
      price: 25,
      seats: 3,
    },
    {
      id: '3',
      driver: {
        name: 'Emma Wilson',
        rating: 4.7,
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
      departure: 'Student Union',
      destination: 'Shopping Mall',
      time: '4:00 PM',
      price: 12,
      seats: 1,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find a Ride</Text>
        </View>

        {/* Search Form */}
        <View style={styles.searchForm}>
          <View style={styles.inputContainer}>
            <Ionicons name="location" size={20} color="#10B981" />
            <TextInput
              style={styles.input}
              placeholder="Pickup Location"
              placeholderTextColor="#999"
              value={pickup}
              onChangeText={setPickup}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="location" size={20} color="#F37A33" />
            <TextInput
              style={styles.input}
              placeholder="Destination"
              placeholderTextColor="#999"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Ionicons name="calendar-outline" size={20} color="#717182" />
              <TextInput
                style={styles.input}
                placeholder="Date"
                placeholderTextColor="#999"
                value={date}
                onChangeText={setDate}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <Ionicons name="people-outline" size={20} color="#717182" />
              <View style={styles.passengerControl}>
                <TouchableOpacity
                  onPress={() => setPassengers(Math.max(1, passengers - 1))}
                  style={styles.passengerButton}
                >
                  <Ionicons name="remove" size={16} color="#717182" />
                </TouchableOpacity>
                <Text style={styles.passengerText}>{passengers}</Text>
                <TouchableOpacity
                  onPress={() => setPassengers(Math.min(4, passengers + 1))}
                  style={styles.passengerButton}
                >
                  <Ionicons name="add" size={16} color="#717182" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Search Rides</Text>
          </TouchableOpacity>
        </View>

        {/* Available Rides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rides</Text>
          <Text style={styles.sectionSubtitle}>{availableRides.length} rides found</Text>

          {availableRides.map((ride) => (
            <TouchableOpacity key={ride.id} style={styles.rideCard}>
              <View style={styles.rideHeader}>
                <Image source={{ uri: ride.driver.avatar }} style={styles.driverAvatar} />
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{ride.driver.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#F37A33" />
                    <Text style={styles.ratingText}>{ride.driver.rating}</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>per seat</Text>
                  <Text style={styles.price}>${ride.price}</Text>
                </View>
              </View>

              <View style={styles.rideRoute}>
                <View style={styles.routePoint}>
                  <View style={[styles.routeDot, styles.routeDotStart]} />
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeText}>{ride.departure}</Text>
                    <Text style={styles.routeTime}>{ride.time}</Text>
                  </View>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={[styles.routeDot, styles.routeDotEnd]} />
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeText}>{ride.destination}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.rideFooter}>
                <View style={styles.seatsInfo}>
                  <Ionicons name="people-outline" size={16} color="#717182" />
                  <Text style={styles.seatsText}>{ride.seats} seats left</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  searchForm: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2C2C2C',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  passengerButton: {
    padding: 4,
  },
  passengerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginHorizontal: 12,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F37A33',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#717182',
    marginBottom: 16,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    color: '#717182',
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F37A33',
  },
  rideRoute: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
  routeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C2C2C',
  },
  routeTime: {
    fontSize: 12,
    color: '#717182',
    marginTop: 2,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E5E5',
    marginLeft: 5,
    marginVertical: 4,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  seatsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatsText: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 6,
  },
  bookButton: {
    backgroundColor: '#F37A33',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
})

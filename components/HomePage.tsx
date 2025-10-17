import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface HomePageProps {
  user: any
  navigation?: any
}

export function HomePage({ user, navigation }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const quickSuggestions = [
    'Campus Library',
    'Target',
    'Downtown',
    'Airport',
    'Student Union',
    'Walmart',
  ]

  const hopInRides = [
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
      departureTime: 'In 45 min',
      urgency: 'leaving-soon',
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
      seats: 1,
      departureTime: 'In 1h 30m',
      urgency: 'few-seats',
    },
  ]

  const userName = user?.user_metadata?.name || 'Guest'

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#2C2C2C" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#717182" />
            <TextInput
              style={styles.searchInput}
              placeholder="Where do you want to go?"
              placeholderTextColor="#717182"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Quick Suggestions */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.suggestionsContainer}
          >
            {quickSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => setSearchQuery(suggestion)}
              >
                <Ionicons name="location-outline" size={16} color="#F37A33" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Hop-In Rides Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Hop-In Rides</Text>
              <Text style={styles.sectionSubtitle}>Join rides leaving soon</Text>
            </View>
            <TouchableOpacity onPress={() => navigation?.navigate('Find Rides')}>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </View>

          {hopInRides.map((ride) => (
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
                {ride.urgency === 'leaving-soon' && (
                  <View style={styles.urgencyBadge}>
                    <Ionicons name="time" size={12} color="#FFFFFF" />
                    <Text style={styles.urgencyText}>Leaving Soon</Text>
                  </View>
                )}
                {ride.urgency === 'few-seats' && (
                  <View style={styles.seatsBadge}>
                    <Text style={styles.seatsText}>{ride.seats} seat left</Text>
                  </View>
                )}
              </View>

              <View style={styles.rideRoute}>
                <View style={styles.routePoint}>
                  <View style={[styles.routeDot, styles.routeDotStart]} />
                  <Text style={styles.routeText}>{ride.departure}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={[styles.routeDot, styles.routeDotEnd]} />
                  <Text style={styles.routeText}>{ride.destination}</Text>
                </View>
              </View>

              <View style={styles.rideFooter}>
                <View style={styles.rideTime}>
                  <Ionicons name="time-outline" size={16} color="#717182" />
                  <Text style={styles.rideTimeText}>{ride.departureTime}</Text>
                </View>
                <Text style={styles.ridePrice}>${ride.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Searches or Popular Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <View style={styles.destinationsGrid}>
            <TouchableOpacity style={styles.destinationCard}>
              <View style={styles.destinationIcon}>
                <Ionicons name="bag-outline" size={24} color="#F37A33" />
              </View>
              <Text style={styles.destinationName}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.destinationCard}>
              <View style={styles.destinationIcon}>
                <Ionicons name="airplane-outline" size={24} color="#F37A33" />
              </View>
              <Text style={styles.destinationName}>Airport</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.destinationCard}>
              <View style={styles.destinationIcon}>
                <Ionicons name="business-outline" size={24} color="#F37A33" />
              </View>
              <Text style={styles.destinationName}>Downtown</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.destinationCard}>
              <View style={styles.destinationIcon}>
                <Ionicons name="cafe-outline" size={24} color="#F37A33" />
              </View>
              <Text style={styles.destinationName}>Restaurants</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#717182',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F37A33',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2C2C2C',
  },
  suggestionsContainer: {
    flexDirection: 'row',
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 12,
    color: '#F37A33',
    marginLeft: 4,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#717182',
    marginTop: 2,
  },
  seeAllLink: {
    fontSize: 14,
    color: '#F37A33',
    fontWeight: '600',
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
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F37A33',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  seatsBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  seatsText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400E',
  },
  rideRoute: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  routeDotStart: {
    backgroundColor: '#10B981',
  },
  routeDotEnd: {
    backgroundColor: '#F37A33',
  },
  routeText: {
    fontSize: 14,
    color: '#2C2C2C',
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
  rideTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideTimeText: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 6,
  },
  ridePrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F37A33',
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  destinationCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  destinationIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#FFF5F0',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  destinationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
})

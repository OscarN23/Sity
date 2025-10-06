import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ActivityPageProps {
  user?: any
  navigation?: any
}

export function ActivityPage({ user, navigation }: ActivityPageProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const upcomingRides = [
    {
      id: '1',
      type: 'passenger',
      driver: 'Sarah Johnson',
      departure: 'Campus Center',
      destination: 'Downtown Mall',
      date: 'Today',
      time: '2:30 PM',
      price: 8,
      status: 'confirmed',
    },
    {
      id: '2',
      type: 'driver',
      passengers: 3,
      departure: 'Engineering Building',
      destination: 'Airport',
      date: 'Tomorrow',
      time: '9:00 AM',
      price: 75,
      status: 'confirmed',
    },
  ]

  const pastRides = [
    {
      id: '3',
      type: 'passenger',
      driver: 'Mike Chen',
      departure: 'Student Union',
      destination: 'Shopping Mall',
      date: '2 days ago',
      time: '4:00 PM',
      price: 12,
      status: 'completed',
      rating: 5,
    },
    {
      id: '4',
      type: 'driver',
      passengers: 2,
      departure: 'Library',
      destination: 'Train Station',
      date: '1 week ago',
      time: '6:30 PM',
      price: 40,
      status: 'completed',
      rating: 5,
    },
    {
      id: '5',
      type: 'passenger',
      driver: 'Emma Wilson',
      departure: 'Dormitory',
      destination: 'Grocery Store',
      date: '2 weeks ago',
      time: '11:00 AM',
      price: 5,
      status: 'completed',
      rating: 4,
    },
  ]

  const renderRideCard = (ride: any) => {
    const isUpcoming = activeTab === 'upcoming'

    return (
      <TouchableOpacity key={ride.id} style={styles.rideCard}>
        <View style={styles.rideHeader}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={ride.type === 'driver' ? 'car' : 'person'}
              size={20}
              color="#F37A33"
            />
          </View>
          <View style={styles.rideHeaderInfo}>
            <Text style={styles.rideType}>
              {ride.type === 'driver' ? 'As Driver' : `With ${ride.driver}`}
            </Text>
            <Text style={styles.rideDate}>
              {ride.date} • {ride.time}
            </Text>
          </View>
          {isUpcoming && ride.status === 'confirmed' && (
            <View style={styles.confirmedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.confirmedText}>Confirmed</Text>
            </View>
          )}
          {!isUpcoming && ride.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#F37A33" />
              <Text style={styles.ratingText}>{ride.rating}.0</Text>
            </View>
          )}
        </View>

        <View style={styles.routeContainer}>
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
          {ride.type === 'driver' && (
            <View style={styles.passengersInfo}>
              <Ionicons name="people-outline" size={16} color="#717182" />
              <Text style={styles.passengersText}>{ride.passengers} passenger(s)</Text>
            </View>
          )}
          <Text style={styles.price}>${ride.price}</Text>
        </View>

        {isUpcoming && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#F37A33" />
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="call-outline" size={18} color="#F37A33" />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
              <Ionicons name="close-circle-outline" size={18} color="#EF4444" />
              <Text style={[styles.actionText, styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Rides</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {activeTab === 'upcoming' && upcomingRides.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="car-outline" size={64} color="#E5E5E5" />
              <Text style={styles.emptyTitle}>No Upcoming Rides</Text>
              <Text style={styles.emptyText}>
                Book a ride or offer one to get started
              </Text>
            </View>
          )}

          {activeTab === 'upcoming' && upcomingRides.map(renderRideCard)}

          {activeTab === 'past' && pastRides.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="time-outline" size={64} color="#E5E5E5" />
              <Text style={styles.emptyTitle}>No Past Rides</Text>
              <Text style={styles.emptyText}>Your ride history will appear here</Text>
            </View>
          )}

          {activeTab === 'past' && pastRides.map(renderRideCard)}
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#F37A33',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#717182',
  },
  activeTabText: {
    color: '#F37A33',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#717182',
    marginTop: 8,
    textAlign: 'center',
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rideHeaderInfo: {
    flex: 1,
  },
  rideType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  rideDate: {
    fontSize: 12,
    color: '#717182',
  },
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  confirmedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginLeft: 4,
  },
  routeContainer: {
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
  passengersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengersText: {
    fontSize: 14,
    color: '#717182',
    marginLeft: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F37A33',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F0',
    borderRadius: 8,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F37A33',
    marginLeft: 4,
  },
  cancelButton: {
    backgroundColor: '#FEF2F2',
  },
  cancelText: {
    color: '#EF4444',
  },
})

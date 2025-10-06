import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ProfilePageProps {
  user: any
  onLogout: () => void
  navigation?: any
}

export function ProfilePage({ user, onLogout, navigation }: ProfilePageProps) {
  const userName = user?.user_metadata?.name || 'Guest User'
  const userEmail = user?.email || 'No email'
  const userPhone = user?.user_metadata?.phone || 'No phone'
  const isDriver = user?.user_metadata?.is_driver || false
  const carDetails = user?.user_metadata?.car_details

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: onLogout,
      },
    ])
  }

  const recentRides = [
    {
      id: '1',
      type: 'passenger',
      destination: 'Downtown Mall',
      date: '2 days ago',
      driver: 'Sarah Johnson',
      price: 8,
    },
    {
      id: '2',
      type: isDriver ? 'driver' : 'passenger',
      destination: 'Airport',
      date: '1 week ago',
      driver: isDriver ? 'You' : 'Mike Chen',
      price: 25,
    },
    {
      id: '3',
      type: 'passenger',
      destination: 'Shopping Mall',
      date: '2 weeks ago',
      driver: 'Emma Wilson',
      price: 12,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="settings-outline" size={24} color="#2C2C2C" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>

          {isDriver && (
            <View style={styles.driverBadge}>
              <Ionicons name="car" size={14} color="#F37A33" />
              <Text style={styles.driverBadgeText}>Verified Driver</Text>
            </View>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Rides</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$240</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>
        </View>

        {/* Car Information (if driver) */}
        {isDriver && carDetails && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car Information</Text>
            <View style={styles.card}>
              <View style={styles.carRow}>
                <Ionicons name="car-outline" size={20} color="#717182" />
                <Text style={styles.carText}>
                  {carDetails.color} {carDetails.make} {carDetails.model}
                </Text>
              </View>
              <View style={styles.carRow}>
                <Ionicons name="card-outline" size={20} color="#717182" />
                <Text style={styles.carText}>{carDetails.plate}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>

          {recentRides.slice(0, 3).map((ride) => (
            <TouchableOpacity key={ride.id} style={styles.rideCard}>
              <View style={styles.rideIcon}>
                <Ionicons
                  name={ride.type === 'driver' ? 'car' : 'person'}
                  size={20}
                  color="#F37A33"
                />
              </View>
              <View style={styles.rideInfo}>
                <Text style={styles.rideDestination}>{ride.destination}</Text>
                <Text style={styles.rideDate}>
                  {ride.date} • {ride.type === 'driver' ? 'As driver' : `With ${ride.driver}`}
                </Text>
              </View>
              <Text style={styles.ridePrice}>${ride.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Options */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="person-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="card-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="location-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Saved Locations</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Safety Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Sity v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 Sity. All rights reserved.</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F37A33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#717182',
    marginBottom: 12,
  },
  driverBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 24,
  },
  driverBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F37A33',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    width: '90%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#717182',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F37A33',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  carRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  carText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 12,
  },
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  rideIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rideInfo: {
    flex: 1,
  },
  rideDestination: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  rideDate: {
    fontSize: 12,
    color: '#717182',
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F37A33',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C2C2C',
    marginLeft: 12,
  },
  logoutText: {
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#717182',
    marginBottom: 4,
  },
})

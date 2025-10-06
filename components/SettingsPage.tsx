import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface SettingsPageProps {
  navigation?: any
  user?: any
}

export function SettingsPage({ navigation, user }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true)
  const [rideReminders, setRideReminders] = useState(true)
  const [parentAlerts, setParentAlerts] = useState(false)
  const [gpsTracking, setGpsTracking] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const handleBack = () => {
    navigation?.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="person-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="lock-closed-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="mail-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Email Verification</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="notifications-outline" size={20} color="#2C2C2C" />
              <View style={styles.switchLabelContainer}>
                <Text style={styles.menuItemText}>Push Notifications</Text>
                <Text style={styles.switchSubtext}>Receive ride updates</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E5E5E5', true: '#F37A33' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="time-outline" size={20} color="#2C2C2C" />
              <View style={styles.switchLabelContainer}>
                <Text style={styles.menuItemText}>Ride Reminders</Text>
                <Text style={styles.switchSubtext}>Get reminders before rides</Text>
              </View>
            </View>
            <Switch
              value={rideReminders}
              onValueChange={setRideReminders}
              trackColor={{ false: '#E5E5E5', true: '#F37A33' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Safety & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety & Privacy</Text>

          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#2C2C2C" />
              <View style={styles.switchLabelContainer}>
                <Text style={styles.menuItemText}>GPS Tracking</Text>
                <Text style={styles.switchSubtext}>Share location during rides</Text>
              </View>
            </View>
            <Switch
              value={gpsTracking}
              onValueChange={setGpsTracking}
              trackColor={{ false: '#E5E5E5', true: '#F37A33' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="people-outline" size={20} color="#2C2C2C" />
              <View style={styles.switchLabelContainer}>
                <Text style={styles.menuItemText}>Parent Alerts</Text>
                <Text style={styles.switchSubtext}>Notify emergency contacts</Text>
              </View>
            </View>
            <Switch
              value={parentAlerts}
              onValueChange={setParentAlerts}
              trackColor={{ false: '#E5E5E5', true: '#F37A33' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="call-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Emergency Contacts</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="eye-off-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Privacy Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="card-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="receipt-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Transaction History</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="location-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Saved Locations</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="moon-outline" size={20} color="#2C2C2C" />
              <View style={styles.switchLabelContainer}>
                <Text style={styles.menuItemText}>Dark Mode</Text>
                <Text style={styles.switchSubtext}>Coming soon</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E5E5E5', true: '#F37A33' }}
              thumbColor="#FFFFFF"
              disabled
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="document-text-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Terms & Conditions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="information-circle-outline" size={20} color="#2C2C2C" />
              <Text style={styles.menuItemText}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#717182" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.menuItem, styles.dangerItem]}
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account? This action cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => Alert.alert('Account deleted'),
                  },
                ]
              )
            }}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
              <Text style={[styles.menuItemText, styles.dangerText]}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Sity v1.0.0</Text>
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
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#717182',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    flex: 1,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C2C2C',
    marginLeft: 12,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  switchLabelContainer: {
    marginLeft: 12,
    flex: 1,
  },
  switchSubtext: {
    fontSize: 12,
    color: '#717182',
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  dangerItem: {
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  dangerText: {
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#717182',
  },
})

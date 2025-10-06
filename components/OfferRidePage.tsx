import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface OfferRidePageProps {
  user: any
  navigation?: any
}

export function OfferRidePage({ user, navigation }: OfferRidePageProps) {
  const [isLive, setIsLive] = useState(false)
  const [showOfferForm, setShowOfferForm] = useState(false)
  const [rideData, setRideData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 1,
    price: '',
    allowBidUp: false,
    allowHopIn: true,
  })

  const isDriver = user?.user_metadata?.is_driver || false
  const carDetails = user?.user_metadata?.car_details

  const handleGoLive = () => {
    if (!isDriver) {
      Alert.alert('Not a Driver', 'You need to register as a driver to go live.')
      return
    }
    setIsLive(!isLive)
    if (!isLive) {
      Alert.alert('Live!', 'You are now live and accepting ride requests.')
    } else {
      Alert.alert('Stopped', 'You are no longer accepting requests.')
    }
  }

  const handleOfferRide = () => {
    if (!isDriver) {
      Alert.alert('Not a Driver', 'You need to register as a driver to offer rides.')
      return
    }
    setShowOfferForm(!showOfferForm)
  }

  const handleSubmitRide = () => {
    if (!rideData.from || !rideData.to || !rideData.date || !rideData.time) {
      Alert.alert('Missing Information', 'Please fill in all required fields.')
      return
    }
    Alert.alert('Success', 'Your ride has been posted!')
    setShowOfferForm(false)
    // Reset form
    setRideData({
      from: '',
      to: '',
      date: '',
      time: '',
      seats: 1,
      price: '',
      allowBidUp: false,
      allowHopIn: true,
    })
  }

  const rideRequests = [
    {
      id: '1',
      rider: 'Alex Brown',
      pickup: 'Engineering Building',
      destination: 'Downtown',
      time: '2:00 PM',
      seats: 1,
    },
    {
      id: '2',
      rider: 'Jessica Lee',
      pickup: 'Library',
      destination: 'Airport',
      time: '3:30 PM',
      seats: 2,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Offer Rides</Text>
        </View>

        {!isDriver ? (
          <View style={styles.notDriverContainer}>
            <Ionicons name="car-outline" size={64} color="#E5E5E5" />
            <Text style={styles.notDriverTitle}>Become a Driver</Text>
            <Text style={styles.notDriverText}>
              Register as a driver to start offering rides and earning money.
            </Text>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Driver Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.goLiveButton, isLive && styles.goLiveButtonActive]}
                onPress={handleGoLive}
              >
                <View style={styles.goLiveContent}>
                  <View style={[styles.liveIndicator, isLive && styles.liveIndicatorActive]} />
                  <View style={styles.goLiveTextContainer}>
                    <Text style={[styles.goLiveTitle, isLive && styles.goLiveTitleActive]}>
                      {isLive ? "You're Live" : 'Go Live'}
                    </Text>
                    <Text style={[styles.goLiveSubtitle, isLive && styles.goLiveSubtitleActive]}>
                      {isLive ? 'Accepting on-demand requests' : 'Accept on-demand ride requests'}
                    </Text>
                  </View>
                  <Ionicons
                    name={isLive ? 'stop-circle' : 'radio-outline'}
                    size={32}
                    color={isLive ? '#FFFFFF' : '#F37A33'}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.offerRideButton} onPress={handleOfferRide}>
                <Ionicons name="add-circle-outline" size={24} color="#F37A33" />
                <Text style={styles.offerRideText}>Schedule a Ride</Text>
              </TouchableOpacity>
            </View>

            {/* Car Details */}
            {carDetails && (
              <View style={styles.carCard}>
                <View style={styles.carHeader}>
                  <Ionicons name="car" size={24} color="#F37A33" />
                  <Text style={styles.carTitle}>Your Vehicle</Text>
                </View>
                <View style={styles.carDetails}>
                  <Text style={styles.carText}>
                    {carDetails.color} {carDetails.make} {carDetails.model}
                  </Text>
                  <Text style={styles.carPlate}>{carDetails.plate}</Text>
                </View>
              </View>
            )}

            {/* Offer Ride Form */}
            {showOfferForm && (
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Schedule a New Ride</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>From</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="location" size={20} color="#10B981" />
                    <TextInput
                      style={styles.input}
                      placeholder="Pickup location"
                      placeholderTextColor="#999"
                      value={rideData.from}
                      onChangeText={(text) => setRideData({ ...rideData, from: text })}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>To</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="location" size={20} color="#F37A33" />
                    <TextInput
                      style={styles.input}
                      placeholder="Destination"
                      placeholderTextColor="#999"
                      value={rideData.to}
                      onChangeText={(text) => setRideData({ ...rideData, to: text })}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Date</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="calendar-outline" size={20} color="#717182" />
                      <TextInput
                        style={styles.input}
                        placeholder="MM/DD/YYYY"
                        placeholderTextColor="#999"
                        value={rideData.date}
                        onChangeText={(text) => setRideData({ ...rideData, date: text })}
                      />
                    </View>
                  </View>

                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Time</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="time-outline" size={20} color="#717182" />
                      <TextInput
                        style={styles.input}
                        placeholder="HH:MM AM/PM"
                        placeholderTextColor="#999"
                        value={rideData.time}
                        onChangeText={(text) => setRideData({ ...rideData, time: text })}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Seats Available</Text>
                    <View style={styles.passengerControl}>
                      <TouchableOpacity
                        onPress={() =>
                          setRideData({ ...rideData, seats: Math.max(1, rideData.seats - 1) })
                        }
                        style={styles.passengerButton}
                      >
                        <Ionicons name="remove" size={20} color="#717182" />
                      </TouchableOpacity>
                      <Text style={styles.passengerText}>{rideData.seats}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          setRideData({ ...rideData, seats: Math.min(4, rideData.seats + 1) })
                        }
                        style={styles.passengerButton}
                      >
                        <Ionicons name="add" size={20} color="#717182" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Price per Seat ($)</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="cash-outline" size={20} color="#717182" />
                      <TextInput
                        style={styles.input}
                        placeholder="0"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={rideData.price}
                        onChangeText={(text) => setRideData({ ...rideData, price: text })}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.switchRow}>
                  <View style={styles.switchLabel}>
                    <Text style={styles.switchText}>Allow Hop-In</Text>
                    <Text style={styles.switchSubtext}>Let riders join on the go</Text>
                  </View>
                  <Switch
                    value={rideData.allowHopIn}
                    onValueChange={(value) => setRideData({ ...rideData, allowHopIn: value })}
                    trackColor={{ false: '#E5E5E5', true: '#F37A33' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.switchRow}>
                  <View style={styles.switchLabel}>
                    <Text style={styles.switchText}>Allow Bid-Up</Text>
                    <Text style={styles.switchSubtext}>Let riders offer higher prices</Text>
                  </View>
                  <Switch
                    value={rideData.allowBidUp}
                    onValueChange={(value) => setRideData({ ...rideData, allowBidUp: value })}
                    trackColor={{ false: '#E5E5E5', true: '#F37A33' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowOfferForm(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRide}>
                    <Text style={styles.submitButtonText}>Post Ride</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Ride Requests */}
            {isLive && rideRequests.length > 0 && (
              <View style={styles.requestsSection}>
                <Text style={styles.sectionTitle}>Ride Requests ({rideRequests.length})</Text>

                {rideRequests.map((request) => (
                  <View key={request.id} style={styles.requestCard}>
                    <View style={styles.requestHeader}>
                      <View>
                        <Text style={styles.riderName}>{request.rider}</Text>
                        <Text style={styles.requestSeats}>{request.seats} seat(s)</Text>
                      </View>
                      <Text style={styles.requestTime}>{request.time}</Text>
                    </View>

                    <View style={styles.requestRoute}>
                      <View style={styles.routePoint}>
                        <View style={[styles.routeDot, styles.routeDotStart]} />
                        <Text style={styles.routeText}>{request.pickup}</Text>
                      </View>
                      <View style={styles.routeLine} />
                      <View style={styles.routePoint}>
                        <View style={[styles.routeDot, styles.routeDotEnd]} />
                        <Text style={styles.routeText}>{request.destination}</Text>
                      </View>
                    </View>

                    <View style={styles.requestActions}>
                      <TouchableOpacity style={styles.declineButton}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
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
  notDriverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  notDriverTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 24,
    marginBottom: 12,
  },
  notDriverText: {
    fontSize: 16,
    color: '#717182',
    textAlign: 'center',
    marginBottom: 24,
  },
  registerButton: {
    backgroundColor: '#F37A33',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    padding: 24,
  },
  goLiveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F37A33',
  },
  goLiveButtonActive: {
    backgroundColor: '#F37A33',
    borderColor: '#F37A33',
  },
  goLiveContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F0',
    marginRight: 16,
  },
  liveIndicatorActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  goLiveTextContainer: {
    flex: 1,
  },
  goLiveTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  goLiveTitleActive: {
    color: '#FFFFFF',
  },
  goLiveSubtitle: {
    fontSize: 14,
    color: '#717182',
  },
  goLiveSubtitleActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  offerRideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  offerRideText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F37A33',
    marginLeft: 8,
  },
  carCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  carHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  carTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginLeft: 8,
  },
  carDetails: {
    paddingLeft: 32,
  },
  carText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginBottom: 4,
  },
  carPlate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#717182',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2C2C2C',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  passengerButton: {
    padding: 4,
  },
  passengerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  switchLabel: {
    flex: 1,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 2,
  },
  switchSubtext: {
    fontSize: 12,
    color: '#717182',
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#717182',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#F37A33',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  requestsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 16,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  riderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  requestSeats: {
    fontSize: 12,
    color: '#717182',
  },
  requestTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F37A33',
  },
  requestRoute: {
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
    height: 16,
    backgroundColor: '#E5E5E5',
    marginLeft: 5,
    marginVertical: 4,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  declineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})

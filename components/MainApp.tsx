import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { HomePage } from './HomePage'
import { FindRidesPage } from './FindRidesPage'
import { OfferRidePage } from './OfferRidePage'
import { ProfilePage } from './ProfilePage'

const Tab = createBottomTabNavigator()

interface MainAppProps {
  user: any
  onLogout: () => void
}

export function MainApp({ user, onLogout }: MainAppProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Find Rides') {
            iconName = focused ? 'search' : 'search-outline'
          } else if (route.name === 'Offer Rides') {
            iconName = focused ? 'add-circle' : 'add-circle-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#F37A33',
        tabBarInactiveTintColor: '#717182',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomePage {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Find Rides">
        {(props) => <FindRidesPage {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Offer Rides">
        {(props) => <OfferRidePage {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props) => <ProfilePage {...props} user={user} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

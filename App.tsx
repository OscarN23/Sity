import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { SplashScreen } from './components/SplashScreen'
import { AuthScreen } from './components/AuthScreen'
import { MainApp } from './components/MainApp'
import { authHelpers } from './utils/supabase/client'

const Stack = createNativeStackNavigator()

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Show splash screen for 2 seconds then check auth
    const timer = setTimeout(async () => {
      await checkAuthState()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const checkAuthState = async () => {
    try {
      const { data: { session }, error } = await authHelpers.getSession()
      if (error) {
        console.error('Auth check error:', error)
      } else if (session?.user) {
        setUser(session.user)
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogout = async () => {
    try {
      await authHelpers.signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
    }
  }

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <Stack.Screen name="Auth">
              {(props) => <AuthScreen {...props} onAuthSuccess={handleAuthSuccess} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main">
              {(props) => <MainApp {...props} user={user} onLogout={handleLogout} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  )
}

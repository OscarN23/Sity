import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { projectId, publicAnonKey } from './info'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'x-application-name': 'Sity-Campus-Carpool',
      },
    },
  }
)

// Development mode mock auth for when Supabase is unavailable
let MOCK_MODE = true

// Function to check if we should use mock mode
const shouldUseMockMode = () => {
  return true
}

export const mockUser = {
  id: 'mock-user-123',
  email: 'john@university.edu',
  user_metadata: {
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    university: 'University of California',
    is_driver: true,
    car_details: {
      make: 'Honda',
      model: 'Civic',
      color: 'Blue',
      plate: 'ABC-123',
    },
  },
  created_at: new Date().toISOString(),
}

// Demo user accounts for testing
const demoUsers = {
  'john@university.edu': {
    password: 'password123',
    userData: mockUser,
  },
  'sarah@university.edu': {
    password: 'password123',
    userData: {
      id: 'mock-user-456',
      email: 'sarah@university.edu',
      user_metadata: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 234-5678',
        university: 'University of California',
        is_driver: true,
        car_details: {
          make: 'Toyota',
          model: 'Camry',
          color: 'Silver',
          plate: 'XYZ-789',
        },
      },
      created_at: new Date().toISOString(),
    },
  },
  'demo@university.edu': {
    password: 'demo123',
    userData: {
      id: 'mock-user-789',
      email: 'demo@university.edu',
      user_metadata: {
        name: 'Demo User',
        phone: '+1 (555) 345-6789',
        university: 'University of California',
        is_driver: false,
      },
      created_at: new Date().toISOString(),
    },
  },
}

// Enhanced auth functions with error handling
export const authHelpers = {
  signInWithPassword: async (credentials: { email: string; password: string }) => {
    const useMockMode = shouldUseMockMode()
    console.log('🔐 Auth attempt:', { email: credentials.email, mockMode: useMockMode })

    if (useMockMode) {
      console.log('📱 Mock mode: simulating login for', credentials.email)

      // Check demo users
      const demoUser = demoUsers[credentials.email]
      console.log('👤 Demo user found:', !!demoUser)
      console.log('🔑 Password check:', {
        provided: credentials.password,
        expected: demoUser?.password,
        match: demoUser?.password === credentials.password,
      })

      if (demoUser && demoUser.password === credentials.password) {
        console.log('✅ Password match, logging in user:', demoUser.userData.user_metadata.name)
        await AsyncStorage.setItem('sity-user', JSON.stringify(demoUser.userData))
        return {
          data: { user: demoUser.userData, session: { user: demoUser.userData } },
          error: null,
        }
      } else if (demoUser) {
        console.log('❌ Password mismatch for user:', credentials.email)
        return {
          data: { user: null, session: null },
          error: {
            message: 'Invalid password. Check the demo credentials in the development notice.',
          },
        }
      } else {
        console.log('❌ User not found:', credentials.email)
        return {
          data: { user: null, session: null },
          error: {
            message:
              'User not found. Try john@university.edu, sarah@university.edu, or demo@university.edu',
          },
        }
      }
    }

    try {
      console.log('🌐 Attempting Supabase authentication...')
      const result = await supabase.auth.signInWithPassword(credentials)
      console.log('✅ Supabase auth result:', result)
      return result
    } catch (error) {
      console.error('❌ Supabase auth error:', error)

      // Fallback to mock mode if Supabase fails
      console.log('🔄 Falling back to mock mode due to connection error')
      const demoUser = demoUsers[credentials.email]
      if (demoUser && demoUser.password === credentials.password) {
        await AsyncStorage.setItem('sity-user', JSON.stringify(demoUser.userData))
        return {
          data: { user: demoUser.userData, session: { user: demoUser.userData } },
          error: null,
        }
      }

      throw new Error(
        'Unable to connect to authentication service. Please try the demo credentials shown on screen.'
      )
    }
  },

  signUp: async (userDetails: any) => {
    const useMockMode = shouldUseMockMode()
    console.log('📝 Signup attempt:', { email: userDetails.email, mockMode: useMockMode })

    // Always simulate signup for development
    console.log('📱 Simulating signup for:', userDetails.email)

    // Store user data in AsyncStorage for development
    const userData = {
      id: `user-${Date.now()}`,
      email: userDetails.email,
      user_metadata: {
        name: userDetails.name,
        phone: userDetails.phone,
        university: userDetails.university,
        is_driver: userDetails.is_driver,
        car_details: userDetails.car_details,
      },
      created_at: new Date().toISOString(),
    }

    await AsyncStorage.setItem('sity-user', JSON.stringify(userData))
    console.log('✅ User created and stored:', userData.user_metadata.name)

    return {
      data: { user: userData },
      error: null,
    }
  },

  getSession: async () => {
    const useMockMode = shouldUseMockMode()
    console.log('🔍 Getting session, mock mode:', useMockMode)

    // Always check AsyncStorage first for existing session
    const storedUser = await AsyncStorage.getItem('sity-user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        console.log('👤 Found stored user:', user.user_metadata?.name)
        return { data: { session: { user } }, error: null }
      } catch (e) {
        console.error('Error parsing stored user:', e)
        await AsyncStorage.removeItem('sity-user')
      }
    }

    if (useMockMode) {
      console.log('📱 Mock mode: no stored session found')
      return { data: { session: null }, error: null }
    }

    try {
      console.log('🌐 Checking Supabase session...')
      const result = await supabase.auth.getSession()
      return result
    } catch (error) {
      console.error('❌ Session check error:', error)
      return { data: { session: null }, error: null }
    }
  },

  signOut: async () => {
    console.log('👋 Signing out user')
    await AsyncStorage.removeItem('sity-user')

    const useMockMode = shouldUseMockMode()
    if (useMockMode) {
      console.log('📱 Mock mode: user signed out')
      return { error: null }
    }

    try {
      const result = await supabase.auth.signOut()
      console.log('✅ Supabase signout successful')
      return result
    } catch (error) {
      console.error('❌ Sign out error:', error)
      // Don't throw error, just log it since AsyncStorage is already cleared
      return { error: null }
    }
  },
}

export type User = {
  id: string
  email: string
  name: string
  phone?: string
  university?: string
  avatar_url?: string
  car_details?: {
    make: string
    model: string
    color: string
    plate: string
  }
  is_driver: boolean
  created_at: string
}

export type Ride = {
  id: string
  driver_id: string
  departure_location: string
  destination: string
  departure_time: string
  available_seats: number
  price_per_seat: number
  description?: string
  cover_image_url?: string
  allow_bid_up: boolean
  allow_hop_in: boolean
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
}

export type RideRequest = {
  id: string
  ride_id: string
  rider_id: string
  seats_requested: number
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
}

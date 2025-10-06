import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { authHelpers } from '../utils/supabase/client'

type AuthMode = 'welcome' | 'signup' | 'login'

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('welcome')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    university: '',
    carMake: '',
    carModel: '',
    carColor: '',
    carPlate: '',
    isDriver: false,
    acceptTerms: false,
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your full name')
      return
    }

    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }

    if (!formData.password.trim()) {
      Alert.alert('Error', 'Please enter a password')
      return
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
      return
    }

    if (!formData.acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions')
      return
    }

    if (!formData.email.includes('.edu')) {
      Alert.alert('Error', 'Please use your university email address')
      return
    }

    setLoading(true)
    try {
      const userDetails = {
        email: formData.email.trim(),
        password: formData.password.trim(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        university: formData.university.trim(),
        car_details: formData.isDriver
          ? {
              make: formData.carMake.trim(),
              model: formData.carModel.trim(),
              color: formData.carColor.trim(),
              plate: formData.carPlate.trim(),
            }
          : null,
        is_driver: formData.isDriver,
      }

      const { data, error } = await authHelpers.signUp(userDetails)

      if (error) {
        throw new Error(error.message || 'Signup failed')
      }

      Alert.alert('Success', 'Account created successfully!')

      // Auto sign in after signup
      const { data: signInData, error: signInError } = await authHelpers.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password.trim(),
      })

      if (signInError) {
        onAuthSuccess(data.user)
      } else {
        onAuthSuccess(signInData.user)
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }

    if (!formData.password.trim()) {
      Alert.alert('Error', 'Please enter your password')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await authHelpers.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password.trim(),
      })

      if (error) {
        throw new Error(error.message || 'Failed to sign in')
      }

      onAuthSuccess(data.user)
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const useDemoAccount = (email: string, password: string) => {
    setFormData((prev) => ({ ...prev, email, password }))
    setMode('login')
  }

  if (mode === 'welcome') {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContent}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.title}>Welcome to Sity</Text>
          <Text style={styles.subtitle}>Your Campus Carpool Solution</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setMode('signup')}
          >
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => setMode('login')}
          >
            <Text style={styles.outlineButtonText}>Log In</Text>
          </TouchableOpacity>

          {/* Development Demo Notice */}
          <View style={styles.demoNotice}>
            <Text style={styles.demoTitle}>🔧 Development Mode Active</Text>
            <Text style={styles.demoSubtitle}>Use these demo accounts to test the app:</Text>
            <View style={styles.demoAccounts}>
              <View style={styles.demoRow}>
                <Text style={styles.demoEmail}>john@university.edu</Text>
                <Text style={styles.demoPassword}>password123</Text>
              </View>
              <View style={styles.demoRow}>
                <Text style={styles.demoEmail}>sarah@university.edu</Text>
                <Text style={styles.demoPassword}>password123</Text>
              </View>
              <View style={styles.demoRow}>
                <Text style={styles.demoEmail}>demo@university.edu</Text>
                <Text style={styles.demoPassword}>demo123</Text>
              </View>
            </View>
            <View style={styles.demoButtons}>
              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => useDemoAccount('john@university.edu', 'password123')}
              >
                <Text style={styles.demoButtonText}>Use John</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => useDemoAccount('sarah@university.edu', 'password123')}
              >
                <Text style={styles.demoButtonText}>Use Sarah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => useDemoAccount('demo@university.edu', 'demo123')}
              >
                <Text style={styles.demoButtonText}>Use Demo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <View style={styles.logoContainerSmall}>
              <Text style={styles.logoTextSmall}>S</Text>
            </View>
            <Text style={styles.formTitle}>
              {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === 'signup' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  placeholder="John Doe"
                  placeholderTextColor="#999"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>University Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="john@university.edu"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {mode === 'signup' && formData.email && !formData.email.includes('.edu') && (
                <Text style={styles.errorText}>Please use your university email (.edu)</Text>
              )}
            </View>

            {mode === 'signup' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                    placeholder="(555) 123-4567"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>University</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.university}
                    onChangeText={(text) => handleInputChange('university', text)}
                    placeholder="University of Example"
                    placeholderTextColor="#999"
                  />
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry
              />
              {mode === 'signup' &&
                formData.password &&
                formData.password.length < 6 && (
                  <Text style={styles.errorText}>
                    Password must be at least 6 characters
                  </Text>
                )}
            </View>

            {mode === 'signup' && (
              <>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => handleInputChange('isDriver', !formData.isDriver)}
                >
                  <View style={[styles.checkbox, formData.isDriver && styles.checkboxChecked]}>
                    {formData.isDriver && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>I want to offer rides (Driver)</Text>
                </TouchableOpacity>

                {formData.isDriver && (
                  <View style={styles.carDetails}>
                    <Text style={styles.carDetailsTitle}>Car Details</Text>
                    <View style={styles.carDetailsGrid}>
                      <TextInput
                        style={[styles.input, styles.halfInput]}
                        value={formData.carMake}
                        onChangeText={(text) => handleInputChange('carMake', text)}
                        placeholder="Make"
                        placeholderTextColor="#999"
                      />
                      <TextInput
                        style={[styles.input, styles.halfInput]}
                        value={formData.carModel}
                        onChangeText={(text) => handleInputChange('carModel', text)}
                        placeholder="Model"
                        placeholderTextColor="#999"
                      />
                      <TextInput
                        style={[styles.input, styles.halfInput]}
                        value={formData.carColor}
                        onChangeText={(text) => handleInputChange('carColor', text)}
                        placeholder="Color"
                        placeholderTextColor="#999"
                      />
                      <TextInput
                        style={[styles.input, styles.halfInput]}
                        value={formData.carPlate}
                        onChangeText={(text) => handleInputChange('carPlate', text)}
                        placeholder="License Plate"
                        placeholderTextColor="#999"
                      />
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
                >
                  <View
                    style={[styles.checkbox, formData.acceptTerms && styles.checkboxChecked]}
                  >
                    {formData.acceptTerms && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabelSmall}>
                    I accept the Terms & Conditions and Privacy Policy
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={[
                styles.primaryButton,
                (loading ||
                  !formData.email.trim() ||
                  !formData.password.trim() ||
                  (mode === 'signup' &&
                    (!formData.name.trim() ||
                      !formData.acceptTerms ||
                      !formData.email.includes('.edu') ||
                      formData.password.length < 6))) &&
                  styles.disabledButton,
              ]}
              onPress={mode === 'signup' ? handleSignUp : handleLogin}
              disabled={
                loading ||
                !formData.email.trim() ||
                !formData.password.trim() ||
                (mode === 'signup' &&
                  (!formData.name.trim() ||
                    !formData.acceptTerms ||
                    !formData.email.includes('.edu') ||
                    formData.password.length < 6))
              }
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  {mode === 'signup' ? 'Create Account' : 'Log In'}
                </Text>
              )}
            </TouchableOpacity>

            {mode === 'login' && (
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => setMode('welcome')}>
                <Text style={styles.footerLink}>← Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
                <Text style={styles.footerLink}>
                  {mode === 'signup'
                    ? 'Already have an account? Log In'
                    : "Don't have an account? Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  welcomeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#F37A33',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#717182',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: '#F37A33',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#F37A33',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  outlineButtonText: {
    color: '#F37A33',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  demoNotice: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 16,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D4ED8',
    textAlign: 'center',
    marginBottom: 12,
  },
  demoSubtitle: {
    fontSize: 12,
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 8,
  },
  demoAccounts: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  demoEmail: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#1E3A8A',
  },
  demoPassword: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#2563EB',
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  demoButton: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  demoButtonText: {
    fontSize: 12,
    color: '#1D4ED8',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainerSmall: {
    width: 64,
    height: 64,
    backgroundColor: '#F37A33',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoTextSmall: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  form: {
    gap: 16,
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
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C2C2C',
  },
  halfInput: {
    width: '48%',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F37A33',
    borderColor: '#F37A33',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#2C2C2C',
  },
  checkboxLabelSmall: {
    fontSize: 12,
    color: '#717182',
    flex: 1,
  },
  carDetails: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  carDetailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 12,
  },
  carDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#F37A33',
    textAlign: 'center',
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  footerLink: {
    fontSize: 12,
    color: '#717182',
  },
})

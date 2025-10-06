import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface HelpSupportPageProps {
  navigation?: any
  user?: any
}

export function HelpSupportPage({ navigation, user }: HelpSupportPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const faqs = [
    {
      id: '1',
      category: 'Getting Started',
      question: 'How do I verify my university email?',
      answer: "When you sign up, enter your university email address (e.g., yourname@university.edu). We'll send you a verification code to confirm your email. Enter the code in the app to complete verification. This ensures all Sity users are part of your campus community."
    },
    {
      id: '2',
      category: 'Getting Started',
      question: 'How do I set up my profile?',
      answer: "After verification, you can add your profile photo, phone number, and other details in the Profile tab. If you want to be a driver, you'll need to add your vehicle information including make, model, color, and license plate."
    },
    {
      id: '3',
      category: 'Riding',
      question: 'How do I find a ride?',
      answer: 'Tap the "Find Rides" tab, enter your pickup and destination, and choose when you need the ride. You can browse available rides by category (daily commute, weekend trips, airport runs, etc.) or request an on-demand ride.'
    },
    {
      id: '4',
      category: 'Riding',
      question: 'How does pricing work?',
      answer: "Sity uses smart pricing based on distance, time, and demand. You'll always see the suggested price before requesting a ride. You can also set your own price if you prefer. Drivers can accept your offer or send a counter-offer."
    },
    {
      id: '5',
      category: 'Driving',
      question: 'What do I need to become a driver?',
      answer: "To drive on Sity, you need: (1) A verified university email, (2) A valid driver's license, (3) Vehicle registration and insurance, (4) A registered vehicle in the app with make, model, color, and license plate."
    },
    {
      id: '6',
      category: 'Driving',
      question: 'How do I offer a ride?',
      answer: 'Go to the "Offer Rides" tab. You can either "Go Live" to accept on-demand ride requests, or tap "Offer a Ride" to post a scheduled ride with your route, departure time, and available seats.'
    },
    {
      id: '7',
      category: 'Safety',
      question: 'What safety features does Sity have?',
      answer: 'Sity includes several safety features: university email verification for all users, GPS tracking on all rides, optional trip sharing with trusted contacts, and post-ride ratings. You can also report safety issues directly in the app.'
    },
    {
      id: '8',
      category: 'Safety',
      question: 'How does GPS tracking work?',
      answer: 'All rides are tracked in real-time using GPS. Both riders and drivers can see the current location during the trip. If you enable "Share Trip Status" in Settings, your trusted contacts will also receive live updates.'
    },
    {
      id: '9',
      category: 'Payments',
      question: 'What payment methods are accepted?',
      answer: "Sity accepts major credit and debit cards. You can add and manage your payment methods in the app. All payments are processed securely, and you'll receive a receipt after each ride."
    },
    {
      id: '10',
      category: 'Payments',
      question: 'When do I get paid as a driver?',
      answer: "Driver earnings are deposited to your linked bank account weekly. You can view your earnings history and pending payments in the Profile tab under your activity."
    },
  ]

  const categories = Array.from(new Set(faqs.map(faq => faq.category)))

  const toggleFaq = (id: string) => {
    setExpandedFaq(prev => prev === id ? null : id)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Contact Support */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Need More Help?</Text>
          <Text style={styles.contactSubtitle}>
            Can't find what you're looking for? Our support team is here to help.
          </Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#F37A33" />
              <Text style={styles.contactButtonText}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => Linking.openURL('mailto:support@sityapp.com')}
            >
              <Ionicons name="mail-outline" size={18} color="#F37A33" />
              <Text style={styles.contactButtonText}>Email Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs by Category */}
        <View style={styles.faqsContainer}>
          {categories.map((category) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {faqs
                .filter(faq => faq.category === category)
                .map((faq) => (
                  <View key={faq.id} style={styles.faqCard}>
                    <TouchableOpacity
                      style={styles.faqHeader}
                      onPress={() => toggleFaq(faq.id)}
                    >
                      <Text style={styles.faqQuestion}>{faq.question}</Text>
                      <Ionicons
                        name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#717182"
                      />
                    </TouchableOpacity>
                    {expandedFaq === faq.id && (
                      <View style={styles.faqAnswerContainer}>
                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                      </View>
                    )}
                  </View>
                ))}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sity v1.0.0</Text>
          <Text style={styles.footerText}>support@sityapp.com</Text>
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
  contactCard: {
    backgroundColor: '#F37A33',
    margin: 24,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  contactSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F37A33',
  },
  faqsContainer: {
    paddingHorizontal: 24,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    paddingRight: 12,
  },
  faqAnswerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#717182',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#717182',
    marginBottom: 4,
  },
})

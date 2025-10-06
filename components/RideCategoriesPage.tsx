import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface RideCategoriesPageProps {
  navigation?: any
  user?: any
}

export function RideCategoriesPage({ navigation, user }: RideCategoriesPageProps) {
  const categories = [
    {
      id: 'airport',
      title: 'Airport Runs',
      subtitle: 'Get to the airport on time',
      icon: 'airplane' as const,
      color: '#3B82F6',
      priceRange: '$20 - $35',
    },
    {
      id: 'shopping',
      title: 'Shopping Trips',
      subtitle: 'Errands and groceries',
      icon: 'bag' as const,
      color: '#10B981',
      priceRange: '$8 - $15',
    },
    {
      id: 'events',
      title: 'Events & Games',
      subtitle: 'Sports, concerts, parties',
      icon: 'musical-notes' as const,
      color: '#8B5CF6',
      priceRange: '$5 - $12',
    },
    {
      id: 'downtown',
      title: 'Downtown',
      subtitle: 'City center destinations',
      icon: 'business' as const,
      color: '#F59E0B',
      priceRange: '$6 - $10',
    },
    {
      id: 'restaurant',
      title: 'Restaurants',
      subtitle: 'Dining out together',
      icon: 'restaurant' as const,
      color: '#EF4444',
      priceRange: '$5 - $10',
    },
    {
      id: 'campus',
      title: 'Campus Routes',
      subtitle: 'Between buildings',
      icon: 'school' as const,
      color: '#06B6D4',
      priceRange: '$3 - $5',
    },
    {
      id: 'weekend',
      title: 'Weekend Getaways',
      subtitle: 'Road trips and adventures',
      icon: 'car-sport' as const,
      color: '#EC4899',
      priceRange: '$30 - $60',
    },
    {
      id: 'regular',
      title: 'Regular Commute',
      subtitle: 'Daily routes',
      icon: 'calendar' as const,
      color: '#6366F1',
      priceRange: '$4 - $8',
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ride Categories</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Description */}
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Browse rides by category to find the perfect match for your destination
          </Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => {
                // Navigate to rides filtered by category
              }}
            >
              <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <Ionicons name={category.icon} size={32} color={category.color} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceRange}>{category.priceRange}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          
          <TouchableOpacity style={styles.routeCard}>
            <View style={styles.routeInfo}>
              <View style={styles.routePoints}>
                <View style={[styles.routeDot, styles.routeDotStart]} />
                <Text style={styles.routeText}>Campus Center → Downtown</Text>
              </View>
              <Text style={styles.routeStats}>24 rides this week</Text>
            </View>
            <Text style={styles.routePrice}>~$8</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.routeCard}>
            <View style={styles.routeInfo}>
              <View style={styles.routePoints}>
                <View style={[styles.routeDot, styles.routeDotStart]} />
                <Text style={styles.routeText}>Library → Airport</Text>
              </View>
              <Text style={styles.routeStats}>18 rides this week</Text>
            </View>
            <Text style={styles.routePrice}>~$28</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.routeCard}>
            <View style={styles.routeInfo}>
              <View style={styles.routePoints}>
                <View style={[styles.routeDot, styles.routeDotStart]} />
                <Text style={styles.routeText}>Dorms → Shopping Mall</Text>
              </View>
              <Text style={styles.routeStats}>15 rides this week</Text>
            </View>
            <Text style={styles.routePrice}>~$12</Text>
          </TouchableOpacity>
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
  description: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#717182',
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#717182',
    marginBottom: 12,
  },
  priceContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  priceRange: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F37A33',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 16,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routePoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  routeDotStart: {
    backgroundColor: '#10B981',
  },
  routeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  routeStats: {
    fontSize: 12,
    color: '#717182',
    marginLeft: 16,
  },
  routePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F37A33',
  },
})

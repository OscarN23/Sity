import { View, Text, StyleSheet } from 'react-native'

export function RideRequestPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ride Request - To be implemented</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
  text: { fontSize: 16, color: '#717182' },
})

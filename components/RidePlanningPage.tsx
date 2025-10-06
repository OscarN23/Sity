import { View, Text, StyleSheet } from 'react-native'

export function RidePlanningPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ride Planning - To be implemented</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
  text: { fontSize: 16, color: '#717182' },
})

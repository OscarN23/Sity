// Sity pricing calculator
// Base: $1.50 per mile + $0.25 per minute + $0.10 per mile per additional passenger

export interface PricingInput {
  distance: number // in miles
  duration: number // in minutes
  totalPassengers: number
}

export function calculateRidePrice({ distance, duration, totalPassengers }: PricingInput): number {
  const basePricePerMile = 1.50
  const pricePerMinute = 0.25
  const additionalPassengerRate = 0.10 // per mile per additional passenger
  
  // Base cost
  const baseCost = (distance * basePricePerMile) + (duration * pricePerMinute)
  
  // Additional passenger cost (passengers beyond the first one)
  const additionalPassengers = Math.max(0, totalPassengers - 1)
  const additionalPassengerCost = distance * additionalPassengerRate * additionalPassengers
  
  const totalPrice = baseCost + additionalPassengerCost
  
  // Round to nearest dollar
  return Math.round(totalPrice)
}

export function formatPrice(price: number): string {
  return `$${price}`
}

# Sity - Campus Carpool App (React Native)

A React Native mobile application for campus carpooling, built with Expo.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (available on iOS App Store and Google Play Store)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run the app:
   - **On iOS**: Scan the QR code with your iPhone camera
   - **On Android**: Scan the QR code with the Expo Go app
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal

## 📱 App Structure

```
/
├── App.tsx                    # Main entry point with navigation setup
├── components/
│   ├── SplashScreen.tsx       # Splash screen with animation
│   ├── AuthScreen.tsx         # Login/Signup screens
│   ├── MainApp.tsx            # Bottom tab navigation
│   ├── HomePage.tsx           # Home screen with hop-in rides
│   ├── FindRidesPage.tsx      # Find and search for rides
│   ├── OfferRidePage.tsx      # Offer rides (driver interface)
│   └── ProfilePage.tsx        # User profile and settings
├── utils/
│   └── supabase/
│       ├── client.tsx         # Supabase client configuration
│       └── info.tsx           # Supabase credentials
├── package.json               # Dependencies
└── app.json                   # Expo configuration
```

## 🎨 Features Implemented

### Authentication
- Welcome screen with branding
- Sign up with university email verification
- Login with demo accounts
- Mock authentication for development

### Home Screen
- Personalized greeting
- Search bar with quick suggestions
- Hop-in rides section with live rides
- Popular destinations

### Find Rides
- Search form with pickup, destination, date, and passengers
- Available rides list
- Driver information and ratings
- Seat availability and pricing

### Offer Rides (Drivers)
- Go Live feature for on-demand requests
- Schedule rides with full details
- Car information display
- Ride request management
- Allow Hop-In and Bid-Up options

### Profile
- User information display
- Driver verification badge
- Activity/ride history
- Car information (for drivers)
- Settings menu
- Logout functionality

## 🔧 Development Mode

The app currently runs in **mock mode** with demo accounts:

- **john@university.edu** / password123
- **sarah@university.edu** / password123  
- **demo@university.edu** / demo123

## 🎨 Design System

### Colors
- **Primary Orange**: #F37A33 (Sity brand color)
- **Charcoal**: #2C2C2C (Text and headers)
- **Light Gray**: #F5F5F5 (Backgrounds)
- **White**: #FFFFFF

### Typography
- Headers: 700 weight
- Body: 400-600 weight
- Rounded corners: 8-16px

## 📦 Key Dependencies

- **expo**: ~51.0.0
- **react-native**: 0.74.0
- **@react-navigation/native**: Navigation system
- **@react-navigation/bottom-tabs**: Bottom tab navigator
- **@supabase/supabase-js**: Backend integration
- **@react-native-async-storage/async-storage**: Local storage
- **@expo/vector-icons**: Icon library (Ionicons)

## 🚧 To Be Implemented

The following pages need conversion from React web to React Native:

- RideDetailsPage
- RideTrackingPage (with live maps)
- RideCategoriesPage
- RidePlanningPage
- RideResultsPage
- OnDemandRidePage
- RideRequestPage
- ActivityPage
- PastRideDetailsPage
- SettingsPage
- HelpSupportPage

## 🗺️ Maps Integration

For Mapbox integration, you'll need to:

1. Install react-native-mapbox-gl:
```bash
npx expo install @rnmapbox/maps
```

2. Add Mapbox token to app.json

3. Implement map views in tracking and ride pages

## 🔐 Supabase Setup

To connect to real Supabase:

1. Update `utils/supabase/info.tsx` with your Supabase credentials
2. Set `MOCK_MODE = false` in `utils/supabase/client.tsx`
3. Ensure AsyncStorage is properly configured

## 📱 Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## 💡 Tips

- Use the React Native debugger for better debugging
- Test on both iOS and Android devices
- Use Expo Go for quick iteration
- Hot reload is enabled by default

## 📄 License

© 2025 Sity. All rights reserved.

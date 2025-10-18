1. The first step was to get the app working on my laptop and phone, and this was by far the hardest part.
Getting all the prerequisites and dependencies into my environment properly took a long time, and I had a large
number of errors in my command prompt. Once I had the app working, though, it wasn't too bad. The next step was
to get my bearings in the repository, which was a little intimidating at first, but after tracing through
HomePage.tsx, MainApp.tsx, and App.tsx I had a pretty good idea of what was going on. To connect the "See All"
button with the "Find Rides" page I just added:
  onPress={() => navigation?.navigate('Find Rides')}>
to the "See All" button in HomePage.tsx. Then I made the Supabase project and added the demo logins as well
as my own test login (noah@testing.edu, password: testing123 if you want to try it). Then I just configured
client.tsx with my project and made shouldUseMockMode() return false to test. "Log in" already calls
authHelpers.signInWithPassword(), so I didn't have to edit that at all, and in testing, everything worked
properly. All the demos' plus my test user's credentials properly went from the "sign in" page to the main page,
and any other credentials returned an error.

2. One of my top priorities would be centralizing authentication logic. Right now, files like AuthScreen.tsx,
App.tsx, and utils/supabase/client.tsx all handle different parts of login and session management. For example,
authHelpers.signUp() writes directly to AsyncStorage, while App.tsx separately checks sessions and AuthScreen
triggers navigation through onAuthSuccess. This scattering makes it harder to trace the user’s state.
Consolidating this into a single AuthContext or useAuth() hook would simplify the flow, improve reliability,
and make it easier to handle Supabase events like confirmed email sign-ups.

A second cleanup priority would be separating presentation from logic in AuthScreen.tsx. The current file mixes 
UI elements, input validation, and async API calls (e.g., multiple Alert.alert checks followed by authHelpers.signUp() 
and signInWithPassword() calls), which makes it hard to maintain. Moving validation into a small helper and moving the 
API logic into a dedicated hook would make the screen cleaner, easier to test, and more scalable as the app grows.

3. The biggest technical challenge in adding Mapbox for live GPS tracking will likely come from Expo’s managed workflow.
Mapbox’s React Native implementation depends on native modules, which aren’t fully supported in Expo. This means
integrating live maps, background tracking, and real-time updates could require dealing with compatibility issues or
finding a way to test the app other than with Expo. Making sure GPS performs well, builds are stable, and permissions
work across iOS and Android under Expo’s constraints will probably be the toughest part of the process.

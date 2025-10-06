import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
)

// Health check endpoint
app.get("/make-server-976f8d79/health", (c) => {
  return c.json({ status: "ok" });
});

// User signup endpoint
app.post("/make-server-976f8d79/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, phone, university, car_details, is_driver } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Validate university email
    if (!email.includes('.edu')) {
      return c.json({ error: "Please use your university email address" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        phone, 
        university,
        car_details,
        is_driver 
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user data in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      name,
      phone,
      university,
      car_details,
      is_driver,
      rating: 5.0,
      total_rides: 0,
      created_at: new Date().toISOString()
    });

    console.log(`User created successfully: ${email}`);
    return c.json({ 
      success: true, 
      user: data.user,
      message: "Account created successfully!"
    });

  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user profile
app.get("/make-server-976f8d79/user/:id", async (c) => {
  try {
    const userId = c.req.param('id');
    
    const userData = await kv.get(`user:${userId}`);
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create ride
app.post("/make-server-976f8d79/rides", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { departure, destination, date, time, seats, price, description, allow_bid_up, allow_hop_in } = body;

    const rideId = crypto.randomUUID();
    const ride = {
      id: rideId,
      driver_id: user.id,
      departure_location: departure,
      destination,
      departure_time: `${date}T${time}`,
      available_seats: parseInt(seats),
      price_per_seat: parseFloat(price),
      description,
      allow_bid_up,
      allow_hop_in,
      status: 'active',
      created_at: new Date().toISOString()
    };

    await kv.set(`ride:${rideId}`, ride);
    
    // Add to driver's rides list
    const driverRides = await kv.get(`driver_rides:${user.id}`) || [];
    driverRides.push(rideId);
    await kv.set(`driver_rides:${user.id}`, driverRides);

    return c.json({ success: true, ride });
  } catch (error) {
    console.error('Create ride error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get available rides
app.get("/make-server-976f8d79/rides", async (c) => {
  try {
    const rides = await kv.getByPrefix('ride:');
    const activeRides = rides.filter(ride => ride.status === 'active');
    
    return c.json({ rides: activeRides });
  } catch (error) {
    console.error('Get rides error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);
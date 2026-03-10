# Supabase Setup Guide

This guide will help you set up Supabase for your Project Roadmap app.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `project-roadmap` (or any name you prefer)
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose closest to you
4. Click **"Create new project"**
5. Wait 2-3 minutes for provisioning

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, click **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** - looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - **Project API keys** → **anon public** - long string starting with `eyJ...`

## Step 3: Configure Your App

1. Open `.env` file in your project root
2. Replace the placeholders:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-actual-key-here
```

3. **Save the file**

## Step 4: Create Database Schema

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **"New query"**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see: `Success. No rows returned`

## Step 5: Enable Anonymous Authentication

1. In Supabase dashboard, click **Authentication** in the sidebar
2. Click **Providers**
3. Find **Anonymous sign-ins** and toggle it **ON**
4. Click **Save**

## Step 6: Verify Setup

1. In Supabase dashboard, click **Table Editor**
2. You should see a `progress` table
3. Click on it - it should be empty (no rows yet)

## Step 7: Restart Your Dev Server

```bash
npm run dev
```

Your app will now automatically:
- ✅ Generate an anonymous user ID
- ✅ Save progress to Supabase
- ✅ Keep localStorage as a cache
- ✅ Sync in real-time across tabs

## Troubleshooting

### "Supabase credentials not configured"
- Check that `.env` file has correct values
- Make sure variable names start with `VITE_`
- Restart dev server after changing `.env`

### "Row Level Security policy violation"
- Run the schema.sql again
- Verify Anonymous authentication is enabled
- Check that policies were created in Database → Policies

### Data not syncing
- Open browser DevTools → Console
- Look for error messages
- Verify internet connection
- Check Supabase project status at https://status.supabase.com

## Optional: View Live Data

- Go to **Table Editor** → **progress** table to see saved progress
- Click **Database** → **Replication** to verify realtime is enabled
- Use **Logs** → **Postgres Logs** to debug any issues

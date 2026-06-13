/*
# Setup User Profiles and Auth Trigger
This migration ensures that every user who signs up (including via Google) has a corresponding entry in the public profiles table.

## Query Description:
1. Creates a `profiles` table if it doesn't exist.
2. Sets up Row Level Security (RLS) so users can only manage their own data.
3. Creates a PostgreSQL function and trigger to automatically insert a profile row when a new user is created in Supabase Auth.

## Metadata:
- Schema-Category: Structural
- Impact-Level: Medium
- Requires-Backup: true
- Reversible: true

## Structure Details:
- Table: `public.profiles`
- Columns: `id` (uuid, references auth.users), `full_name` (text), `avatar_url` (text), `updated_at` (timestamp)

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes (Select/Update policies)
- Auth Requirements: Authenticated users only for write access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE RLS;

-- Policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles are viewable by everyone' AND tablename = 'profiles') THEN
    CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- Trigger function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

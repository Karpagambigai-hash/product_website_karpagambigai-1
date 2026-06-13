/*
# Fix Profiles and RLS
This migration ensures the profiles table is correctly set up with proper Row Level Security and an automated trigger for new users.

## Query Description:
This operation creates the public.profiles table and sets up a trigger on auth.users to automatically create a profile record when a user signs up. It also enables Row Level Security to protect user data.

## Metadata:
- Schema-Category: Structural
- Impact-Level: Medium
- Requires-Backup: true
- Reversible: true

## Structure Details:
- Table: public.profiles
- Columns: id (uuid, pk), full_name (text), avatar_url (text), updated_at (timestamptz)
- Trigger: on_auth_user_created

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes (Select, Insert, Update policies added)
- Auth Requirements: Users can only manage their own data

## Performance Impact:
- Indexes: Primary key on id
- Triggers: Added after insert on auth.users
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security explicitly
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create robust policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'User'), 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

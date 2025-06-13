-- Create todos table with description field
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  text TEXT NOT NULL,
  description TEXT DEFAULT '',
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own todos
CREATE POLICY "Users can only view their own todos" 
  ON todos FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own todos
CREATE POLICY "Users can insert their own todos" 
  ON todos FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own todos
CREATE POLICY "Users can update their own todos" 
  ON todos FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy for users to delete their own todos
CREATE POLICY "Users can delete their own todos" 
  ON todos FOR DELETE 
  USING (auth.uid() = user_id);

-- If the table already exists, add the description column
ALTER TABLE todos ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';

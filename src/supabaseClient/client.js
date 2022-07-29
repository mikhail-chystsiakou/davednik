import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cncgccvpvvfeatqciahx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuY2djY3ZwdnZmZWF0cWNpYWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkwMTg3NTAsImV4cCI6MTk3NDU5NDc1MH0.mGaqu0xLaNAs19t6enfKu6hBsS8lA6KIjl7qf-O4YBg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

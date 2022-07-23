import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bryvvreldvzbjxhkzmnz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeXZ2cmVsZHZ6Ymp4aGt6bW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTg1NDkwMzgsImV4cCI6MTk3NDEyNTAzOH0.RM3MSC7UIBRt4A_k7XLpyEERsof_E9lWu4wdrVh2uis"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

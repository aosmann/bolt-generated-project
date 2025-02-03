import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycnjherrojkwxnvrewlt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbmpoZXJyb2prd3hudnJld2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMTUwMDksImV4cCI6MjA1Mzg5MTAwOX0._J2cktRnMzoampEqAEQF_hEb5xWQza6WCtQWhSzwAJE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

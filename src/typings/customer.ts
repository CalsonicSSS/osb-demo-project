import { Database } from './supabase'

export type Customer = Database['public']['Tables']['ar_customer']['Row']

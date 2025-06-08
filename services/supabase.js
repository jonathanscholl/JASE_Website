import { createClient } from '@supabase/supabase-js';

// Debug environment variables
console.log('Environment variables:', {
    supabaseUrl: process.env.supabaseUrl,
    supabaseKey: process.env.supabaseKey ? 'exists' : 'missing',
    supabaseServiceRoleKey: process.env.supabaseServiceRoleKey ? 'exists' : 'missing'
});

const supabaseUrl = process.env.supabaseUrl
const supabaseKey = process.env.supabaseKey
const supabaseServiceKey = process.env.supabaseServiceRoleKey

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Required Supabase environment variables are missing. Please check your .env file.');
}

// Regular client for normal operations
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client for privileged operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


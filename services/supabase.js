import { createClient } from '@supabase/supabase-js';

// Debug environment variables
console.log('Environment variables:', {
    supabaseUrl: process.env.supabaseUrl,
    supabaseKey: process.env.supabaseKey ? 'exists' : 'missing',
    supabaseServiceRoleKey: process.env.supabaseServiceRoleKey ? 'exists' : 'missing'
});

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
const supabaseServiceKey = process.env.supabaseServiceRoleKey;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

// Regular client for normal operations
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Admin client for privileged operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


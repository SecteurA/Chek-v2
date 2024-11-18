import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rwficfzerxzlwodsbemd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZmljZnplcnh6bHdvZHNiZW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTk5NjksImV4cCI6MjA0NzQ5NTk2OX0.MIWP6DuCo10ElySheik9JQMFBW9shjWgoJoEnZFUhy8';

export const supabase = createClient(supabaseUrl, supabaseKey);
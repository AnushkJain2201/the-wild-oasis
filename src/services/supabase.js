import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ohvjyoqeodripkouqqmz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odmp5b3Flb2RyaXBrb3VxcW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxNTgxMjMsImV4cCI6MjAzNzczNDEyM30.vCB6MWhfRj_UCsPYF464xobre1gxZPmZzEVTD_c3Yl8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
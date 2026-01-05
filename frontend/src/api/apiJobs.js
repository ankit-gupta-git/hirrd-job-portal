import supabaseClient from "@utils/supabase";
import { data } from "react-router-dom";

export async function getJobs(token, { location, companny_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase.from('jobs').select('*, company: comapnies(name, logo_url), saved: saved_jobs(id)');

    if (location) {
        query = query.eq('location', location);
    }

    if (companny_id) {
        query = query.eq('company_id', companny_id);
    }

    if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
    }

    await { data, error } = await query;

    if(error) {
        console.error("Error fetching jobs:", error);
        return [];
    }

    return data;
}
import { useState } from 'react';
import { useSession } from "@clerk/clerk-react";

const useFetch = (cb, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { session } = useSession();

    const fn = async(...args) => {
        setLoading(true);
        setError(null);

        try {
            const supabaseAccessToken = await session.getToken({
                template: "supabase",
            });

            const response = await cb(supabaseAccessToken, options,...args);
            setData(response);
            setError(null);
        } catch (err) {
            setError(err);
    } finally {
        setLoading(false);
    }
};

    return { fn, data, loading, error };
};

export default useFetch;
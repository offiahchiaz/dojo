import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Attaching an abort controller to a fetch
        const abortController = new AbortController();
        setTimeout(() => {
             fetch(url, { signal: abortController.signal })
                 .then((res) => {
                     //console.log(res)
                     if(!res.ok) {
                         throw Error('could not fetch the data for that resource');
                     }
                     return res.json();
                 })
                 .then((data) => {
                     setData(data);
                     setIsPending(false);
                     setError(null);
                 })
                 .catch((err) => {
                    if (err.name === 'AbortError') {
                         console.log('fetch aborted');
                    } else {
                        setError(err.message);
                        setIsPending(false);
                    }
                 })
         }, 1000);

         // Clean up function
         return () => abortController.abort();
    }, [url]);

    return { data, isPending, error }
}
 
export default useFetch;
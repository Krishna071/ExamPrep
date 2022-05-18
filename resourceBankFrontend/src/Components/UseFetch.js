
import { useState,useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const abortController= new AbortController();

    useEffect(() => {
        
        fetch(url,{singal:abortController.signal})
        .then((res)=>{
            if(!res.ok){
                throw Error("Failed to fetch data for that resource");
            }

            return res.json();
        })
        .then((data)=>{
            setData(data);
            setIsPending(false);
            setError(null);
        }
        )
        .catch((err)=>{
            if(err.name==='AbortError'){
                console.log('Fetch Aborted');
            }
            else{
                setIsPending(false);
                setError(err.message);
            }
        }

        )


        return () => {
            abortController.abort();
        }
    }, [url])
    
    return {data,isPending,error};
}
 
export default useFetch;
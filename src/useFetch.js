import { useState, useEffect } from 'react';

const useFetch = (urlEndpoint) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(urlEndpoint, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource.');
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            setError(err.message);
            setIsPending(false);
          }
        })
    }, 10);

    return () => abortCont.abort();
  }, [urlEndpoint]);

  return { data, isPending, error };
}

export default useFetch;
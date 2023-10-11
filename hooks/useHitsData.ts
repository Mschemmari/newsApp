import {useState, useEffect} from 'react';
import {type Hit} from '../types';

function useHitsData() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('https://hn.algolia.com/api/v1/search_by_date?query=mobile')
      .then(async res => await res.json())
      .then(res => {
        setHits(res.hits);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return {hits, loading, error};
}

export default useHitsData;

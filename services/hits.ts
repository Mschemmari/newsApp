import {type Hit} from '../types';

type fetchHitsProps = {
  setHits: (hits: Hit[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: any) => void;
};

export const fetchHits = async ({
  setHits,
  setLoading,
  setError,
}: fetchHitsProps) => {
  fetch('https://hn.algolia.com/api/v1/search_by_date?query=mobile')
    .then(async res => await res.json())
    .then(res => {
      setHits(res.hits);
      setLoading(false);
      return JSON.stringify(res.hits);
    })
    .catch(err => {
      setLoading(false);
      setError(err);
    });
};

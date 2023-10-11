import {useState, useEffect} from 'react';
import {type Hit} from '../types';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useHitsData() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [online, setOnline] = useState<boolean | null>(true);

  useEffect(() => {
    const checkNetworkStatus = () => {
      NetInfo.fetch().then(state => {
        setOnline(state.isConnected);
      });
    };

    checkNetworkStatus();

    NetInfo.addEventListener(state => {
      setOnline(state.isConnected);
    });

    if (!online) {
      AsyncStorage.getItem('cachedData')
        .then(data => {
          if (data) {
            setHits(JSON.parse(data));
          }
        })
        .catch(error => {
          setError(error);
        });
    } else {
      setLoading(true);
      setError(null);

      fetch('https://hn.algolia.com/api/v1/search_by_date?query=mobile')
        .then(async res => await res.json())
        .then(res => {
          setHits(res.hits);
          setLoading(false);
          return AsyncStorage.setItem('cachedData', JSON.stringify(res.hits));
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [online]);

  return {hits, loading, error};
}

export default useHitsData;

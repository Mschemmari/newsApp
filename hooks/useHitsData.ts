import {useState, useEffect, useCallback} from 'react';
import {type Hit} from '../types';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchHits} from '../services/hits';

function useHitsData() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [online, setOnline] = useState<boolean | null>(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHits({setHits, setLoading, setError});
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      fetchHits({setHits, setLoading, setError});
    }
  }, [online]);

  return {hits, setHits, loading, error, onRefresh, refreshing};
}

export default useHitsData;

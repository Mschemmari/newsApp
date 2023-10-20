import {useState, useEffect, useCallback} from 'react';
import {type Hit} from '../types';
import NetInfo from '@react-native-community/netinfo';
import {fetchHits} from '../services/hits';
import {getSavedData, saveData} from '../utils/utils';

function useHitsData() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [online, setOnline] = useState<boolean | null>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletedItems, setDeletedItems] = useState<Hit[]>([]);

  const setRefreshedData = async () => {
    const refreshedHits = await fetchHits();
    const deletedHits = await getSavedData('deletedItems');
    if (deletedHits) {
      const filteredHits = refreshedHits.filter((item: Hit) => {
        return !deletedHits.some(
          (deletedItem: Hit) => deletedItem.objectID === item.objectID,
        );
      });
      setHits(filteredHits);
    }
  };

  const loadHits = async () => {
    fetchHits()
      .then(data => {
        setHits(data);
        saveData(data, 'cachedData');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err);
        setLoading(false);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshedData();
    setLoading(false);
    setRefreshing(false);
  }, []);

  const handleDelete = (deletedItem: Hit) => {
    const updatedHits = hits.filter(
      item => item.objectID !== deletedItem.objectID,
    );
    setDeletedItems([...deletedItems, deletedItem]);
    setHits(updatedHits);
    saveData([deletedItem, ...deletedItems], 'deletedItems');
  };
  const retrieveSavedData = async () => {
    const retrievedData = await getSavedData('cachedData');
    setHits(retrievedData);
  };
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
      retrieveSavedData();
    } else {
      setLoading(true);
      setError(null);
      loadHits();
    }
    return () => {
      saveData([], 'deletedItems');
    };
  }, [online]);

  return {hits, setHits, loading, error, onRefresh, refreshing, handleDelete};
}

export default useHitsData;

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';

import {type Hit} from './types';

import WebViewModal from './src/WebViewModal';
import HitItem from './src/HitItem';
import useHitsData from './hooks/useHitsData';

function App() {
  const {hits, setHits, loading, refreshing, onRefresh} = useHitsData();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Hit | null>(null);

  const handleDelete = (rowItem: Hit) => {
    const filteredItems = hits.filter(
      item => item.objectID !== rowItem.objectID,
    );
    setHits(filteredItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          {loading ? (
            <Text>cargandooo</Text>
          ) : (
            <HitItem
              deleteItem={handleDelete}
              setSelectedItem={setSelectedItem}
              setModalVisible={setModalVisible}
              hits={hits}
            />
          )}
          {modalVisible && (
            <WebViewModal
              selectedItem={selectedItem}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default App;

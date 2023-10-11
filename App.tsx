import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import {type Hit} from './types';

import WebViewModal from './src/WebViewModal';
import HitItem from './src/HitItem';
import useHitsData from './hooks/useHitsData';

function App() {
  const {hits, setHits, loading} = useHitsData();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Hit[]>([]);

  const handleDelete = (itemId: number) => {
    const filteredUsers = hits.filter(item => item.story_id !== itemId);
    setHits(filteredUsers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
    marginHorizontal: 20,
    marginVertical: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  webView: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;

import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {type Hit} from '../types';
import {WebView} from 'react-native-webview';

type WebViewModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedItem: Hit | null;
};

const WebViewModal = ({
  modalVisible,
  setModalVisible,
  selectedItem,
}: WebViewModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.arrowStyles}>&lsaquo;</Text>
            <Text style={styles.textStyle}>Back</Text>
          </Pressable>
          {selectedItem?.story_url ? (
            <WebView
              source={{uri: selectedItem?.story_url || ''}}
              style={styles.webView}
            />
          ) : (
            <View style={styles.notAvailable}>
              <Text style={styles.notAvailableText}>
                Sorry this story its not available
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  notAvailable: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  notAvailableText: {
    fontSize: 20,
  },
  buttonClose: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textStyle: {
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  arrowStyles: {
    fontSize: 30,
  },
  buttonContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 45,
    width: '100%',
  },
  webView: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default WebViewModal;

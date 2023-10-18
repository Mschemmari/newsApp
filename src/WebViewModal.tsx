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
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Close Modal</Text>
          </Pressable>
          <WebView
            source={{uri: selectedItem?.story_url || ''}}
            style={styles.webView}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingTop: 25,
    padding: 10,
    height: 50,
  },
  buttonClose: {
    backgroundColor: 'white',
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
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    zIndex: 999,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  webView: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default WebViewModal;

import React from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {type Hit} from '../types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getDate} from './utils';

type HitItemProps = {
  setSelectedItem: (item: Hit | null) => void;
  setModalVisible: (visible: boolean) => void;
  hits: Hit[];
  deleteItem: (item: Hit) => void;
};

const HitItem = ({
  setSelectedItem,
  setModalVisible,
  hits,
  deleteItem,
}: HitItemProps) => {
  return (
    <FlatList
      data={hits}
      renderItem={({item}) => (
        <GestureHandlerRootView style={styles.handlerStyles}>
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity onPress={() => deleteItem(item)}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.button}>Delete</Text>
                </View>
              </TouchableOpacity>
            )}>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                key={item.parent_id}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedItem(item);
                }}>
                <Text style={styles.title}>{item.story_title}</Text>
                <Text>
                  {item.author} {getDate(item.created_at_i)}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemSeparator} />
          </Swipeable>
        </GestureHandlerRootView>
      )}
      keyExtractor={item => item.objectID}
    />
  );
};
const styles = StyleSheet.create({
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  handlerStyles: {
    flex: 1,
  },
  itemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 5,
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor: 'lightgrey',
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  button: {
    color: '#1b1a17',
    fontWeight: '600',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  buttonContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default HitItem;

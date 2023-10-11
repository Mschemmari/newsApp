import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';

const HitItem = ({setSelectedItem, setModalVisible, hits}) => {
  const getDate = (created_at_i: number) => {
    const date = new Date(created_at_i * 1000);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60));
  };
  return (
    <FlatList
      data={hits}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            setModalVisible(true);
            setSelectedItem(item);
          }}>
          <Text style={styles.title}>{item.story_title}</Text>
          <Text>
            {item.author} {getDate(item.created_at_i)} hours ago
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.objectID}
    />
  );
};
const styles = StyleSheet.create({
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
});

export default HitItem;

/**
 * @format
 */

import 'react-native';
import React from 'react';
import HitItem from '../src/HitItem';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Swipeable from 'react-native-gesture-handler/Swipeable';

it('Snapshot renders correctly', () => {
  const item = renderer.create(<HitItem />).toJSON();
  expect(item).toMatchSnapshot();
});

it('renders correctly 2 hits', () => {
  const hitsMock = [
    {
      title: 'Title #1',
      author: 'Mariano',
      story_id: 37922973,
      story_title: 'Story Title #1',
      created_at_i: 1697593568,
      objectID: '37922973',
    },
    {
      title: 'Title #2',
      author: 'Mariano',
      story_id: 37922977,
      story_title: 'Story Title #2',
      created_at_i: 1697593440,
      objectID: '37922977',
    },
  ];

  const hitFlatList = renderer.create(<HitItem hits={hitsMock} />);
  const componentInstance = hitFlatList.root;

  expect(componentInstance.findAllByType(HitItem).length).toBe(1);
  expect(componentInstance.findAllByType(Swipeable).length).toBe(
    hitsMock.length,
  );
});

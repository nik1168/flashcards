import React from 'react';
import {FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Notifications, Permissions} from 'expo';

/**
 * Get Deck Info
 * @param deck
 * @returns {{React: {id: number, title: string, questions: [null,null]}, JavaScript: {id: number, title: string, questions: [null]}}}
 */
export function getDeckInfo (deck) {
  const info = {
    React: {
      id : 1,
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      id:2,
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };

  return typeof deck === 'undefined'
    ? info
    : info[deck]
}
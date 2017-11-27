import {AsyncStorage} from 'react-native';
import {formatDeckResults} from "./_decks";

export const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks';

/**
 * Get all decks from storage
 * @returns {Promise.<TResult>|*}
 */
export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatDeckResults)
}

/**
 * Get a single deck from storage
 * @param title
 * @returns {Promise.<TResult>|*}
 */
export function getDeck(title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatGetDeckResult => title)
}

/**
 * Save a deck
 * @param deck
 * @param title
 * @returns {*}
 */
export function saveDeckTitle({deck, title}) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: deck
  }))
}

/**
 * Add card to a deck
 * @param title
 * @param card
 * @returns {Promise.<TResult>|*}
 */
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      let deck = data[title];
      deck.questions.push(card);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

/**
 * Clear storage
 */
export function clearStorage() {
  return AsyncStorage.clear();
}
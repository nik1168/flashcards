import { AsyncStorage } from 'react-native'
import {formatDeckResults, formatGetDeckResult} from "./_decks";
export const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks'

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function getDeck (title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatGetDeckResult=>title)
}

export function saveDeckTitle ({ deck, title }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: deck
  }))
}

export function addCardToDeck (key) {
  return null;
}
import { AsyncStorage } from 'react-native'
import {formatDeckResults} from "./_decks";
export const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks'

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function getDeck (title) {
  return null;
}

export function saveDeckTitle ({ entry, key }) {
  return null;
}

export function addCardToDeck (key) {
  return null;
}
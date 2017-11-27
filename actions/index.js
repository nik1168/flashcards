export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const GET_DECK = 'GET_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

/**
 * Receive all decks
 * @param decks
 * @returns {{type: string, decks: *}}
 */
export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

/**
 * Adds a specific deck
 * @param deck
 * @returns {{type: string, deck: *}}
 */
export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

/**
 * Adds a specific card
 * @returns {{type: string}}
 */
export function addCard(send) {
  return {
    type: ADD_CARD,
    send,
  }
}

/**
 * Gets a single deck
 * @param deck
 * @returns {{type: string, deck: *}}
 */
export function getSingleDeck (deck) {
  return {
    type: GET_DECK,
    deck,
  }
}
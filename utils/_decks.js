import {getDeckInfo} from "./helpers";
import {AsyncStorage} from 'react-native'
import {FLASHCARDS_STORAGE_KEY} from "./api";

/**
 * Format deck result
 * @param results
 * @returns {*}
 */
export function formatDeckResults(results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

/**
 * Parse deck result
 * @param item
 * @param results
 * @returns {null}
 */
export function formatGetDeckResult(item, results) {
  let parsedResult = JSON.parse(results);
  return parsedResult[item] ? parsedResult[item] : null;

}

/**
 * Set dummy data to init app
 * @returns {{React: {id: number, title: string, questions: (null|null)[]}, JavaScript: {id: number, title: string, questions: null[]}}}
 */
function setDummyData() {
  let dummyData = getDeckInfo();
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData
}
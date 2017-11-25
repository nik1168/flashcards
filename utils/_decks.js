import {getDeckInfo} from "./helpers";
import { AsyncStorage } from 'react-native'
import {FLASHCARDS_STORAGE_KEY} from "./api";

export function formatDeckResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

export function formatGetDeckResult (item,results){
  let parsedResult = JSON.parse(results);
  return parsedResult[item]?parsedResult[item]:null;

}

function setDummyData () {

  let dummyData = getDeckInfo()

  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData
}
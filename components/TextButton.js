import React from 'react'
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native'
import {purple, white, blue} from '../utils/colors'

export default function TextButton({children, onPress, style = {}}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, style]}>
      <Text style={[styles.reset]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
});
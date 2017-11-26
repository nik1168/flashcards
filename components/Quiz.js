import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { AppLoading} from 'expo'

class Quiz extends Component {
  state = {
    ready: true,
  };
  componentDidMount () {
  }
  renderItem = () => (
    <View style={styles.item}>

    </View>
  )
  renderEmptyDate() {
    return (
      <View style={styles.item}>
      </View>
    )
  }
  render() {
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View style={styles.item}>
        Quiz
      </View>
    )
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})
function mapStateToProps (entries) {
  return {
    foo : ''
  }
}
export default connect(
  mapStateToProps,
)(Quiz)
import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import {AppLoading} from 'expo'
import {getDecks} from "../utils/api";
import {receiveDecks} from "../actions/index";

class Decks extends Component {
  state = {
    ready: true,
  }

  componentDidMount() {
    const {dispatch} = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
    // fetch all decks
  }

  renderItem = ({today, ...metrics}, formattedDate, key) => (
    <View style={styles.item}>
      Render item
    </View>
  )

  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        Render Empty
      </View>
    )
  }


  render() {
    const {ready} = this.state;
    const {decks} = this.props;
    const keys = Object.keys(decks);
    if (ready === false) {
      return <AppLoading/>
    }
    return (
      <View>
        {
          keys.map((val, index) => (
            <TouchableOpacity key={index} onPress={() =>
              this.props.navigation.navigate(
                'DeckDetail',
                {deckId: decks[val]['title']}
              )
            }>
              <View style={styles.item}>
                <Text>
                  {decks[val]['title']}
                </Text>
                <Text>
                  Questions : {decks[val]['questions'].length}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        }
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
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)
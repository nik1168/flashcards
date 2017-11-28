import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {gray, white, blue} from '../utils/colors';
import {AppLoading} from 'expo';
import {getDecks} from "../utils/api";
import {receiveDecks} from "../actions/index";

class Decks extends Component {
  //Component's state
  state = {
    ready: true,
  };

  /**
   * Logic when component mounts
   */
  componentDidMount() {
    const {dispatch} = this.props; //get dispatch from props
    getDecks() //Get decks from storage and dispatch action for Redux
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
    //Uncomment to clear all storage, just for testing purposes
    // clearStorage()
    // fetch all decks
  }


  /**
   * Render component
   */
  render() {
    const {ready} = this.state;
    const {decks} = this.props; //decks from storage
    const keys = Object.keys(decks); //keys from main object
    if (ready === false) {
      return <AppLoading/>
    }
    return (
      <View>
        <ScrollView>
          {
            keys.map((val, index) => (

              <TouchableOpacity key={index} onPress={() =>
                this.props.navigation.navigate(
                  'DeckDetail',
                  {deckId: decks[val]['title']}
                )
              }>
                <View style={styles.item}>
                  <Text style={styles.deckTitle}>
                    {decks[val]['title']}
                  </Text>
                  <Text style={styles.textQuestion}>
                    {decks[val]['questions'].length} Cards
                  </Text>
                </View>
              </TouchableOpacity>

            ))
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    // borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 30,
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',

    // alignSelf: 'center',
    // width : '100%',
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
  },
  textQuestion: {
    color: gray,
  },
  deckTitle: {
    fontSize: 18,
  }
});

/**
 * Map state to props
 * @param decks
 * @returns {{decks: *}}
 */
function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)
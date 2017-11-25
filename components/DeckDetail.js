import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableOpacity,Platform } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import {getDeck} from "../utils/api";
import {getSingleDeck} from "../actions/index";
import {purple,white} from "../utils/colors";

function Btn ({ onPress,text }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

class DeckDetail extends Component {
  // componentDidMount() {
  //   const {dispatch,deckId,dispatch} = this.props;
  //   getDeck().then((deck)=>dispatch(getSingleDeck(deck)))
  // }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: deckId+''
    }
  }
  reset = () => {
  }
  shouldComponentUpdate (nextProps) {
    // return nextProps.metrics !== null && !nextProps.metrics.today
  }
  render() {
   let {deck} = this.props;
    return (
      <View style={styles.container}>
        <Text>
          {deck.title}
        </Text>
        {
          deck.questions.length > 0 && (
            <Text>
              {deck.questions.length} card/s
            </Text>
          )
        }
        <Btn onPress={this.submit} text="Add Card" />
        {
          deck.questions.length > 0 && (
            <Btn onPress={this.submit} text="Start Quiz" />
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  }
})

submit = () => {
  //Go to home to reload all the new decks added
  this.toHome()

  //Submit deck from api
}
toHome = () => {
  this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;
  console.log("state");
  console.log(state);

  return {
    deck : state[deckId]
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    getDeck: (deckId) => dispatch(getDeck(deckId)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail)
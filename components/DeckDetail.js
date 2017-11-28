import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import {gray, purple, white, blue} from "../utils/colors";

/**
 * Deck Detail
 */
class DeckDetail extends Component {

  /**
   * Go to Add card component
   */
  addCard = () => {
    const {navigate} = this.props.navigation;
    let {deck} = this.props;
    navigate(
      'AddCard',
      {
        title: deck.title,
        onGoBack: this.onGoBack
      }
    )
  };

  /**
   * Go to quiz component
   */
  startQuiz = () => {
    const {navigate} = this.props.navigation;
    let {deck} = this.props;
    navigate(
      'Quiz',
      {title: deck.title}
    )
  };

  /**
   * Navigation options
   * @param navigation
   * @returns {{title: string}}
   */
  static navigationOptions = ({navigation}) => {
    const {deckId} = navigation.state.params;
    return {
      title: deckId + ''
    }
  };

  /**
   * On go back call back
   */
  onGoBack = () => {
    this.forceUpdate() //re render component
  };

  render() {
    let {deck} = this.props;
    return (
      <View style={[styles.container]}>
        <Text style={styles.title}>
          {deck.title}
        </Text>
        {
          deck.questions.length > 0 && (
            <Text style={styles.subtitle}>
              {deck.questions.length} card/s
            </Text>
          )
        }
        <View style={styles.buttonView}>
          <TextButton onPress={this.addCard} children="Add Card"/>
        </View>
        <View style={styles.buttonView}>
          {
            deck.questions.length > 0 && (
              <TextButton onPress={this.startQuiz} children="Start Quiz"/>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    alignSelf: 'center'
  },
  subtitle: {
    color: gray,
    fontSize: 20,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    // alignItems: 'center',
    // justifyContent : 'space-around'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    color: white
  },
  AndroidSubmitBtn: {
    backgroundColor: blue,
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
  },
  buttonView: {
    paddingTop: 30
  }
});

/**
 * Map state to props
 * @param state
 * @param navigation
 * @returns {{deck: *}}
 */
function mapStateToProps(state, {navigation}) {
  const {deckId} = navigation.state.params;
  return {
    deck: state[deckId]
  }
}

export default connect(
  mapStateToProps
)(DeckDetail)
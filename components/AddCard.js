import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {addCard} from '../actions';
import {purple, white} from '../utils/colors';
import {addCardToDeck} from "../utils/api";
import SubmitBtn from "./SubmitButton";


/**
 * Add Card
 */
class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Add Card'
    }
  };

  /**
   * Logic to submit card
   */
  submit = () => {
    let {deck} = this.props; // Get deck from props
    const {question, answer} = this.state; //Question and answer from state
    let card = {question, answer};
    addCardToDeck(deck, card)
      .then(() => {
        //Go to home to reload all the new decks added
        let send = {deck, card};
        this.props.dispatch(addCard(send));
        this.props.navigation.state.params.onGoBack();
        this.toHome()
      })
  };

  /**
   * Go to home
   */
  toHome = () => {
    const {navigate} = this.props.navigation;
    this.props.navigation.goBack();
    // this.props.navigation.dispatch(NavigationActions.back())
    // navigate('Decks')
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder="Question"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          placeholder="Answer"
        />
        <SubmitBtn onPress={this.submit}/>
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
  },
});

/**
 * Map state to props
 * @param state
 * @param navigation
 * @returns {{deck}}
 */
function mapStateToProps(state, {navigation}) {
  const {title} = navigation.state.params;
  return {
    deck: title
  }
}

export default connect(
  mapStateToProps
)(AddCard)
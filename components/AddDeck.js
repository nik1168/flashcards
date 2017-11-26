import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TextButton from './TextButton';
import {connect} from 'react-redux';
import {addDeck} from '../actions';
import {purple, white} from '../utils/colors';
import {NavigationActions} from 'react-navigation';
import {saveDeckTitle} from "../utils/api";

/**
 * Submit button component
 * @param onPress
 * @returns {XML}
 * @constructor
 */
function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

/**
 * Add Deck Component
 */
class AddDeck extends Component {
  state = {
    title: '',
  };

  /**
   * Submit new deck
   */
  submit = () => {
    const {dispatch} = this.props; //get dispatch from props
    //Submit deck from api
    const {title} = this.state;
    let deck = {
      title,
      questions:[]
    };
    saveDeckTitle({deck,title})
      .then(() => {
        dispatch(addDeck({
          [title]: deck
        }));
        //Go to home to reload all the new decks added
        this.toHome();
      })
  };

  /**
   * Go to decks
   */
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          What is the title of your new deck??
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder="Deck Title"
        />
        <SubmitBtn onPress={this.submit} />
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
 * @returns {{foo: string}}
 */
function mapStateToProps (state) {
  return {
    foo: 'foo'
  }
}

export default connect(
  mapStateToProps
)(AddDeck)
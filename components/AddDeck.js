import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {addDeck} from '../actions';
import {purple, white, blue} from '../utils/colors';
import {saveDeckTitle} from "../utils/api";
import SubmitBtn from "./SubmitButton";

/**
 * Add Deck Component
 */
class AddDeck extends Component {
  /**
   * State of component
   * @type {{title: string}}
   */
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
    if (title.length > 0) {
      let deck = {
        title,
        questions: []
      };
      saveDeckTitle({deck, title})
        .then(() => {
          dispatch(addDeck({
            [title]: deck
          }));
          //Go to deck detail
          this.toDeck(title);
        })
    }
    else {
      alert('Name empty');
    }

  };

  /**
   * Go to deck detail based on a title
   */
  toDeck = (title) => {
    this.props.navigation.navigate(
      'DeckDetail',
      {deckId: title}
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          What is the title of your new deck??
        </Text>
        <View style={{paddingTop: 20}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder="Deck Title"
          />
        </View>
        <View style={{paddingTop: 20}}>
          <SubmitBtn onPress={this.submit}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: 'center'
  },
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
function mapStateToProps(state) {
  return {
    foo: 'foo'
  }
}

export default connect(
  mapStateToProps
)(AddDeck)
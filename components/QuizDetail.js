import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {white, red, green, blue} from '../utils/colors';
import TextButton from "./TextButton";

/**
 * Quiz Detail
 */
class QuizDetail extends Component {
  /**
   * Component's state
   * @type {{ready: boolean, question: boolean}}
   */
  state = {
    ready: true,
    question: true
  };

  /**
   * Handle Question button
   */
  handleQuestion = () => {
    this.setState(() => ({question: !this.state.question}))
  };

  /**
   * Handle click button for answer
   * @param id
   * @param answer
   */
  handleClick = (id, answer) => {
    const {handleAnswer} = this.props;
    handleAnswer(id, answer);
  };

  render() {
    const {length, quiz, onPress} = this.props;
    const {question} = this.state;
    return (
      <View style={{padding: 5}}>
        <Text style={{fontSize: 15}}>
          {
            (quiz.id + 1) + '/' + length
          }
        </Text>
        <View style={styles.item}>

          {
            question && (
              <View>
                <Text style={styles.questionText}>
                  {
                    quiz.question
                  }
                </Text>
              </View>
            )
          }
          {
            !question && (
              <View>
                <Text style={styles.answerText}>
                  {
                    quiz.answer
                  }
                </Text>
              </View>
            )
          }
        </View>


        <View style={{paddingTop: 20}}>
          {
            question && (
              <View style={{paddingTop: 20}}>
                <TextButton onPress={this.handleQuestion} children="Answer"/>
              </View>
            )
          }
          {
            !question && (
              <View style={{paddingTop: 20}}>
                <TextButton onPress={this.handleQuestion} children="Question"/>

              </View>
            )
          }
          <View style={{paddingTop: 20}}>
            <TextButton style={{backgroundColor: green}} onPress={() => {
              this.handleClick(quiz.id, true)
            }} children="Correct"/>
          </View>
          <View style={{paddingTop: 20}}>
            <TextButton style={{backgroundColor: red}} onPress={() => {
              this.handleClick(quiz.id, false)
            }} children="Incorrect"/>
          </View>

        </View>
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
  },
  questionText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  answerText: {
    fontSize: 25,
    alignSelf: 'center'
  }
});

export default QuizDetail
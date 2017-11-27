import React, {Component} from 'react';
import {Text, View} from 'react-native';
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
      <View>
        <Text>
          {
            (quiz.id + 1) + '/' + length
          }
        </Text>
        {
          question && (
            <Text>
              {
                quiz.question
              }
            </Text>
          )
        }
        {
          !question && (
            <Text>
              {
                quiz.answer
              }
            </Text>
          )
        }
        {
          question && (
            <TextButton onPress={this.handleQuestion} children="Answer"/>
          )
        }
        {
          !question && (
            <TextButton onPress={this.handleQuestion} children="question"/>
          )
        }
        <TextButton onPress={() => {
          this.handleClick(quiz.id, true)
        }} children="Correct"/>
        <TextButton onPress={() => {
          this.handleClick(quiz.id, false)
        }} children="Incorrect"/>

      </View>
    )
  }
}

export default QuizDetail
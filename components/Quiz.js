import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {white} from '../utils/colors';
import TextButton from "./TextButton";
import QuizDetail from "./QuizDetail";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";

/**
 * Quiz
 */
class Quiz extends Component {
  state = {
    ready: true,
    correct: 0,
    show: 0,
    result: false
  };

  /**
   * Handle click
   * @param id
   * @param answer
   */
  handleClick = (id, answer) => {
    const {questions} = this.props;
    let copy = {...this.state};
    copy.correct = answer ? copy.correct + 1 : copy.correct;
    copy.show++;
    this.setState(
      {
        correct: copy.correct,
        show: copy.show,
        result: (id + 1) === questions.length
      }
    );
    if ((id + 1) === questions.length) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
  };

  /**
   * Restart quiz
   */
  restartQuiz = () => {
    this.setState(
      {
        ready: true,
        correct: 0,
        show: 0,
        result: false
      }
    )
  };

  /**
   * Go back to deck
   */
  backToDeck = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {ready, show, result, correct} = this.state;
    const {questions} = this.props;
    let mappedQuestions = [...questions];
    mappedQuestions.map((question, index) => question.id = index);

    return (
      <View>
        {
          mappedQuestions.map((question, index) => (
            <View key={index}>
              {
                (show === question.id) && (
                  <View>
                    <View>
                      <QuizDetail quiz={question} handleAnswer={this.handleClick} length={mappedQuestions.length}/>
                    </View>
                    <View>

                    </View>
                  </View>

                )
              }
            </View>
          ))
        }
        {
          result && (
            <View style={{padding: 10}}>
              <Text style={styles.title}>Correct Answers</Text>
              <Text style={styles.title}>
                {
                  // correct + '/' + questions.length
                  // ((correct/questions.length)*100)+'%'
                  Math.round(((correct / questions.length) * 100 * 100) / 100) + '%'
                }
              </Text>
              <View>
                <View style={{paddingTop: 20}}>
                  <TextButton onPress={() => {
                    this.restartQuiz()
                  }} children="Restart Quiz"/>
                </View>
                <View style={{paddingTop: 20}}>
                  <TextButton onPress={() => {
                    this.backToDeck()
                  }} children="Back to Deck"/>
                </View>

              </View>

            </View>
          )
        }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: 'center'
  }
});

/**
 * Map state to props
 * @param state
 * @param navigation
 * @returns {{questions: (*|Array)}}
 */
function mapStateToProps(state, {navigation}) {
  const {title} = navigation.state.params;
  return {
    questions: state[title].questions
  }
}

export default connect(
  mapStateToProps,
)(Quiz)
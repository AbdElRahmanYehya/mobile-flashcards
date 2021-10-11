import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { purple, white } from '../utils/colors'
import { showEntries, removeEntry, addQuestion, showEntries2, DECKS_STORAGE_KEY } from '../utils/api'


class Quiz extends React.Component{
state = {
		correct: 0,
		inCorrect: 0,
		count: 0,
		answer: false,
	}
addCorrect = () => {
	const {correct, count} = this.state
	this.setState(() => ({
				correct: correct + 1,
				count: count + 1,
				answer: false,
			}))
	}
addIncorrect = () => {
	const {inCorrect, count} = this.state
	this.setState(() => ({
				inCorrect: inCorrect + 1,
				count: count + 1,
				answer: false,
			}))
	}
restartQuiz = () => {
	this.setState(() => ({
				correct: 0,
				inCorrect: 0,
				count: 0,
				answer: false,
			}))
	}
showAnswer = () => {
	this.setState(() => ({
				answer: true,
			}))
	}
render() {
		return (
			<View>
				{
					this.state.count < this.props['route'].params.questions.questions.length
					?<View>
						{
							this.state.answer === false
							?<Text style={styles.decks}>{this.props['route'].params.questions.questions[this.state.count].question}</Text>
							:<Text style={styles.decks}>{this.props['route'].params.questions.questions[this.state.count].answer}</Text>
						}
						<TouchableOpacity
						 onPress={this.showAnswer}>
							<Text style={styles.answerBtnText}>Answer</Text>
						</TouchableOpacity>
						<TouchableOpacity
						 style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.androidCorrectBtn}
					     onPress={this.addCorrect}>
							<Text style={styles.submitBtnText}>Correct</Text>
						</TouchableOpacity>
						<TouchableOpacity
						 style={Platform.OS === 'ios' ? styles.iosIncorrectBtn : styles.androidIncorrectBtn}
					     onPress={this.addIncorrect}>
							<Text style={styles.submitBtnText}>Inorrect</Text>
						</TouchableOpacity>
						<Text style={styles.decks}>{this.state.count} / { this.props['route'].params.questions.questions.length}</Text>
					 </View>
					:<View>
						<Text style={styles.decks}>{this.state.correct} / {this.state.count}</Text>
						<TouchableOpacity
						 style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
					     onPress={this.restartQuiz}>
							<Text style={styles.submitBtnText}>Restart Quiz</Text>
						</TouchableOpacity>
						<TouchableOpacity
						 style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
					     onPress={() => this.props.navigation.goBack()}>
							<Text style={styles.submitBtnText}>Back to Deck</Text>
						</TouchableOpacity>
					 </View>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height :45,
		marginLeft: 40,
		marginRight: 40,
	},
	androidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 2,
		height :45,
		marginLeft: 30,
		marginRight: 30,
		alignSelf: 'flex-end',
		justifyContent: 'center',
	},
    iosCorrectBtn: {
		backgroundColor: 'green',
		padding: 10,
		borderRadius: 7,
		height :45,
		marginLeft: 40,
		marginRight: 40,
	},
	androidCorrectBtn: {
		backgroundColor: 'green',
		padding: 10,
		borderRadius: 2,
		height :45,
		marginLeft: 30,
		marginRight: 30,
		alignSelf: 'flex-end',
		justifyContent: 'center',
	},
	iosIncorrectBtn: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 7,
		height :45,
		marginLeft: 40,
		marginRight: 40,
	},
	androidIncorrectBtn: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 2,
		height :45,
		marginLeft: 30,
		marginRight: 30,
		alignSelf: 'flex-end',
		justifyContent: 'center',
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
	answerBtnText: {
		color: 'red',
		fontSize: 22,
		textAlign: 'center',
	},
	decks: {
		color: 'black',
		fontSize: 40,
		textAlign: 'center',
	},
	cards: {
		color: 'grey',
		fontSize: 30,
		textAlign: 'center',
	},
});

export default  Quiz
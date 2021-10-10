import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { addQuestion } from '../utils/api'

class NewQuestion extends React.Component{
	state = {
		question: '',
		answer: '',
	}
	submit = (e) => {
		e.preventDefault()
		const { question, answer } = this.state
		const key = this.props['route'].params.entryId.id
		addQuestion(key, question, answer)
	}
	changeQuestionText = (e) => {
		const question = e
		//console.log(text)
		this.setState(() => ({
			question
		}))
	}
	changeAnswerText = (e) => {
		const answer = e
		//console.log(text)
		this.setState(() => ({
			answer
		}))
	}
	render() {
		//console.log(this.props['navigation'].getState())
		console.log('from new question',this.props['route'].params.entryId.id)
		return (
			<View>
				<Text>New Question</Text>
				<Text>{this.props['route'].params.entryId.id}</Text>
			    <TextInput
			        style={styles.input}
			        onChangeText={this.changeQuestionText}
			        placeholder="Question"
			      />
			    <TextInput
			        style={styles.input}
			        onChangeText={this.changeAnswerText}
			        placeholder="Answer"
			      />
			    <TouchableOpacity 
			      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			      	onPress={this.submit}>
						<Text style={styles.submitBtnText}>Add Question</Text>
				</TouchableOpacity>
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
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
});

export default  NewQuestion
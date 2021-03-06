import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { purple, white } from '../utils/colors'
import { showEntries, removeEntry, addQuestion, getEntry, showEntries2, DECKS_STORAGE_KEY } from '../utils/api'


class DeckList extends React.Component{
//const a = this.props['route'].params.entryId.key
state = {
	deckInfo: {
		title: '',
		questions: []
	}
}
async componentDidMount() {
  		const entries = await showEntries()
		var temp = JSON.parse(entries)
		this.setState(() => ({
			datakeys: temp,
			deckInfo: getEntry(this.props['route'].params.entryId.key)
		}))
  	}
handleRefresh = async () => {
		const entries = await showEntries()
		this.setState(() => ({
			deckInfo: getEntry(this.props['route'].params.entryId.key)
		}))
	}
render() {
	const id = this.props['route'].params.entryId.key
	const questions = this.state.deckInfo.questions
		return (
			<View>
				<Text style={styles.decks} >{this.props['route'].params.entryId.key}</Text>
				<Text style={styles.cards} >Number of cards: {this.state.deckInfo.questions.length}</Text>
				<TouchableOpacity 
			      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			      	onPress={() => this.props.navigation.navigate('Quiz', {entryId: {id} , questions: {questions}})}>
						<Text style={styles.submitBtnText}>Start Quiz</Text>
				</TouchableOpacity>
				<TouchableOpacity 
			      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			      	onPress={() => this.props.navigation.navigate('NewQuestion', {entryId: {id}})}>
						<Text style={styles.submitBtnText}>Add New Question</Text>
				</TouchableOpacity>
				<TouchableOpacity 
			      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			      	onPress={this.handleRefresh}>
						<Text style={styles.submitBtnText}>Refresh</Text>
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
	},
	submitBtnText: {
		color: white,
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

export default  DeckList
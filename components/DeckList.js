import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, AsyncStorage } from 'react-native'
import { purple, white } from '../utils/colors'
import { showEntries } from '../utils/api'

class DeckList extends React.Component{
	async componentDidMount() {
  		const entries = await showEntries()
		var temp = JSON.parse(entries)
		this.setState(() => ({
			datakeys: temp,
		}))
  	}
	state = {
		datakeys: {},
	}

	submit = async () => {
		const entries = await showEntries()
		var temp = JSON.parse(entries)
		this.setState(() => ({
			datakeys: temp,
		}))
	}

	render() {
		const db = showEntries()
		return (
			<ScrollView style={styles.container}>
			{
				this.state.datakeys !== undefined && this.state.datakeys !== null
				?<View>
					{
					Object.keys(this.state.datakeys).map((key) => {
					const card = JSON.stringify(this.state.datakeys[key].questions.length)
					const questions = this.state.datakeys[key].questions
					return (
						<TouchableOpacity key={key}  onPress={() => this.props.navigation.navigate('IndividualDeck', {entryId: {key}, card: {card}, questions:{questions} })}>
							<Text style={styles.decks} >{JSON.stringify(this.state.datakeys[key].title)}</Text>
							<Text style={styles.cards} >Number of cards: {JSON.stringify(this.state.datakeys[key].questions.length)}</Text>
						</TouchableOpacity>
					)})
					}
					<TouchableOpacity 
				      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
				      	onPress={this.submit}>
							<Text style={styles.submitBtnText}>Refresh</Text>
					</TouchableOpacity>
				</View>
				:<View>
					<Text style={styles.decks} >You dont have any decks yet!</Text>
					<TouchableOpacity 
				      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
				      	onPress={this.submit}>
							<Text style={styles.submitBtnText}>Refresh</Text>
					</TouchableOpacity>
				</View>
			}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
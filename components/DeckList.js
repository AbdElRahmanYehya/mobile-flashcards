import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { purple, white } from '../utils/colors'
import { showEntries, removeEntry, addQuestion, showEntries2, DECKS_STORAGE_KEY } from '../utils/api'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator  } from '@react-navigation/stack'

const Stack = createStackNavigator();


class DeckList extends React.Component{
	async componentDidMount() {
  		const entries = await showEntries()
		var temp = JSON.parse(entries)
		this.setState(() => ({
			datakeys: temp,
		}))
  		//this.forceUpdate()
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
		console.log('xz',this.state)
		return (
			<View>
				<Text>Deck list</Text>
				<TouchableOpacity 
			      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			      	onPress={this.submit}>
						<Text style={styles.submitBtnText}>Create Deck</Text>
				</TouchableOpacity>
						{
							Object.keys(this.state.datakeys).map((key) => {
								return (
									<TouchableOpacity key={key}  onPress={() => this.props.navigation.navigate('IndividualDeck', {entryId: {key}})}>
										<Text style={styles.decks} >{JSON.stringify(this.state.datakeys[key].title)}</Text>
										<Text style={styles.cards} >{JSON.stringify(this.state.datakeys[key].questions.length)} cards</Text>
									</TouchableOpacity>
							)})
						}
				<Text>{JSON.stringify(this.state.datakeys['saba3a'])}</Text>
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
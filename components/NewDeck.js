import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { submitEntry } from '../utils/api'

class NewDeck extends React.Component{
	state = {
		text: '',
	}
	submit = () => {
		const key = this.state.text
		submitEntry({ key })
		
		this.props.navigation.navigate('IndividualDeck', {
              entryId: {key}
   		})
	}
	chenageFirstText = (e) => {
		const text = e
		this.setState(() => ({
			text
		}))
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>What is the title of your new deck?</Text>
				<TextInput
			        style={styles.input}
			        onChangeText={this.chenageFirstText}
			        placeholder="Deck Title"
			      />
			      <TouchableOpacity 
			      	style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			      	onPress={this.submit}>
						<Text style={styles.submitBtnText}>Create Deck</Text>
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
});

export default  NewDeck
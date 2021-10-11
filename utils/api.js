import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'
var deckDatabase;

export function submitEntry ({ key }) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[key]: {
        title: key,
        questions: []
      },
	}))
}

export async function showEntries () {
	const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
	deckDatabase =  JSON.parse(value)
	return value
}

export function getEntry (id) {
	return deckDatabase[id]
}

export function removeEntry (key) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[key] = undefined
			delete data[key]
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
		})
}

export function addQuestion (key, question, answer) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[key].questions.push({
				question: question,
				answer: answer,
			})
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
		})
}

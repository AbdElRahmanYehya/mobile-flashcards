import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'

export function submitEntry ({ key }) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[key]: {
        title: key,
        questions: []
      },
	}))
}

export async function showEntries () {
	// const key = 'sad'
	// const entry = 'bad'
	// AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
	// 	[key]: entry,
	// }))
	const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
	
	let newArray = value.slice();
	console.log('dsss',value)
	console.log('dsss',value[4])
	const temp = await AsyncStorage.getAllKeys()
	console.log(temp)
	return value
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
	//const question = 'mfrod da el so2al el 7id5lo'
	//const answer = 'mfrod da el gwab'
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			// data = {
			// 	...data,
			// 	[key]: {
			// 		...deck[name],
			// 		questions: deck[name].questions.concat([{ question, answer }])
			// 	}
			// }
			data[key].questions.push({
				question: question,
				answer: answer,
			})
			console.log('hereee',data)
			//delete data[key]
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
		})
}

export function showEntries2 () {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)

			console.log('hereee',data)
			return Object.keys(data)
		})
}
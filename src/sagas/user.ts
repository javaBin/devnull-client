import { Actions } from 'actions'
import { USER_KEY } from 'consts'
import { initialState } from 'reducers/user'
import { put, select, takeEvery } from 'redux-saga/effects'
import { State, User } from 'types'
import { LocalStorage } from 'utils'
import uuid from 'uuid'

export default function* () {
	yield takeEvery(Actions.loadUser.type, loadUser)
	yield takeEvery(Actions.generateUser.type, generateUser)

	yield takeEvery([
		Actions.loadUserSuccess.type,
		Actions.submitFeedbackSuccess.type,
		Actions.toggleTalks.type
	], save)
}

function* loadUser (action: typeof Actions.loadUser) {
	const user = window.localStorage.getItem(USER_KEY)
	if (user)
		yield put(Actions.loadUserSuccess(JSON.parse(user)))
	else
		yield put(Actions.generateUser())
}

function* generateUser (action: typeof Actions.generateUser) {
	const user = {
		...initialState,
		id: uuid()
	}
	LocalStorage.set<User>(USER_KEY, user)
	yield put(Actions.loadUserSuccess(user))
}

function* save () {
	const user: User = yield select<State>(s => s.user)
	LocalStorage.set<User>(USER_KEY, user)
}

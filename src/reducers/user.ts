import { Action } from 'actions'
import { User } from 'types'

// Should immediately be overwritten by Actions.loadUser
export const initialState: User = {
	id: '',
	feedbacks: [],
	hideTalks: true
}

export default function (state: User = initialState, action: Action): User {
	switch (action.type) {
		case 'SUBMIT_FEEDBACK_SUCCESS':
			return {
				...state,
				feedbacks: [...new Set(state.feedbacks.concat(action.meta))]
			}
		case 'USER_LOAD_SUCCESS':
			return action.payload
		case 'TOGGLE_TALKS':
			return {
				...state,
				hideTalks: action.payload
			}
		default:
			return state
	}
}

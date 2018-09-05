import { Omit } from 'react-redux'

export interface Session {
	/**
	 *  The ID of the session
	 */
	sessionId: string
	/**
	 *  Title of the talk
	 */
	title: string
	/**
	 *  The full description of the talk
	 */
	abstract: string
	/**
	 *  Who the speaker wants to come see their talk
	 */
	intendedAudience: string
	/**
	 *  Language of the talk. Can be one of "no", "en"
	 */
	language: string
	/**
	 * The format of the talk. Can be one of "presentation", "lightning-talk", "workshop"
	 */
	format: 'presentation' | 'lightning-talk' | 'workshop'
	/**
	 *  Difficulty level of the talk. Can be one of "beginner", "intermediate", "advanced"
	 */
	level: 'beginner' | 'intermediate' | 'advanced'
	/**
	 *  Keywords classifying the talk
	 */
	keywords: string[]
	/**
	 *  A list of speakers for the talk
	 */
	speakers: string
}

export interface Speaker {
	/**
	 *  Name of the speaker
	 */
	name: string
	/**
	 *  What the speaker said about him/herself
	 */
	bio: string
	/**
	 *  The speakers Twitter account
	 */
	twitter: string
	/**
	 *  Url to a picture of the speaker
	 */
	picture: string
}

export type Rating = 0 | 1 | 2 | 3 | 4 | 5 | number

export interface Feedback {
	overall: Rating,
	relevance: Rating,
	content: Rating,
	quality: Rating,
	comments?: string
}

export interface Event {
	name: string
	id: string
	slug: string
}

export interface FeedbackResult {
	online: Omit<Feedback, 'comments'> & {count: 0.0}
	paper: {
		green: number
		yellow: number
		red: number
	}
	participants: number
}

export type FeedbackResponse = {
	session: FeedbackResult
	conference: FeedbackResult
	comments: string[]
}
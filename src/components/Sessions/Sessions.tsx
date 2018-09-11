import { Actions } from 'actions'
import { Button, ButtonGroup } from 'components/Button'
import SessionCard from 'components/SessionCard'
import { CURRENT_JZ } from 'consts'
import React from 'react'
import { connect } from 'react-redux'
import { SessionFilter, State as ReduxState } from 'types'
import { DateDiff, filterSessions, getDay, groupBy } from 'utils'
import RatedSessions from './RatedSessions'
import SessionsByDate from './SessionsByDate'

import css from './Sessions.scss'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

type State = {
	filter: SessionFilter
}

class Sessions extends React.Component<Props, State> {
	state = {
		filter: SessionFilter.open
	}

	componentDidMount () {
		this.props.fetchSessions(CURRENT_JZ)
	}

	render () {
		const { sessions: { sessions: seshs, status }, user } = this.props
		const { filter } = this.state
		const sessions = user.hideTalks
			? seshs && seshs.filter(sesh => sesh.format === 'workshop')
			: seshs || []
		switch (status) {
			case 'loading': return (
				<h1>Loading...</h1>
			)
			case 'error': return (
				<h1>Not able to fetch talks</h1>
			)
			case 'success': return  (
				<div className={css.sessions}>
					<h1>Sessions</h1>
					<ButtonGroup>
						<Button active={filter === SessionFilter.open} onClick={() => this.setState({ filter: SessionFilter.open })}>Recent</Button>
						{/* disabling due to bug with devnull <Button active={filter === SessionFilter.mine} onClick={() => this.setState({ filter: SessionFilter.mine })}>Mine</Button> */}
						<Button active={filter === SessionFilter.all} onClick={() => this.setState({ filter: SessionFilter.all })}>All</Button>
					</ButtonGroup>
					{filter === SessionFilter.open ? (
						<SessionsByDate sessions={filterSessions(sessions, user, this.state.filter)
							.filter(sesh => new DateDiff(new Date(), sesh.endTime).hours() <= 1)
							.sort(({ startTime: a }, { startTime: b }) =>  a > b ? 1 : a < b ? -1 : 0)}
						/>
					) : filter === SessionFilter.all ? (
						<ul>
							{groupBy(
								filterSessions(sessions, user, filter)
									.sort(({ startTime: a }, { startTime: b }) =>  a > b ? 1 : a < b ? -1 : 0)
									.map(sesh => ({
										...sesh,
										day: getDay(sesh.startTime.getDay())
									})),
								'day'
							).map(([key, values]) => (
								<React.Fragment key={key}>
									<h2>{key}</h2>
									<SessionsByDate sessions={values} heading={<h3 />} />
								</React.Fragment>
							))}
						</ul>
					) : filter === SessionFilter.mine && (
						<RatedSessions sessions={filterSessions(sessions, user, filter)} />
					)}
				</div>
			)
		}
	}
}

const mapStateToProps = (state: ReduxState) => ({
	user: state.user,
	sessions: state.sessions
})

const dispatchToProps = {
	fetchSessions: Actions.fetchSessions
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Sessions)

import SessionCard from 'components/SessionCard'
import * as React from 'react'
import { Session } from 'types'

type Props = {
	sessions: Session[]
}

const RatedSessions: React.SFC<Props> = ({ sessions }) => (
	sessions.length > 0 ? (
		<ul style={{ marginTop: '1rem' }}>
			{sessions.map(sesh => (
				<li key={sesh.sessionId}>
					<SessionCard session={sesh}/>
				</li>
			))}
		</ul>
	) : (
		<h3>You have not left feedback on any sessions yet.</h3>
	)
)

export default RatedSessions

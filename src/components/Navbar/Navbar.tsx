import { Actions } from 'actions'
import Button from 'components/Button'
import { BASE_URL } from 'consts'
import React from 'react'
import { Link } from 'react-router-dom'
import { State } from 'types'

import { connect } from 'react-redux'
import './navbar.scss'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

const Navbar: React.SFC<Props> = ({ hideTalks, toggleTalks }) => {
	return (
		<header>
			<nav>
				<ul>
					<li><Link to={BASE_URL}>dev/null</Link></li>
				</ul>
				<Button onClick={() => toggleTalks(!hideTalks)}>
					{hideTalks ? 'Show' : 'Hide'} talks
				</Button>
			</nav>
		</header>
	)
}

const mapStateToProps = (state: State) => ({
	hideTalks: state.user.hideTalks
})

const dispatchToProps = { toggleTalks: Actions.toggleTalks }

export default connect(
	mapStateToProps,
	dispatchToProps
)(Navbar)

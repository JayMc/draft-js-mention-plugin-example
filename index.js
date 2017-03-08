import React, { Component } from 'react';
import { render } from 'react-dom';
import 'draft-js-mention-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved
import SimpleMentionEditor from './SimpleMentionEditor';
// import RemoteMentionEditor from './RemoteMentionEditor';
// import BasicMentionEditor from './BasicMentionEditor';

class Main extends Component {
	render () {
		return (
			<div>
				<SimpleMentionEditor />
				{/* <RemoteMentionEditor /> */}
				{/*<BasicMentionEditor />*/}
			</div>
		)
	}
}

render(<Main />, document.getElementById('app'));

export default Main;

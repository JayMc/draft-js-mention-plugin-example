import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import mentions from './mentions';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export default class BasicMentionEditor extends Component {

	constructor(props) {
		super(props)
		this.state = {
			editorState: EditorState.createEmpty(),
			suggestions: mentions,
		};
	}

	foo() {
		console.log('foo');
	}

	onChange(editorState) {
		this.setState({
			editorState,
		});
	};

	render () {
		return (
			<div onClick={this.foo}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
        <MentionSuggestions
          onSearchChange={this.foo}
          suggestions={this.state.suggestions}
          onAddMention={this.foo}
        />
      </div>
		)
	}
}

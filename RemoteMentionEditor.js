import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
// import editorStyles from './editorStyles.css';
import { fromJS } from 'immutable';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export default class RemoteMentionEditor extends Component {

	constructor(props) {
		super(props)
		this.state = {
			editorState: EditorState.createEmpty(),
			suggestions: fromJS([]),
		};

		this.onChange = this.onChange.bind(this)
		this.onSearchChange = this.onSearchChange.bind(this)
		this.onAddMention = this.onAddMention.bind(this)
		this.focus = this.focus.bind(this)
	}

  onChange(editorState) {
		console.log('onChange',editorState);
    this.setState({
      editorState,
    });
  };

  onSearchChange ({ value }) {
    // An import statment would break server-side rendering.
    require('whatwg-fetch'); // eslint-disable-line global-require

    // while you normally would have a dynamic server that takes the value as
    // a workaround we use this workaround to show different results
    let url = '/data/mentionsA.json';
    if (value.length === 1) {
      url = '/data/mentionsB.json';
    } else if (value.length > 1) {
      url = '/data/mentionsC.json';
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          suggestions: fromJS(data),
        });
      });
  };

  onAddMention (mention) {
		console.log('onAddMention', mention);
    // get the mention object selected
  }

  focus () {
    // this.editor.focus();
  };

  render() {
    return (
      <div onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref="editor"
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}

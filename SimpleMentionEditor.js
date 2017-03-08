import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import { convertToRaw } from 'draft-js';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import customSuggestionsFilter from './customSuggestionsFilter';
// import editorStyles from './editorStyles.css';
import mentions from './mentions';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

export default class SimpleMentionEditor extends Component {

	constructor(props) {
		super(props)
		this.state = {
			editorState: EditorState.createEmpty(),
			suggestions: mentions,
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
		const convertedState = convertToRaw(editorState.getCurrentContent());
		// console.log('convertToRaw',convertedState);

		// get the mentions
		const mentions = Object.keys(convertedState.entityMap).map(en => {
			if (convertedState.entityMap[en].type === 'mention') {
				return convertedState.entityMap[en].data.mention._root.entries;
			}
		})
		console.log('mentions',mentions);
  };

  onSearchChange ({ value }) {
		console.log('onSearchChange',value);
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
      // suggestions: [{
		  //   name: 'Matthew Russell',
		  //   link: 'https://twitter.com/mrussell247',
		  //   avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
		  // }],
    });
  };

  onAddMention (mention) {
		console.log('onAddMention', mention);
    // get the mention object selected
  }

  focus () {
		console.log('focus');
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

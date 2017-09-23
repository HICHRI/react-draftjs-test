/**
 * Created by hichri on 8/17/17.
 */

import React from 'react';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import mentions from './mentions'; // users to be mentioned
import mentions2 from './mentions2'; // same list with extra XXX just to simulate different list triggered by a different caracter $



const hashtagPlugin = createHashtagPlugin();
const mentionPlugin2 = createMentionPlugin();
const mentionPlugin3 = createMentionPlugin({ mentionTrigger: '$' , mentionPrefix: '$' });
const MentionSuggestions2 = mentionPlugin3.MentionSuggestions;




// convert the raw state back to a useable ContentState object
// const contentState = convertFromRaw( JSON.parse( rawDraftContentState) );

class Wall extends React.Component{
    constructor(props){
        super(props);
        this.state = {render:'', userName:this.props.userName, userArticle:this.props.userArticle};
        var _onSaveClick = this._onSaveClick.bind(this);
        var _onCancelClick = this._onCancelClick.bind(this);
    }
    _onSaveClick(newEditedText) {
        this.setState({userArticle: newEditedText, render: ''})
    }
    _onCancelClick(newEditedText) {
        this.setState({ render: ''})
    }
    _onEdit(compName, e){
        this.setState({render:compName});
    }
    _renderSubComp(){ // in case of multiple components to be rendered -edit -share - delete -etc

        if (this.state.render === "DraftEditMode") {
            var _onSaveClick =   this._onSaveClick;
            var _onCancelClick =   this._onCancelClick;
            return <DraftEditMode textToEdit={this.state.userArticle} _onSaveClick = {_onSaveClick.bind(this)} _onCancelClick = {_onCancelClick.bind(this)}/>;
        }
    }
    render(){
        return(
            <div className="Wall">
                <div className="user-name">
                    <b>{this.state.userName}</b>

                </div>
                <div className="user-article">
                    {this.state.userArticle}
                </div>
                <button  onClick={this._onEdit.bind(this, 'DraftEditMode')}>Edit your article</button>
                {this._renderSubComp()}
            </div>

        )
    }
};


class DraftEditMode extends React.Component{
    constructor(props) {
        super(props);

        this.state = {editorState: EditorState.createWithContent(convertFromRaw( JSON.parse( props.textToEdit) )), suggestions: mentions};
        this.onChange = (editorState) => this.setState({editorState: editorState});
        this.onSearchChange = ({ value }) => this.setState({suggestions: defaultSuggestionsFilter(value, mentions)});
        this.onSearchChangeC = ({ value }) => this.setState({suggestions: defaultSuggestionsFilter(value, mentions2)});
        this.onAddMention = (obj) => this.setState({pageHeader: obj});
        this.focus = () => this.editor.focus();
        this.mentionPlugin = createMentionPlugin();

    }


    render(){
        var _onSaveClick =   this.props._onSaveClick;
        var _onCancelClick =   this.props._onCancelClick;
        const { MentionSuggestions } = mentionPlugin2;

        return(
            <div className="App">

                <div className="editor" onClick={this.focus}>
                    <Editor editorState={this.state.editorState}
                            onChange={this.onChange}
                            plugins={[hashtagPlugin, mentionPlugin2, mentionPlugin3]}
                            ref={(element) => { this.editor = element; }}
                    />
                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                    />
                    <MentionSuggestions2
                        onSearchChange={this.onSearchChangeC}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                    />
                    <button onClick={() => _onSaveClick(JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) ))}>Save</button>
                    <button onClick={() => _onCancelClick()}>Cancel</button>

                </div>
            </div>
        )
    }
};
export default Wall;

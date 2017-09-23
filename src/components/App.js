/**
 * Created by hichri on 8/17/17.
 */

import React from 'react';
import Wall from './Wall';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import mentions from './mentions'; // users to be mentioned
import mentions2 from './mentions2'; // same list with extra XXX just to simulate different list triggered by a different caracter $



const hashtagPlugin = createHashtagPlugin();
const mentionPlugin2 = createMentionPlugin(); // default mention trigger users list
const mentionPlugin3 = createMentionPlugin({ mentionTrigger: '$' , mentionPrefix: '$' }); // extra mention trigger -- companies list
const MentionSuggestions2 = mentionPlugin3.MentionSuggestions;




// convert the raw state back to a useable ContentState object
// const contentState = convertFromRaw( JSON.parse( rawDraftContentState) );

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty(),status : this.props.initialStatus, suggestions: mentions};
        this.onChange = (editorState) => this.setState({editorState: editorState, status : this.props.initialStatus});
        this.onSearchChange = ({ value }) => this.setState({suggestions: defaultSuggestionsFilter(value, mentions)});
        this.onSearchChangeC = ({ value }) => this.setState({suggestions: defaultSuggestionsFilter(value, mentions2)});
        this.onAddMention = (obj) => this.setState({pageHeader: obj});
        this.focus = () => this.editor.focus();
        this.mentionPlugin = createMentionPlugin();

    }
    _onShareClick() {

        // conversion
        // the raw state, stringified
        const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
        // display the shared article as raw stringified format, maybe the next version will be converted to HTML clickable data
        this.setState({status: this.props.initialStatus.push({
            "id":this.props.initialStatus.length+1,
            "userName": "HICHRI Houssem",
            "userArticle": rawDraftContentState
        })})
    }
    render(){
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
                    <button className="share-btn" onClick={this._onShareClick.bind(this)}>Share</button>

                </div>
                <div>
                    {
                        this.state.status.map(statu =>
                                <Wall key={statu.id} userName={statu.userName} userArticle={statu.userArticle}/>

                        )
                    }
                </div>
            </div>
        )
    }
};
export default App;
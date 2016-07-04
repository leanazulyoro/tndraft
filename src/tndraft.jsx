import Editor from './components/MyMegadraft.jsx';
//import Editor from './components/RichTextEditor.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    EditorState,
    convertFromRaw,
    convertToRaw
} from 'draft-js';


import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';

export default class TNDraft extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.targetElement.id.length === 0) {
            throw new Error("The target element must have an ID");
        }
        let id = this.props.targetElement.id;


        if(props.defaultValue.length > 0) {
            var contentState = stateFromHTML(props.defaultValue);
            var editorState = EditorState.createWithContent(contentState);
        } else {
            var editorState = EditorState.createEmpty();
        }

        this.state = {
            editorState: editorState,
            tndraftJson: JSON.stringify(editorState),
            tndraftHtml: stateToHTML(editorState.getCurrentContent()),
            id: id
        };
    }

    onUpdateContent = (editorState) => {
        this.setState({
            tndraftJson: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            tndraftHtml: stateToHTML(editorState.getCurrentContent())
        });
    }

    render() {
        return (
            <div>
                <Editor
                    updateContent={this.onUpdateContent}
                    editorState={this.state.editorState}
                />

                <input type="text" name={"tndraft-" + this.state.id + "-json"} value={this.state.tndraftJson} />
                <input type="text" name={"tndraft-" + this.state.id + "-html"} value={this.state.tndraftHtml} />

            </div>
        )
    }
}


// Export component as function
function TNDraftRender(element, defaultValue) {
    ReactDOM.render(
        <TNDraft
            defaultValue={defaultValue}
            targetElement={element}
        />,
        element
    );
}
window.TNDraftRender = TNDraftRender;
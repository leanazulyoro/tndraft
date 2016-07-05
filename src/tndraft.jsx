import Editor from './editors/MyMegadraft.jsx';
//import Editor from './editors/RichTextEditor.jsx';
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

        var textarea = this.props.targetElement.querySelector('textarea');

        if (textarea.id.length === 0) {
            throw new Error("The target textarea element must have an ID");
        }
        let id = textarea.id;
        let name = textarea.getAttribute("name");;


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
            id: id,
            name: name
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

                <input type="hidden" name={"tndraft-" + this.state.name + "-json"} value={this.state.tndraftJson} />
                <input type="hidden" name={this.state.name} id={this.state.id} value={this.state.tndraftHtml} />

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
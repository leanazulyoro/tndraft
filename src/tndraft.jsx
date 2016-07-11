//import Editor from './editors/MyMegadraft.jsx';
import Editor from './editors/RichTextEditor.jsx';
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
            throw new Error("The target textarea element must have an ID");
        }
        var textarea = this.props.targetElement.querySelector('textarea');
        let name = textarea.getAttribute("name");
        /* @todo add validations:
            - a textarea must exist inside the targetElement
            - the textarea must have a name attribute
        */

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
            name: name,
            id: this.props.targetElement.id
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

                <input type="hidden" name={"tndraft-" + this.state.id + "-json"} value={this.state.tndraftJson} />
                <input type="hidden" name={this.state.name} id={this.state.id} value={this.state.tndraftHtml} />

            </div>
        )
    }
}


// Export component as function
function TNDraftRender(element, defaultValue) {
    // @todo the defaultValue should come from the actual value from the element, it should not be received as a parameter
    ReactDOM.render(
        <TNDraft
            defaultValue={defaultValue}
            targetElement={element}
        />,
        element
    );
}
window.TNDraftRender = TNDraftRender;
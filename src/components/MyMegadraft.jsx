import React, {Component} from "react";
import {
    EditorState,
    convertFromRaw,
    convertToRaw
} from 'draft-js';
import Megadraft from "megadraft";

import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';


class MyMegadraft extends React.Component {
    constructor(props) {
        super(props);

        let contentState = stateFromHTML(props.value);
        console.log(props.value);
        console.log(contentState);
        
        this.state = {
            editorState: EditorState.createWithContent(contentState),
        };
        this.onChange = ::this.onChange;
    }

    onChange(editorState) {
        this.setState({editorState});
    }

    onLogState = () => {
        console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    };
    onLogExportHTML = () => {
        console.log(stateToHTML(this.state.editorState.getCurrentContent()))
    };

    render() {
        return (
            <div>
                <Megadraft
                    editorState={this.state.editorState}
                    onChange={this.onChange}/>
                <input onClick={this.onLogExportHTML} value="Log Exported HTML" type="button"/>
                <input onClick={this.onLogState} value="Log State" type="button"/>
            </div>
        )
    }
}

export default MyMegadraft;
//import Editor from './components/MyMegadraft.jsx';
import Editor from './components/RichTextEditor.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    EditorState,
    convertFromRaw,
    convertToRaw
} from 'draft-js';

import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';

class TNDraft extends React.Component {
    constructor(props) {
        super(props);

        let contentState = stateFromHTML(props.value);
        console.log(props.value);
        console.log(contentState);

        /*let html = "<p>Una de las voces que se expresó a favor de que <a href=\"http://tn.com.ar/personajes/lionel-messi\" title=\"Lionel Messi\">Lionel Messi</a> revea su decisión de dejar la Selección fue <a href=\"http://tn.com.ar/personajes/susana-giménez\" title=\"Susana Giménez\">Susana Giménez</a>. La diva usó su cuenta de Twitter para darle su <strong>apoyo al delantero</strong>.</p><p class=\"links-related\"><span class=\"title\">Leé también</span>: <a href=\"http://tn.com.ar/deportes/after-play/messi-terminante-se-termino-la-seleccion-para-mi_683535\" target=\"_blank\">Messi, contundente: \"Se terminó la Selección para mí\"</a></p><p>\"<strong>Messi querido no te vayas</strong> sos el mejor del mundo pero tambien, sos un ser humano\", escribió la conductora.</p><p>Mirá <strong>el tweet</strong>:</p><p>[social_embed:content:%3Cblockquote%20class%3D%22twitter-tweet%22%20data-lang%3D%22es%22%3E%3Cp%20lang%3D%22es%22%20dir%3D%22ltr%22%3EMessi%20querido%20no%20te%20vayas%20sos%20el%20mejor%20del%20mundo%20pero%20tambien%2C%20sos%20un%20ser%20humano.%3C%2Fp%3E%26mdash%3B%20Susana%20Gimenez%20(%40Su_Gimenez)%20%3Ca%20href%3D%22http%25%2F%2Ftwitter.com%2FSu_Gimenez%2Fstatus%2F747479386333519872%22%3E27%20de%20junio%20de%202016%3C%2Fa%3E%3C%2Fblockquote%3E%0A%3Cscript%20async%20src%3D%22%2F%2Fplatform.twitter.com%2Fwidgets.js%22%20charset%3D%22utf-8%22%3E%3C%2Fscript%3E]</p><p>Más temprano, Su había contado por el mismo medio que <strong>estaba viendo el partido</strong>:</p><p>Y también le dedicó unas <strong>palabras al árbitro</strong>:</p><p>[social_embed:content:%3Cblockquote%20class%3D%22twitter-tweet%22%20data-lang%3D%22es%22%3E%3Cp%20lang%3D%22es%22%20dir%3D%22ltr%22%3EEl%20referi%20%20pelado%20quiere%20hacerse%20famoso%20q%20espanto%20!!!!!%3C%2Fp%3E%26mdash%3B%20Susana%20Gimenez%20(%40Su_Gimenez)%20%3Ca%20href%3D%22http%25%2F%2Ftwitter.com%2FSu_Gimenez%2Fstatus%2F747231029568614400%22%3E27%20de%20junio%20de%202016%3C%2Fa%3E%3C%2Fblockquote%3E%0A%3Cscript%20async%20src%3D%22%2F%2Fplatform.twitter.com%2Fwidgets.js%22%20charset%3D%22utf-8%22%3E%3C%2Fscript%3E]</p><p>Por si algún desprevenido no se enteró, la Argentina perdió la final de la <a href=\"http://tn.com.ar/tags/copa-américa-centenario\" title=\"Copa América Centenario\">Copa América Centenario</a>, tras empatar 0 a 0 con Chile y pasar a penales. Después de eso, Messi dijo ante los medios que dejaría la Selección.</p><p>El público de <a href=\"http://tn.com.ar/deportes\">Toda Pasión</a>, como Susana, tampoco quiere que la Pulga deje el equipo. Vos también podés dejarle un mensaje.</p><p class=\"links-related\"><span class=\"title\">Leé también</span>: <a href=\"http://tn.com.ar/deportes/after-play/las-redes-sociales-se-inundaron-de-mensajes-para-que-messi-revea-su-decision-de-dejar-la-se\" target=\"_blank\">Llueven los mensajes para que Messi revea su decisión de dejar la selección</a></p>";
        let contentState = stateFromHTML(html);
*/

        this.state = {
            editorState: EditorState.createWithContent(contentState),
        };
        this.onChange = ::this.onChange;
    }

    onChange(editorState) {
        this.setState({editorState});
    }

    render() {
        return (
            <div>
                <Editor
                    value={this.props.value}
                    editorState={this.state.editorState}
                    onChange={this.onChange}/>

                <input type="hidden" />
                <input type="hidden" />

            </div>
        )
    }
}



function TNDraftRender(targetId, value) {
    ReactDOM.render(
        <TNDraft
            value={value}
            />,
        document.getElementById(targetId)
    );
}
window.TNDraftRender = TNDraftRender;
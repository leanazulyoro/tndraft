import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class HelloWorld extends Component {

    render() {
        return (
            <div>Hola <span>Mundo!</span></div>
        );
    }
}

console.log(HelloWorld);

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('container')
);
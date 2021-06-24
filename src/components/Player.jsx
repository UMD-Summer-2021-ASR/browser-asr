import React from "react";
import ReactDOM from "react-dom";
import useSound from "use-sound";
import VTT from "../assets/id01.vtt";

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameState: 0}; // 0 = begin, 1 = question is running, 2 = question is done
        this.transcript = [];

        this.loadNextTranscript();
    }

    buzz() {
        // stop timer, pause audio, open answer box, enable submit button, start submit button countdown, 
    }

    submit() {
        // 
    }

    playAudio() { // implement + get audio with backend

    }

    isCorrect() {
        // implement w/ backend to check answer
        return true;
    }

    loadNextTranscript() {
        const webvtt = require('node-webvtt');
 
        const parsed = webvtt.parse(VTT);
        //write catch for parse fail
        console.log(parsed);
        // this.transcript.push(new Array());
    }

    render() {
        return (
            <div>
                <button onClick={this.loadNextTranscript}>
                    Hi
                </button>
            </div>
        );
    }
}

export default Player;
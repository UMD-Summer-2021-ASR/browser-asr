import React from "react";
import ReactDOM from "react-dom";
import useSound from "use-sound";
import testAudio from "../assets/obama.wav";


class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameState: 0}; // 0 = begin, 1 = question is running, 2 = question is done
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

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Player;
import React from "react";
import ReactDOM from "react-dom";

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameState: 0}; // 0 = begin, 1 = question is running, 2 = question is done
    }

    isCorrect() {
        // implement w/ backend
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
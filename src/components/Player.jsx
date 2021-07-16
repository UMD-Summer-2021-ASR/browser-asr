import React from "react";
import ReactDOM from "react-dom";
import useSound from "use-sound";
import "../styles/Player.css";

function PlayButton(props) {
    const [play, { stop, isPlaying }] = useSound(Audio);
    return (
      <PlayButton
        active={isPlaying}
        size={60}
        iconColor="var(--color-background)"
        idleBackgroundColor="var(--color-text)"
        activeBackgroundColor="var(--color-primary)"
        play={() => {
            play();
        }}
        stop={stop}
      />
    );
  }

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameState: 0, transcriptState: ""}; // 0 = begin, 1 = question is running, 2 = question is done
        this.transcript = []; // [i][0] = ms from start, [i][1] = word
        this.currentAudio = new Audio();
        this.audioID = "";
        this.timeOuts = [];
    }

    playTranscript(transcript) {
        this.setState({
            transcriptState: ""
        })
        for(let i = 0; i < transcript.length; i++) {
            // console.log(transcript[i][1] + transcript[i][0]);
            this.timeOuts.push(setTimeout(() => {this.setState({
                transcriptState: this.state.transcriptState + transcript[i][1] + " "
            })}, transcript[i][0]));
        }
    }

    isCorrect() {
        // implement w/ backend to check answer
        return true;
    }

    loadNextTranscript() {
        this.transcript = [];
        return fetch('https://api.quizzr.shivammalhotra.dev/answer/')
            .then(response => response.json())
            .then(text => {
                let lines = text.vtt.split("\n");
                this.audioID = text._id;
                for(let i = 2; i < lines.length-1; i+=3) {
                    if(lines[i+1].charAt(0) === "<") {
                        let lineSplit = lines[i+1].split(">");
                        lines[i+1] = lineSplit[1];
                    }
                    let startTime = lines[i].split(" ")[0];
                    let minutes = parseInt(startTime.split(":")[0]);
                    let seconds = parseFloat(startTime.split(":")[1]) + minutes*60;
                    let ms = parseInt(seconds*1000);
                    this.transcript.push(new Array(ms, lines[i+1]));
                }
            });
    }

    loadNextAudio() {
        let path = "https://api.quizzr.shivammalhotra.dev/download/" + this.audioID;
        this.currentAudio = new Audio(path);
    }

    loadNextQuestion() {
        this.loadNextTranscript().then(() => {
            this.loadNextAudio();
        });
        
    }

    render() {

        return (
            <div class="player-wrapper">
                <div class="transcript-box">
                    {this.state.transcriptState}
                </div>
                
                <div class="player-button-wrapper">
                    <a class="play-btn" onClick={() => {
                        this.playTranscript(this.transcript);
                        // console.log(this.transcript);
                        this.currentAudio.play();
                        
                    }}>
                        Play
                    </a>

                    <a class="play-btn" onClick={() => {
                        this.currentAudio.pause();
                        for (let i = 0; i < this.timeOuts.length; i++) {
                            clearTimeout(this.timeOuts[i]);
                        }
                        this.timeOuts = [];

                        this.setState({
                            transcriptState: ""
                        });
                        
                        this.loadNextQuestion();
                    }}>
                        Load Next
                    </a>
                </div>
            </div>
        );
    }
}

export default Player;
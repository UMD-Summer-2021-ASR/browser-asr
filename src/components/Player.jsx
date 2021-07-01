import React from "react";
import ReactDOM from "react-dom";
import useSound from "use-sound";
import VTT1 from "../assets/id01.vtt";
import VTT2 from "../assets/quizzr_q1.vtt";
import VTT3 from "../assets/quizzr_q2.vtt";
import VTT4 from "../assets/quizzr_q3.vtt";
import VTT5 from "../assets/quizzr_q4.vtt";
import VTT6 from "../assets/quizzr_q5.vtt";
import wav1 from '../assets/id01.wav';
import wav2 from '../assets/quizzr_q1.wav';
import wav3 from '../assets/quizzr_q2.wav';
import wav4 from '../assets/quizzr_q3.wav';
import wav5 from '../assets/quizzr_q4.wav';
import wav6 from '../assets/quizzr_q5.wav';

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
        this.VTTs = [VTT1, VTT2, VTT3, VTT4, VTT5, VTT6];
        this.Audios = [wav1, wav2, wav3, wav4, wav5, wav6];
        this.currentQuestion = 0;
        this.timeOuts = [];
    }

    buzz() {
        // stop timer, pause audio, open answer box, enable submit button, start submit button countdown, 
    }

    submit() {
        // TODO
    }

    playAudio() { // implement + get audio with backend

    }

    playTranscript(transcript) {
        this.setState({
            transcriptState: ""
        })
        for(let i = 0; i < transcript.length; i++) {
            console.log(transcript[i][1] + transcript[i][0]);
            this.timeOuts.push(setTimeout(() => {this.setState({
                transcriptState: this.state.transcriptState + transcript[i][1] + " "
            })}, transcript[i][0]));
        }
    }

    isCorrect() {
        // implement w/ backend to check answer
        return true;
    }

    loadNextTranscript(VTTFile) {
        // GET VTT
        this.transcript = [];
        return fetch(VTTFile)
            .then(response => response.text())
            .then(text => {
                let lines = text.split("\n");
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

    loadNextAudio(audioFile) {
        this.currentAudio = new Audio(audioFile);
    }

    loadNextQuestion() {
        this.loadNextTranscript(this.VTTs[this.currentQuestion]).then(() => {
            this.loadNextAudio(this.Audios[this.currentQuestion]);
            this.currentQuestion++;
            if(this.currentQuestion >= 6) {
                this.currentQuestion = 0;
            }
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
                        console.log(this.transcript);
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
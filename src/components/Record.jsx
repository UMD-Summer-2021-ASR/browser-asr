import "../styles/Record.css";
import React from "react";
import ReactDOM from "react-dom";
import AudioRecorder from './AudioRecorder.jsx';

// ASSETS
import CasinoOutlinedIcon from '@material-ui/icons/CasinoOutlined';
import CoinIcon from '../assets/coin.png';


function TranscriptCard(props) {
    let transcript = "";
    

    function record() {
        props.setTranscript(transcript);
        props.setCurrentlyRecording(1);
    }

    return (
        <div class="record-transcriptcard-wrapper">
            <div class="record-transcriptcard-transcript">
                {transcript}
            </div>
            <div class="record-transcriptcard-footer-wrapper">
                <div class="record-transcriptcard-footer-coin-wrapper">
                    <img class="record-transcriptcard-footer-coin" src={CoinIcon} alt="Coins"/>
                    <div class="record-transcriptcard-footer-coin-amount">
                        500
                    </div>
                </div>
                
                <div class="record-transcriptcard-footer-record" onClick={record()}>
                    Record &#187;
                </div>
            </div>
        </div>
    );
}

function TranscriptDisplayCard(props) {
    return (
        <div class="record-recordingcard-wrapper" style={{borderColor: props.frameColor}}>
            <div class="record-recordingcard-title-wrapper" style={{borderColor: props.frameColor, backgroundColor: props.frameColor}}>
                <div class="record-recordingcard-title" style={{color: props.textColor}}>
                    {props.label}
                </div>
                <div class="record-recordingcard-reroll" style={{color: props.textColor, borderColor: props.textColor}}>
                    <CasinoOutlinedIcon style={{color: props.textColor, height: "20px", width: "auto"}}/>
                    <div style={{marginLeft: "0.25rem"}}>
                        REROLL
                    </div>
                </div>
            </div>
            <div class="record-recordingcard-content-wrapper">
                <TranscriptCard  setCurrentlyRecording={props.setCurrentlyRecording} setTranscript={props.setTranscript}/>
                <TranscriptCard  setCurrentlyRecording={props.setCurrentlyRecording} setTranscript={props.setTranscript}/>
                <TranscriptCard  setCurrentlyRecording={props.setCurrentlyRecording} setTranscript={props.setTranscript}/>
            </div>
        </div>
    );
}

class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentlyRecording: 0,
            transcript: "",
        };
        this.setCurrentlyRecording = this.setCurrentlyRecording.bind(this);
        this.setTranscript = this.setTranscript.bind(this);
    }

    setCurrentlyRecording(CR) {
        this.setState({
            CurrentlyRecording: CR
        });
    }

    setTranscript(tr) {
        this.setState({
            transcript: tr
        });
    }

    render() {
        if(this.state.CurrentlyRecording === 0) {
            return (
                <div class="record-content-wrapper">
                    <TranscriptDisplayCard frameColor="#E1F8DC" textColor="green" label="Easy" setCurrentlyRecording={() => this.setCurrentlyRecording} setTranscript={this.setTranscript}/>
                    <TranscriptDisplayCard frameColor="#FEF8DD" textColor="orange" label="Medium" setCurrentlyRecording={() => this.setCurrentlyRecording} setTranscript={this.setTranscript}/>
                    <TranscriptDisplayCard frameColor="#F7D6DD" textColor="red" label="Hard" setCurrentlyRecording={() => this.setCurrentlyRecording} setTranscript={this.setTranscript}/>
                </div>
            );
        } else {
            return (
                <div class="record-content-wrapper-2">
                    <div class="recording-recorder-wrapper">
                        <div class="recording-recorder-transcript">
                            {this.state.transcript}
                        </div>
                        <div class="recording-recorder-footer-wrapper">
                            <AudioRecorder/>
                        </div>
                    </div>
                    <div class="recording-directions-wrapper">
                        <div class="recording-directions-title">
                            Directions
                        </div>
                        <div class="recording-directions-divider"></div>
                        <div class="recording-directions-body">
                            Read through the transcript before recording to ensure you are prepared to speak smoothly and consistently. All recordings will pass through a pre-screening process and you will be notified in your profile if it passes. 
                        </div>
                        <div class="recording-directions-back-wrapper">
                            <div class="recording-directions-back" onClick={() => this.setCurrentlyRecording(0)}>
                                Back
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
       
    }
}

export default Record;
import "../styles/Record.css";
import React from "react";
import ReactDOM from "react-dom";

// ASSETS
import CasinoOutlinedIcon from '@material-ui/icons/CasinoOutlined';
import CoinIcon from '../assets/coin.png';


function TranscriptCard(props) {
    return (
        <div class="record-transcriptcard-wrapper">
            <div class="record-transcriptcard-transcript">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </div>
            <div class="record-transcriptcard-footer-wrapper">
                <div class="record-transcriptcard-footer-coin-wrapper">
                    <img class="record-transcriptcard-footer-coin" src={CoinIcon} alt="Coins"/>
                    <div class="record-transcriptcard-footer-coin-amount">
                        500
                    </div>
                </div>
                
                <div class="record-transcriptcard-footer-record" onClick={props.setCurrentlyRecording}>
                    Record &#187;
                </div>
            </div>
        </div>
    );
}

function RecordingCard(props) {
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
                <TranscriptCard  setCurrentlyRecording={props.setCurrentlyRecording}/>
                <TranscriptCard  setCurrentlyRecording={props.setCurrentlyRecording}/>
                <TranscriptCard  setCurrentlyRecording={props.setCurrentlyRecording}/>
            </div>
        </div>
    );
}

class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {CurrentlyRecording: 0};
        this.setCurrentlyRecording = this.setCurrentlyRecording.bind(this);
    }

    setCurrentlyRecording(CR) {
        this.setState({
            CurrentlyRecording: CR
        });
    }

    render() {
        if(this.state.CurrentlyRecording === 0) {
            return (
                <div class="record-content-wrapper">
                    <RecordingCard frameColor="#E1F8DC" textColor="green" label="Easy" setCurrentlyRecording={() => this.setCurrentlyRecording(1)}/>
                    <RecordingCard frameColor="#FEF8DD" textColor="orange" label="Medium" setCurrentlyRecording={() => this.setCurrentlyRecording(1)}/>
                    <RecordingCard frameColor="#F7D6DD" textColor="red" label="Hard" setCurrentlyRecording={() => this.setCurrentlyRecording(1)}/>
                </div>
            );
        } else {
            return (
                <div class="record-content-wrapper-2">
                    <div class="recording-recorder-wrapper">
                        <div class="recording-recorder-transcript">
                        One example of this technique is the Castner-Kellner process that starts with sodium chloride.  The decomposition potential must be overcome for this technique to be successful.  Other examples of it include the Hall-H\\\\'eroult process used to make aluminum and the production of hydrogen gas from water.  For 10 points--name this technique that uses an electric current to drive an otherwise non-spontaneous process.
                        </div>
                        <div class="recording-recorder-footer-wrapper">
                            <div class="recording-recorder-audiodisplay"></div>
                            <div class="recording-recorder-buttons-wrapper">
                                <div class="recording-recorder-button">
                                    Start
                                </div>
                                <div class="recording-recorder-button">
                                    Pause
                                </div>
                                <div class="recording-recorder-button">
                                    Stop
                                </div>
                                <div class="recording-recorder-button">
                                    Submit
                                </div>
                            </div>
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
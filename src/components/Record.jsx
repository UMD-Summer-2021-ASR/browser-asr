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
                
                <div class="record-transcriptcard-footer-record">
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
                <TranscriptCard/>
                <TranscriptCard/>
                <TranscriptCard/>
            </div>
        </div>
    );
}

class Record extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="record-content-wrapper">
                <RecordingCard frameColor="#E1F8DC" textColor="green" label="Easy"/>
                <RecordingCard frameColor="#FEF8DD" textColor="orange" label="Medium"/>
                <RecordingCard frameColor="#F7D6DD" textColor="red" label="Hard"/>
            </div>
        );
    }
}

export default Record;
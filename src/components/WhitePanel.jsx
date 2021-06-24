import "../styles/WhitePanel.css";
import React from "react";
import ReactDOM from "react-dom";
import CheckIcon from '@material-ui/icons/Check';
import GoogleLogin from 'react-google-login';
import AnimatedCard from './AnimatedCard';
import MagnifyingGlass from '../assets/magnifying-glass.png';
import Microphone from '../assets/microphone.png';
import Recorder from './AudioRecorder.jsx'
import Player from './Player.jsx';


function LoginCardItem(props) {
    return (
        <div class="login-card-item">
            <CheckIcon style={{ color:"green" }} fontSize="small"/>
            <div class="mr-1"></div>
            {props.text}
        </div>
    );
}

function HomeBody(props) {
    return (
        <div class="main-body">
            <div class="login-card">
                <div class="card-title" id="login-title">Login</div>
                <br/>
                <LoginCardItem text="Unlimited games"/>
                <LoginCardItem text="Singleplayer mode"/>
                <LoginCardItem text="Party mode"/>
                <LoginCardItem text="Play with friends"/>
                <LoginCardItem text="Contribute to ASR research"/>
                <div class="google-login-wrapper">
                    <GoogleLogin theme="light"/>
                </div>
            </div>
            <div class="gamemode-card">
                <div class="card-title">Gamemodes</div>
                {/* set "enabled" property to false if not logged in*/}
                <AnimatedCard src={MagnifyingGlass} title="PLAY" screenChange={() => props.screenChange(1)} href="#" enabled={true} caption="Race against the clock in this fast-paced gamemode testing your trivia skills!"/>
                <AnimatedCard src={Microphone} title = "RECORD" screenChange={() => props.screenChange(2)} href="#" enabled={true} caption="Contribute to this game by recording questions for others to play!"/>
            </div>
        </div>
    );
}

function HomeTitle() {
    return (
        <div>
            <div class="home-title">Quizzr.io</div>
            <div class="home-subtitle"><b>the </b> quiz game</div>
        </div>
    );
}

function PageTitle(props) {
    return (
        <div class="page-header">
            <a class="page-back-button-wrapper" onClick={props.screenChange}>
                <div class="page-back-button"><span class="page-back-button-text">&laquo;</span></div>
            </a>
            <div class="page-title-wrapper">
                <div class="page-title">Quizzr.io</div>
                <div class="page-subtitle"><b>the </b> quiz game</div>
            </div>
        </div>
    );
}

class BigWhitePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {screen: 0}; // 0 = home, 1 = play, 2 = record

        this.screenChange = this.screenChange.bind(this);
    }

    screenChange(screenNumber) {
        this.setState({screen: screenNumber});
    }

    render() {
        if(this.state.screen === 0) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <HomeTitle/>
                        <HomeBody
                            screenChange={this.screenChange}
                        />
                    </div>
                </div>
                
            );
        } else if(this.state.screen === 1) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <PageTitle
                            screenChange={() => this.screenChange(0)}
                        />
                        <Player/>
                    </div>
                </div>
            );
        } else if(this.state.screen === 2) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <PageTitle
                            screenChange={() => this.screenChange(0)}
                        />
                        <Recorder/>
                    </div>
                </div>
            );
        } else {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <HomeTitle/>
                        <HomeBody/>
                    </div>
                </div>
            );
        }
        
    }
}

export default BigWhitePanel;
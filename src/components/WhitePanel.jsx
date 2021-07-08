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

// Sidenav assets
import SamplePfp from '../assets/sample-pfp.jpeg';
import SampleIcon from '../assets/user.png';


function LoginCardItem(props) {
    return (
        <div class="login-card-item">
            <CheckIcon style={{ color:"green" }} fontSize="small"/>
            <div class="mr-1"></div>
            {props.text}
        </div>
    );
}

function LoginBody(props) {
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
            </div>
            {/* TODO ADD TUTORIAL SLIDES */}
        </div>
    );
}

function LoginTitle() {
    return (
        <div>
            <div class="login-title">Quizzr.io</div>
            <div class="login-subtitle"><b>the </b> quiz game</div>
        </div>
    );
}


function SidenavItem(props) {
    return (
        <div class="sidenav-tab-wrapper">
            <img class="sidenav-tab-icon" src={SampleIcon} alt="icon"/>
            <div class="sidenav-tab-label">{props.label}</div>
        </div>
    );
}

function PageTitle(props) {
    return (
        <div>

        </div>
    );
}

class BigWhitePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {screen: 1}; // 0 = login, 1 = profile, 2 = dashboard, 3 = play, 5 = record, 4 = leaderboards 

        this.screenChange = this.screenChange.bind(this);
    }

    screenChange(screenNumber) {
        this.setState({screen: screenNumber});
    }

    render() {
        if(this.state.screen === 0) {
            return (
                <div class="login-white-panel-wrapper">
                    <div class="login-white-panel">
                        <LoginTitle/>
                        <LoginBody
                            screenChange={this.screenChange}
                        />
                    </div>
                </div>
            );
        } else if(this.state.screen === 1) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            <div class="sidenav-wrapper">
                                <div class="page-logo-title">Quizzr.io</div>
                                <div class="page-logo-subtitle"><b>the</b> quiz game</div>
                                <div class="sidenav-pfp-wrapper">
                                    <img class="sidenav-pfp" src={SamplePfp} alt="profile picture"/>
                                </div>
                                <div class="sidenav-tabs-wrapper">
                                    <SidenavItem label="Profile"/>
                                    <SidenavItem label="Dashboard"/>
                                    <SidenavItem label="Play"/>
                                    <SidenavItem label="Record"/>
                                    <SidenavItem label="Leaderboards"/>
                                    <SidenavItem label="Logout"/>
                                </div>
                            </div>
                            <div class="page-body-wrapper">
                                    Hello
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.screen === 2) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <PageTitle
                            screenChange={() => this.screenChange(0)}
                        />,
                        <Recorder/>
                    </div>
                </div>
            );
        }
    }
}

export default BigWhitePanel;
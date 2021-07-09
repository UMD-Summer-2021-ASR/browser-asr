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

// ASSETS
// Sidenav
import SamplePfp from '../assets/sample-pfp.jpeg';
import SampleIcon from '../assets/user.png';
// Dashboard header
import GreenLayeredSteps from '../assets/green-layered-steps.svg';
import BlueLayeredWaves from '../assets/blue-layered-waves.svg';
import BlueLayeredWaves2 from '../assets/blue-layered-waves-2.svg';
import BlueLayeredSteps from '../assets/blue-layered-steps.svg';
// Currency
import EnergyIcon from '../assets/energy.png';
import CoinIcon from '../assets/coin.png';

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

function PageHeader(props) {
    return (
        <div class="page-header-wrapper">
            <div class="page-header-left-wrapper">
                <div class="page-header-title">
                    {props.title}
                </div>
                <div class="page-header-divider"></div>
                <div class="page-header-caption">
                    {props.caption}
                </div>
            </div>
            <div class="page-header-right-wrapper">
                {/* Energy */}
                <div class="page-header-energy-wrapper">
                    <div class="page-header-energy-cooldowntext"></div>
                    <div class="page-header-currency-wrapper">
                        <div class="page-header-currency-text">
                            <img class="page-header-energy-icon" src={EnergyIcon} alt="Energy: "/>
                            7/10
                        </div>
                        <div class="page-header-currency-add">+</div>
                    </div>
                    <div class="page-header-energy-cooldowntext">+1 in 45:07</div>
                </div>

                {/* Coins */}
                <div class="page-header-currency-wrapper page-header-coin-mr">
                    <div class="page-header-currency-text">
                        <img class="page-header-coin-icon" src={CoinIcon} alt="Coins: "/>
                        1000
                    </div>
                    <div class="page-header-currency-add">+</div>
                </div>
            </div>
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
                                <PageHeader title="Dashboard" caption="Catch up on the latest news and updates!"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default BigWhitePanel;
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
import Game from './Game.jsx';

// PAGES
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import Record from './Record.jsx';
import Play from './Play.jsx';
import Leaderboards from './Leaderboards.jsx';

// ASSETS
// Sidenav
import DashboardIcon from '@material-ui/icons/Dashboard';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
        <div class="sidenav-tab-wrapper" onClick={props.setScreen}>
            {props.icon}
            <div class="sidenav-tab-label" style={{color: props.textColor}}>{props.label}</div>
        </div>
    );
}

function Sidenav(props) {
    let MainColor = "#6287F7";
    let LogoutColor = "#b52121";
    return (
        <div class="sidenav-wrapper">
            <div class="sidenav-logo-title">Quizzr.io</div>
            <div class="sidenav-logo-subtitle"><b>the</b> quiz game</div>
            <div class="sidenav-tabs-wrapper">
                <SidenavItem label="Profile" icon={<AccountCircleIcon style={{color: MainColor}}/>} setScreen={() => props.setScreen(1)} textColor={MainColor}/>
                <SidenavItem label="Dashboard" icon={<DashboardIcon style={{color: MainColor}}/>} setScreen={() => props.setScreen(2)} textColor={MainColor}/>
                <SidenavItem label="Play" icon={<OfflineBoltIcon style={{color: MainColor}}/>} setScreen={() => props.setScreen(3)} textColor={MainColor}/>
                <SidenavItem label="Record" icon={<RecordVoiceOverIcon style={{color: MainColor}}/>} setScreen={() => props.setScreen(4)} textColor={MainColor}/>
                <SidenavItem label="Leaderboards" icon={<BarChartIcon style={{color: MainColor}}/>} setScreen={() => props.setScreen(5)} textColor={MainColor}/>
                <SidenavItem label="Logout" icon={<ExitToAppIcon style={{color: LogoutColor}}/>} textColor={LogoutColor}/>
            </div>
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
        this.state = {screen: 7}; // 0 = login, 1 = profile, 2 = dashboard, 3 = play, 4 = record, 5 = leaderboards, 6 = in-lobby, 7 = in-game

        this.setScreen = this.setScreen.bind(this);
    }

    setScreen(screenNumber) {
        this.setState({screen: screenNumber});
    }

    render() {
        if(this.state.screen > 7) this.state.screen = 2;

        if(this.state.screen === 0) {
            return (
                <div class="login-white-panel-wrapper">
                    <div class="login-white-panel">
                        <LoginTitle/>
                        <LoginBody/>
                    </div>
                </div>
            );
        } else if(this.state.screen === 1) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            <Sidenav setScreen={this.setScreen}/>
                            <div class="page-body-wrapper">
                                <PageHeader title="Profile" caption="Track your statistics, match history, recordings, and rating!"/>
                                <div class="page-body-content-wrapper">
                                    <Profile/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.screen === 2) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            <Sidenav setScreen={this.setScreen}/>
                            <div class="page-body-wrapper">
                                <PageHeader title="Dashboard" caption="Catch up on the latest news and updates!"/>
                                <div class="page-body-content-wrapper">
                                    <Dashboard/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.screen === 3) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            <Sidenav setScreen={this.setScreen}/>
                            <div class="page-body-wrapper">
                                <PageHeader title="Play" caption="Play with friends, solo, or compete on the ladder!"/>
                                <div class="page-body-content-wrapper">
                                    <Play/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.screen === 4) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            <Sidenav setScreen={this.setScreen}/>
                            <div class="page-body-wrapper">
                                <PageHeader title="Record" caption="Earn coins by recording for others to play!"/>
                                <div class="page-body-content-wrapper">
                                    <Record/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.screen === 5) {
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            <Sidenav setScreen={this.setScreen}/>
                            <div class="page-body-wrapper">
                                <PageHeader title="Leaderboards" caption="Check out the top players across the globe!"/>
                                <div class="page-body-content-wrapper">
                                    <Leaderboards/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.screen === 6){
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            Bruh
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.screen === 7){
            return (
                <div class="big-white-panel-wrapper">
                    <div class="big-white-panel">
                        <div class="content-wrapper">
                            <Game/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default BigWhitePanel;
import "../styles/WhitePanel.css";
import CheckIcon from '@material-ui/icons/Check';
import GoogleLogin from 'react-google-login';

function LoginCardItem(props) {
    return (
        <div class="login-card-item">
            <CheckIcon style={{ color:"green" }} fontSize="small"/>
            <div class="mr-1"></div>
            {props.text}
        </div>
    );
}

function MainBody() {
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
            </div>
        </div>
    );
}

function MainTitle() {
    return (
        <div>
            <div class="main-title">Quizzr.io</div>
            <div class="main-subtitle"><b>the </b> quiz game</div>
        </div>
    );
}

function BigWhitePanel() {
    return (
        <div class="big-white-panel-wrapper">
            <div class="big-white-panel">
                <MainTitle/>
                <MainBody/>
            </div>
        </div>
        
    );
}

export default BigWhitePanel;
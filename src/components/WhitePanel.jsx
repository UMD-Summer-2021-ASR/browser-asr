import "../styles/WhitePanel.css";

function MainBody() {
    return (
        <div class="main-body">
            <div class="login-card">
            <div class="card-title">LOGIN</div>
        </div>
            <div class="gamemode-card">
                <div class="card-title">GAMEMODES</div>
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
import "../styles/Profile.css";
import React from "react";
import ReactDOM from "react-dom";
import StatsCardsAccordion from "./StatsCardsAccordion";

// ASSETS
import BookIcon from '@material-ui/icons/Book';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// pfp, username
function ProfileCard(props) {
    return (
        <div class="profile-profilecard-wrapper">
            <div class="profile-profilecard-pfp">

            </div>
            <div class="profile-profilecard-text">
                Andrew Chen <br/>
                <div>
                    
                </div>
                Ranked: 1456
            </div>
        </div>
    );
}

// rating chart
function RatingCard(props) {
    return (
        <div class="profile-ratingcard-wrapper">
            <div class="profile-comingsoon">
                COMING SOON
            </div>
        </div>
    );
}

// stats cards
function StatsCard(props) {
    return (
        <div class="profile-statscard-wrapper">
            {props.label}
            <ExpandMoreIcon style={{color: "black", height: "25px"}}/>
        </div>
    );
}

function StatsCards(props) {
    return (
        <div class="profile-statscards-wrapper">
            <div class="profile-statscards-title-wrapper">
                <InsertChartIcon style={{color: "#6287F7", height: "25px", width: "auto"}}/>
                <div class="profile-statscards-title">Stats</div>
            </div>
            <div class="profile-statscards-content-wrapper">
                <StatsCardsAccordion/>
            </div>
        </div>
    );
}

function HistoryCard(props) {
    return (
        <div class="profile-historycard-wrapper" style={{color : props.color, backgroundColor : props.bgcolor}}>
            {props.icon}
            {props.label}
        </div>
    );
}

// match history + recording history + inbox buttons
function HistoryCards(props) {
    return (
        <div class="profile-historycards-wrapper">
            <HistoryCard label="Match Log" color="orange" bgcolor="#FEFDE1" icon={<BookIcon style={{color: "orange", height: "3rem", width: "auto"}}/>}/>
            <HistoryCard label="Recordings" color="green" bgcolor="#D2FBD9" icon={<MusicVideoIcon style={{color: "green", height: "3rem", width: "auto"}}/>} />
            <HistoryCard label="Inbox" color="purple" bgcolor="#F6E1FD" icon={<MailOutlineIcon style={{color: "purple", height: "3rem", width: "auto"}}/>}/>
        </div>
    );
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="profile-content-wrapper">
                <div class="profile-column">
                    <ProfileCard/>
                    <RatingCard/>
                </div>
                <div class="profile-column">
                    <StatsCards/>
                    <HistoryCards/>
                </div>
            </div>
        );
    }
}

export default Profile;
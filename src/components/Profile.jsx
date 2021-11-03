import "../styles/Profile.css";
import { useState } from "react";
import StatsCardsAccordion from "./StatsCardsAccordion";
import { useAlert } from 'react-alert';
import { useRecoilValue } from "recoil";
import { PROFILE } from "../store";

// ASSETS
import BookIcon from '@material-ui/icons/Book';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// pfp, username
function ProfileCard(props) {
    const profile = useRecoilValue(PROFILE);
    console.log(profile);
    // return (
    //     <div class="profile-profilecard-wrapper" onClick={() => props.setProfileScreen('changeuserinfo')}>
    //         <div class="profile-profilecard-pfp">

    //         </div>
    //         <div class="profile-profilecard-text">
    //             {profile['username']} <br/>
    //             <div>
                    
    //             </div>
    //             {profile['rating']}
    //         </div>
    //     </div>
    // );
    return (
        <div class="profile-profilecard-wrapper">
            <div class="profile-profilecard-pfp">

            </div>
            <div class="profile-profilecard-text">
                {profile['username']} <br/>
                <div>
                    
                </div>
                {profile['rating']}
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

// 1 stats card
// function StatsCard(props) {
//     return (
//         <div class="profile-statscard-wrapper">
//             {props.label}
//             <ExpandMoreIcon style={{color: "black", height: "25px"}}/>
//         </div>
//     );
// }

// all the stats cards
function StatsCards() {
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

function GameHistoryCard(props) {
    return (
        <div onClick={() => props.setProfileScreen('gamehistory')} class="profile-historycard-wrapper" style={{color : props.color, backgroundColor : props.bgcolor}}>
            {props.icon}
            {props.label}
        </div>
    );
}

// button for looking at history
function HistoryCard(props) {
    const alert = useAlert();

    function comingSoon() {
        alert.show("This feature is coming soon!");
    }

    return (
        <div onClick={comingSoon} class="profile-historycard-wrapper" style={{color : props.color, backgroundColor : props.bgcolor}}>
            {props.icon}
            {props.label}
        </div>
    );
}

// match history + recording history + inbox buttons
function HistoryCards(props) {
    
    return (
        <div class="profile-historycards-wrapper">
            <GameHistoryCard label="Game History" color="orange" bgcolor="#FEFDE1" icon={<BookIcon style={{color: "orange", height: "3rem", width: "auto"}}/>}  setProfileScreen={props.setProfileScreen}/>
            <HistoryCard label="Coming soon" color="green" bgcolor="#D2FBD9" icon={<MusicVideoIcon style={{color: "green", height: "3rem", width: "auto"}}/>} />
            <HistoryCard label="Coming soon" color="purple" bgcolor="#F6E1FD" icon={<MailOutlineIcon style={{color: "purple", height: "3rem", width: "auto"}}/>}/>
        </div>
    );
}

function GameHistory(props) {
    const games = ["PartBallSmellGuiltyCirculation"];
    const [gameIdx, setCurrentGameIdx] = useState(0);
    const [currentGames, setCurrentGames] = useState(games.slice(0,10));
    const alert = useAlert();
    const STEPSIZE = 10;

    function getGames(stepSize) {
        // get new games and move into current games / TODO REPLACE BELOW w/ GET REQUESTS FOR GAMES
        if(games.slice(gameIdx+stepSize, gameIdx+(2*stepSize)).length == 0) {
            alert.show("No games left to show");
        } else {
            setCurrentGameIdx(gameIdx+stepSize);
            setCurrentGames(games.slice(gameIdx+stepSize, gameIdx+(2*stepSize)));
        }
    }

    return (
        <div class="profile-gamehistory-wrapper">
            <div class="profile-gamehistory-gameslist-wrapper">
                <div class="profile-gamehistory-gameslist-wrapper-2">
                    Hi
                </div>
            </div>
            <div class="profile-gamehistory-footer-wrapper">
                <div class="profile-gamehistory-footer-wrapper-space">
                    <div class="profile-gamehistory-back-btn" onClick={()=>{props.setProfileScreen('home')}}>
                        Back
                    </div>
                </div>
                

                <div class="profile-gamehistory-navigator-wrapper">
                    <div class="profile-gamehistory-navigator-btns" onClick={()=>{getGames(-STEPSIZE)}}>
                        <ArrowLeftIcon style={{color: "white", height: "2rem", width: "auto"}}/>
                    </div>
                    <div class="profile-gamehistory-navigator-pgnum">
                        {/* REPLACE TOTAL LENGTH w/ GAMES PLAYED OR SMTH */}
                        {gameIdx+1}-{gameIdx+currentGames.length}/{games.length}
                    </div>
                    <div class="profile-gamehistory-navigator-btns" onClick={()=>{getGames(STEPSIZE)}}>
                        <ArrowRightIcon style={{color: "white", height: "2rem", width: "auto"}}/>
                    </div>
                </div>

                <div class="profile-gamehistory-footer-wrapper-space"/>
            </div>
        </div>
    )
}

// hook for entire profile page
function Profile(props) {
    const [profileScreen, setProfileScreen] = useState('home')


    if (profileScreen === 'changeuserinfo') {
        return (
            <div class="profile-content-wrapper">
                {/* Pfp, change pfp, username, edit username */}
                <div>
                    
                </div>
            </div>
        )
    } else if (profileScreen === 'home') {
        return (
            <div class="profile-content-wrapper">
                <div class="profile-column">
                    <ProfileCard setProfileScreen={setProfileScreen}/>
                    <RatingCard/>
                </div>
                <div class="profile-column">
                    <StatsCards/>
                    <HistoryCards setProfileScreen={setProfileScreen}/>
                </div>
            </div>
        );
    } else if (profileScreen === 'gamehistory') {
        return (
            <div class="profile-content-wrapper">
                <GameHistory setProfileScreen={setProfileScreen}/>
            </div>
        )
    }
}

export default Profile;
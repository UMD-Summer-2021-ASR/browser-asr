import "../styles/Game.css";
import '../styles/WhitePanel.css';
import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import socketIOClient from "socket.io-client";
import { useRecoilState, useRecoilValue } from "recoil";
import { SCREEN, PLAY_SCREEN, PLAYERS, LOBBY_CODE, SOCKET, AUTHTOKEN, PROFILE} from "../store";
import AnswerBox from "./AnswerBox.jsx";
import PersonIcon from '@material-ui/icons/Person';

function PlayerCard(props) {
    const profile = useRecoilValue(PROFILE);
    const username = profile['username'];
    return (
        <div className={"game-playercard-wrapper " + (props.name === username ? "game-playercard-self " : "") + (props.currentlyBuzzed ? "game-playercard-buzzed-outline " : "")}>
            <div class="game-playercard-username-wrapper">
                {props.name}
                {props.name === username && <PersonIcon style={{color: "blue", marginLeft: "0.25rem"}}/>}
            </div>
            <div class="game-playercard-username-wrapper">
                {props.currentlyBuzzed && 
                    <div class="game-playercard-buzzed-timer">
                        {props.buzzTime}
                        <div class="game-playercard-buzzed-divider"></div>
                    </div>
                }
                <div class="game-playercard-points">
                    {props.points}
                </div>
            </div>
        </div>
    )
}

function PostgamePlayerCard(props) {
    const profile = useRecoilValue(PROFILE);
    const username = profile['username'];

    return (
        <div className={"game-postgame-playercard-wrapper"}>
            <div className={"game-playercard-username-wrapper" + (props.name === username ? " game-postgame-color-blue" : "")}>
                {props.name}
                {props.name === username && <PersonIcon style={{color: "blue", marginLeft: "0.25rem"}}/>}
            </div>
            <div class="game-playercard-username-wrapper">
                <div class="game-playercard-points">
                    {props.points}
                </div>
            </div>
        </div>
    )
}

function TeamCard(props) {
    if(props.points[0] === undefined) {
        const pointsArray = [];
        for(const key in props.points) {
            pointsArray.push([key, props.points[key]]);
        }
        return (
            <div className={"game-team-wrapper " +
                (props.color === "red" ? "game-team-red " : "") + 
                (props.color === "yellow" ? "game-team-yellow " : "") + 
                (props.color === "standings" ? "game-team-standings " : "")}>
                <div class="game-team-title">
                    Scoreboard
                </div>
                <div class="game-team-body">
                    {pointsArray.map(([uname, pts]) =>
                        <PlayerCard name={uname} points={pts} currentlyBuzzed={props.buzzer === uname} buzzTime={props.buzzTime}/>
                    )}
                </div>
            </div>
        )
    } else {
        const pointsArray1 = [];
        for(const key in props.points[0]) {
            pointsArray1.push([key, props.points[0][key]]);
        }
        const pointsArray2 = [];
        for(const key in props.points[1]) {
            pointsArray2.push([key, props.points[1][key]]);
        }
        return (
            <div className={"game-team-wrapper " +
                (props.color === "red" ? "game-team-red " : "") + 
                (props.color === "yellow" ? "game-team-yellow " : "") + 
                (props.color === "standings" ? "game-team-standings " : "")}>
                <div class="game-team-title">
                    Scoreboard
                </div>
                <div class="game-team-body">
                    Team 1
                    {pointsArray1.map(([uname, pts]) =>
                        <PlayerCard name={uname} points={pts} currentlyBuzzed={props.buzzer === uname} buzzTime={props.buzzTime}/>
                    )}
                    Team 2
                    {pointsArray2.map(([uname, pts]) =>
                        <PlayerCard name={uname} points={pts} currentlyBuzzed={props.buzzer === uname} buzzTime={props.buzzTime}/>
                    )}
                </div>
            </div>
        )
    }
    
    
}

function Game() {
    const profile = useRecoilValue(PROFILE);
    const username = profile['username'];
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            round: 0, 
            question: 0,
            buzzer: "",
            username: username,
            questionTime: 0,
            buzzTime: 0,
            gapTime: 0,
            inGame: true,
            answerText: "",
            socket: useRecoilValue(SOCKET),
            points: new Map([[username, 0]]),
            lobby: useRecoilValue(LOBBY_CODE),
        }
    );
    const authtoken = useRecoilValue(AUTHTOKEN)
    const [gameScreen, setGameScreen] = useState("ingame");
    const [screen, setScreen] = useRecoilState(SCREEN);

    useEffect(() => {
        const buzzerListener = data => {
            setState({buzzer: data});
        }

        const gameStateListener = data => {
            if(data[0] === false) {
                setGameScreen("postgame");
            }
            setState({
                inGame: data[0],
                round: data[1],
                question: data[2],
                questionTime: data[3].toFixed(1), // rounds to nearest tenth
                buzzTime: data[4].toFixed(1),
                gapTime: data[5].toFixed(1),
                buzzer: data[6],
                points: data[7]
            });
        }

        const answeredListener = data => {
            console.log(data);
            // this.setBuzzTime(time);
            // TODO correct animation
        }

        state.socket.on("buzzed", buzzerListener);
        state.socket.on("gamestate", gameStateListener);
        state.socket.on("answered", answeredListener);

        return function cleanSockets() {
            state.socket.off("buzzed", buzzerListener);
            state.socket.off("gamestate", gameStateListener);
            state.socket.off("answered", answeredListener);
        }
    });




    function buzz() {
        state.socket.emit("buzz", {
            auth: authtoken,
        });
    }

    function answer(txt) {
        console.log("answered");
        state.socket.emit("answer", {
            auth: authtoken,
            answer: txt
        });
    }

    
    if(gameScreen === 'ingame') {
        return (
            <div class="game1-big-white-panel-wrapper">
                <div class="game1-big-white-panel">
                    <div class="game1-content-wrapper">
                        <div class="game-content-wrapper">
    
                            <div class="game-header-wrapper">
                                <div class="game-header-rq">
                                    R: {state.round} / Q: {state.question}
                                </div>
                                <div class="game-header-time">
                                    Current: {state.questionTime} / Next in: {state.gapTime}
                                </div>
                            </div>
    
                            <div class="game-transcriptbox">
                                The transcript would stream here
                            </div>
    
                            <div class="game-menubox">
                                <AnswerBox buzz={buzz} submit={answer}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <TeamCard color="standings" points={state.points} buzzer={state.buzzer} buzzTime={state.buzzTime}/>
            </div>
        )
    } else {
        const pointsArray = [];

        for(const key in state.points) {
            pointsArray.push([key, state.points[key]]);
        }

        return (
            <div class="big-white-panel-wrapper">
                <div class="big-white-panel">
                    <div class="game-postgame-content-wrapper">
                        <div class="game-postgame-standings-title">
                            Final Standings
                        </div>
                        <div class="game-postgame-standings-wrapper">
                            {pointsArray.map(([uname, pts]) =>
                                <PostgamePlayerCard name={uname} points={pts}/>
                            )}
                        </div>
                        <div onClick={() => {setScreen(4)}} class="game-postgame-return-btn">
                            Back to home
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Game;
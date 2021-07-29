import "../styles/Game.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import socketIOClient from "socket.io-client";
import { useRecoilState } from "recoil";
import { SCREEN, PLAY_SCREEN, PLAYERS, LOBBY_CODE, SOCKET, USERNAME} from "../store";
import AnswerBox from "./AnswerBox.jsx";
import PersonIcon from '@material-ui/icons/Person';

function PlayerCard(props) {

    return (
        <div className={"game-playercard-wrapper " + (props.self ? "game-playercard-self " : "") + (props.currentlyBuzzed ? "game-playercard-buzzed-outline " : "")}>
            <div class="game-playercard-username-wrapper">
                {props.name}
                {props.self && <PersonIcon style={{color: "blue", marginLeft: "0.25rem"}}/>}
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

function TeamCard(props) {
    const [players, setPlayers] = useRecoilState(PLAYERS);
    const [username, setUsername] = useRecoilState(USERNAME);
    return (
        <div className={"game-team-wrapper " +
            (props.color === "red" ? "game-team-red " : "") + 
            (props.color === "yellow" ? "game-team-yellow " : "") + 
            (props.color === "standings" ? "game-team-standings " : "")}>
            <div class="game-team-title">
                Scoreboard
            </div>
            <div class="game-team-body">
                {players.map((uname) =>
                    <PlayerCard name={uname} self={uname===username} points={props.points[players.indexOf(uname)]} currentlyBuzzed={props.buzzer === uname}/>
                )}
            </div>
        </div>
    )
    
}

function Game() {
    const [round, setRound] = useState(0);
    const [question, setQuestion] = useState(0);
    const [buzzer, setBuzzer] = useState("");
    const [username, setUsername] = useRecoilState(USERNAME);
    const [questionTime, setQuestionTime] = useState(0);
    const [buzzTime, setBuzzTime] = useState(0);
    const [gapTime, setGapTime] = useState(0);
    const [inGame, setInGame] = useState(true);
    const [answerText, setAnswerText] = useState("");
    const [socket, setSocket] = useRecoilState(SOCKET);
    const [points, setPoints] = useState([0,0]);
    const [lobby, setLobby] = useRecoilState(LOBBY_CODE);

    socket.on("buzzed", data => {
        setBuzzer(data)
    });

    socket.on("gamestate", data => {
        setInGame(data[0]);
        setRound(data[1]);
        setQuestion(data[2]);
        setQuestionTime(data[3].toFixed(1));
        setBuzzTime(data[4].toFixed(1));
        setGapTime(data[5].toFixed(1));
        setBuzzer(data[6]);
        setPoints(data[7]);
    });

    socket.on("answered", data => {
        console.log(data);
        // this.setBuzzTime(time);
    });

    function buzz() {
        socket.emit("buzz", {
            lobby: lobby,
            username: username,
        });
    }

    function answer(txt) {
        socket.emit("answer", {
            lobby: lobby,
            username: username,
            answer: txt
        });
    }

    let interval = setInterval(() => {
        if(!inGame) {
            clearInterval(interval);
        } else {
            socket.emit('getstate', {
                lobby: lobby
            })
        }
    }, 100)

    return (
        <div class="game1-big-white-panel-wrapper">
            <div class="game1-big-white-panel">
                <div class="game1-content-wrapper">
                    <div class="game-content-wrapper">

                        <div class="game-header-wrapper">
                            <div class="game-header-rq">
                                R: {round} / Q: {question}
                            </div>
                            <div class="game-header-time">
                                Current: {questionTime} / Next in: {gapTime}
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
            <TeamCard color="standings" points={points} buzzer={buzzer}/>
        </div>
    )
}

export default Game;
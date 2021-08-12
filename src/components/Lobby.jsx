import "../styles/Lobby.css";
import React from "react";
import ReactDOM from "react-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import PersonIcon from '@material-ui/icons/Person';
import { useRecoilState, useRecoilValue } from "recoil";
import { LOBBY_CODE, SOCKET, USERNAME, PLAY_SCREEN, PLAYERS, SCREEN, AUTHTOKEN } from "../store";
import Slider from '@material-ui/core/Slider';
import Select from 'react-dropdown-select';


function Player(props) {
    return (
        <div className={"lobby-players-player-wrapper " + (props.self ? "lobby-players-player-self" : "")}>           
            {props.name}
            {props.self && <PersonIcon style={{color: "blue", marginLeft: "0.25rem"}}/>}
        </div>
    )
}

function Lobby() {
    const [lobbyCode, setLobbyCode] = useRecoilState(LOBBY_CODE);
    const socket = useRecoilValue(SOCKET);
    const username = useRecoilValue(USERNAME);
    const [playScreen, setPlayScreen] = useRecoilState(PLAY_SCREEN);
    const [players, setPlayers] = useRecoilState(PLAYERS);
    const [screen, setScreen] = useRecoilState(SCREEN);
    const authtoken = useRecoilValue(AUTHTOKEN);
    
    // Settings TODO - set to given gamesettings
    const [maxPlayers, setMaxPlayers] = useState(8);
    const [teams, setTeams] = useState(0);
    const [rounds, setRounds] = useState(3);
    const [questionsPerRound, setQuestionsPerRound] = useState(10);
    // const [tiebreaker, setTiebreaker] = useState(0);
    // topics
    const [gapTime, setGapTime] = useState(10);
    const [buzzTime, setBuzzTime] = useState(5);


    useEffect(() => {
        const lobbyStateListener = (data) => {
            setLobbyCode(data[1]);
            setPlayers(data[0]);
        };

        const gameStartedListener = (data) => {
            setScreen(6);
        };

        socket.on("lobbystate", lobbyStateListener);
        socket.on("gamestarted", gameStartedListener);

        return function cleanSockets() {
            socket.off("lobbystate");
            socket.off("gamestarted");
        }
    });
    

    function leave() {
        socket.emit("leavelobby", {
            auth: authtoken
        });
        // socket.off("lobbystate");
        socket.off("gamestarted");
        setPlayScreen(0);
    }

    function start() {
        socket.emit("startgame", {
            auth: authtoken
        });
    }

    return (
        <div class="lobby-wrapper">
            <div class="lobby-gamesettings-wrapper">
                <div class="lobby-title">
                    Game Settings
                </div>
                <div class="lobby-gamesettings-list-wrapper">
                    <div class="lobby-gamesettings-setting-wrapper">
                        <div>Max players</div>
                        <div>{maxPlayers}</div>
                    </div>
                    <div class="lobby-gamesettings-setting-wrapper">
                        <div>Teams</div>
                        <div class="lobby-gamesettings-hor-flex">
                            <div onClick={() => {setTeams(0)}} className={"lobby-gamesettings-selector-item " + (teams === 0 ? "lobby-gamesettings-selector-selected" : "")}>
                                0
                            </div>
                            <div onClick={() => {setTeams(2)}} className={"lobby-gamesettings-selector-item " + (teams === 2 ? "lobby-gamesettings-selector-selected" : "")}>
                                2
                            </div>
                        </div>
                    </div>
                    <div class="lobby-gamesettings-setting-wrapper">
                        <div>Rounds</div>
                        <div class="lobby-gamesettings-hor-flex">
                            <div class="lobby-gamesettings-slider-wrapper">
                                <Slider
                                    defaultValue={rounds}
                                    valueLabelDisplay="auto"
                                    step={2}
                                    marks
                                    min={1}
                                    max={7}
                                    value={rounds}
                                    onChange={(event, value) => {setRounds(value)}}
                                    classes={"lobby-gamesettings-slider-wrapper"}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="lobby-gamesettings-setting-wrapper">
                        <div>Questions per round</div>
                        <div class="lobby-gamesettings-hor-flex">
                            <div class="lobby-gamesettings-slider-wrapper">
                                <Slider
                                    defaultValue={questionsPerRound}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={1}
                                    max={20}
                                    value={questionsPerRound}
                                    onChange={(event, value) => {setQuestionsPerRound(value)}}
                                    classes={"lobby-gamesettings-slider-wrapper"}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="lobby-gamesettings-setting-wrapper">
                        <div>Time between questions</div>
                        <div class="lobby-gamesettings-hor-flex">
                            <div class="lobby-gamesettings-slider-wrapper">
                                <Slider
                                    defaultValue={gapTime}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={0}
                                    max={30}
                                    value={gapTime}
                                    onChange={(event, value) => {setGapTime(value)}}
                                    classes={"lobby-gamesettings-slider-wrapper"}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="lobby-gamesettings-setting-wrapper">
                        <div>Buzz time after questions</div>
                        <div class="lobby-gamesettings-hor-flex">
                            <div class="lobby-gamesettings-slider-wrapper">
                                <Slider
                                    defaultValue={buzzTime}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={0}
                                    max={10}
                                    value={buzzTime}
                                    onChange={(event, value) => {setBuzzTime(value)}}
                                    classes={"lobby-gamesettings-slider-wrapper"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lobby-gamesettings-buttons-wrapper">
                    <div class="lobby-gamesettings-button" onClick={start}>
                        START
                    </div>
                    <div class="lobby-gamesettings-button" onClick={leave}>
                        QUIT
                    </div>
                </div>
            </div>
            <div class="lobby-players-wrapper">
                <div class="lobby-title">
                    <div>
                        Players {players.length}/{maxPlayers}
                    </div>
                    <div>
                        Room: {lobbyCode}
                    </div>
                </div>
                <div class="lobby-players-list-wrapper">
                {players.map((uname) =>
                    <Player name={uname} self={uname===username} key={uname}/>
                )}
                </div>
            </div>
        </div>
    );
}

export default Lobby;
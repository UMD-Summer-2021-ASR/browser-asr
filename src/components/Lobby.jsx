import "../styles/Lobby.css";
import React from "react";
import ReactDOM from "react-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import PersonIcon from '@material-ui/icons/Person';
import { useRecoilState, useRecoilValue } from "recoil";
import { LOBBY_CODE, SOCKET, USERNAME, PLAY_SCREEN, PLAYERS, SCREEN } from "../store";

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

    useEffect(() => {
        const lobbyStateListener = (data) => {
            setLobbyCode(data[1]);
            setPlayers(data[0]);
        };

        const gameStartedListener = (data) => {
            console.log(data)
            setScreen(6);
        };

        socket.on("lobbystate", lobbyStateListener);
        socket.on("gamestarted", gameStartedListener);

        return function cleanSockets() {
            socket.off("lobbystate", lobbyStateListener);
            socket.off("gamestarted", gameStartedListener);
        }
    });
    

    function leave() {
        socket.emit("leavelobby", {
            lobby: lobbyCode,
            username: username
        });
        setPlayScreen(0);
    }

    function start() {
        socket.emit("startgame", {
            lobby: lobbyCode
        });
    }

    return (
        <div class="lobby-wrapper">
            <div class="lobby-gamesettings-wrapper">
                <div class="lobby-title">
                    Game Settings
                </div>
                <div class="lobby-gamesettings-list-wrapper">

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
                        Players
                    </div>
                    <div>
                        Room: {lobbyCode}
                    </div>
                </div>
                <div class="lobby-players-list-wrapper">
                {players.map((uname) =>
                    <Player name={uname} self={uname===username}/>
                )}
                </div>
            </div>
        </div>
    );
}

export default Lobby;
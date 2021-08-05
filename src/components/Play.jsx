import "../styles/Play.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from 'react-bootstrap';
import { useRecoilState } from "recoil";
import { JOIN_CUSTOM_LOBBY_SCREEN, USERNAME, SOCKET, LOBBY_CODE, PLAY_SCREEN, PLAYERS } from "../store";
import JoinCustomLobbyModal from "./JoinCustomLobbyModal";
import { useEffect } from "react";

// ASSETS

class gameSettings {
    
    constructor({
        title = "Practice",
        description = "A solo gamemode designed for individual practice.",
        cost = "1 energy per question",
        maxPlayers = "1",
        teams = "1",
        timeBetweenQuestions = "5s",
        buzzTimeAfterQuestions = "5s",
        topics = "All",
        rounds = "1",
        questionsPerRound = "20",
        isTextDisabled = "No",
        tiebreaker = "None"
    }) {
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.maxPlayers = maxPlayers;
        this.teams = teams;
        this.timeBetweenQuestions = timeBetweenQuestions;
        this.buzzTimeAfterQuestions = buzzTimeAfterQuestions;
        this.topics = topics;
        this.rounds = rounds;
        this.questionsPerRound = questionsPerRound;
        this.isTextDisabled = isTextDisabled;
        this.tiebreaker = tiebreaker;
    }
}

const gameSettingsList = [
    new gameSettings({}),
    new gameSettings({ // gamemode = 1 (ranked 1v1)
        title: "Ranked 1v1",
        description: "Compete against other players to climb the ladder and earn rating!",
        cost: "10 energy per game",
        maxPlayers: "2",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "5",
        isTextDisabled: "No",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 2 (ranked 2v2)
        title: "Ranked 2v2",
        description: "Compete against other players in teams of 2 to climb the ladder and earn rating!",
        cost: "10 energy per game",
        maxPlayers: "4",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "5",
        isTextDisabled: "Yes",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 3 (1v1 custom)
        title: "Casual 1v1",
        description: "Preset to play against friends in a blitz 1v1 (all settings can be modified in the lobby)",
        cost: "10 energy per player per game",
        maxPlayers: "2",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "5",
        isTextDisabled: "Yes",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 4 (4v4 custom)
        title: "Casual 4v4",
        description: "Preset to play a full 20-30 minute game against friends in a casual 4v4 (all settings can be modified in the lobby)",
        cost: "40 energy per player per game",
        maxPlayers: "8",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "25",
        isTextDisabled: "No",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 5 (Custom)
        title: "Custom Lobby",
        description: "Play with friends in a completely custom lobby (all settings can be modified in the lobby)",
        cost: "Varies",
        maxPlayers: "2-8",
        teams: "2-4",
        timeBetweenQuestions: "0-60s",
        buzzTimeAfterQuestions: "0-20s",
        topics: "All",
        rounds: "1-7",
        questionsPerRound: "1-30",
        isTextDisabled: "No",
        tiebreaker: "Tiebreaker question"
    }),
];

function JoinCustomLobbyButton() {
    const [show, setShow] = useRecoilState(JOIN_CUSTOM_LOBBY_SCREEN);
    const handleShow = () => setShow(true);

    return (
        <>
            <div class="play-description-join" onClick={handleShow}>
                JOIN
            </div>
            <JoinCustomLobbyModal/>
        </>
    )
}

function StartCustomLobbyButton() {
    const [socket, setSocket] = useRecoilState(SOCKET);
    const [username, setUsername] = useRecoilState(USERNAME);
    const [lobbyCode, setLobbyCode] = useRecoilState(LOBBY_CODE);
    const [playScreen, setPlayScreen] = useRecoilState(PLAY_SCREEN);
    const [players, setPlayers] = useRecoilState(PLAYERS);

    useEffect(() => {
        const lobbyStateListener = (data) => {
            setLobbyCode(data[1]);
            setPlayers(data[0]);
            setPlayScreen(1);
        }

        socket.on("lobbystate", lobbyStateListener);

        return function cleanSockets() {
            socket.off("lobbystate", lobbyStateListener);
        }
    });

    function StartLobby() {
        socket.emit("startlobby", {
            username: username,
        });
        socket.emit("test", {
            testboolean: [true, true, false, false],
        });
    }

    return (
        <div class="play-description-start" onClick={StartLobby}>
            START LOBBY
        </div>
    )
}

// name = display name, gamemode = gamemode state, layer = layer of button, self = which button on the layer is it
function gamemodeBtn(props) {
    return (
        <div className={"play-gamemode-btn " + (props.gamemode[props.layer] === props.self ? "play-gamemode-btn-selected" : "")}>
            {props.name}
        </div>
    );
}

function Play(props) {
    const [gamemode, setGamemode] = useState([0,0]);

    return (
        <div class="play-content-wrapper">
            <div class="play-gamemode-wrapper">
                <gamemodeBtn name={"Casual"} self={0} layer={0} gamemode={gamemode}/>
                <div class="play-gamemode-btn">
                    Ranked
                </div>
                <div class="play-gamemode-btn">
                    Solo
                </div>
                <div class="play-gamemode-btn">
                    Custom
                </div>
            </div>
        </div>
    );
}

export default Play;
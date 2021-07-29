import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/JoinCustomLobbyModal.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useRecoilState } from "recoil";
import socketIOClient from "socket.io-client";
import { JOIN_CUSTOM_LOBBY_SCREEN, LOBBY_CODE, SOCKET, USERNAME, PLAY_SCREEN, PLAYERS } from "../store";

function JoinCustomLobbyModal() {
    const [show, setShow] = useRecoilState(JOIN_CUSTOM_LOBBY_SCREEN);
    const [text, setText] = useState("");
    const [lobbyCode, setLobbyCode] = useRecoilState(LOBBY_CODE);
    const [socket, setSocket] = useRecoilState(SOCKET);
    const [username, setUsername] = useRecoilState(USERNAME);
    const [playScreen, setPlayScreen] = useRecoilState(PLAY_SCREEN);
    const [players, setPlayers] = useRecoilState(PLAYERS);

    const handleClose = () => setShow(false);

    function handleJoin() {
        setPlayScreen(1);
        setShow(false);
        socket.emit("joinlobby", {
            lobby: text,
            username: username
        });
    }

    function handleText(event) {
        setText(event.target.value);
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                Join a custom lobby
            </Modal.Header>
            <Modal.Body>
            <label>
                Lobby code:
                <input type="text" value={text} onChange={handleText} class="joincustomlobbymodal-textbox"/>
            </label>
            </Modal.Body>
            <Modal.Footer>
                <div class="joincustomlobbymodal-button-join" onClick={handleJoin}>
                    Join
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default JoinCustomLobbyModal;
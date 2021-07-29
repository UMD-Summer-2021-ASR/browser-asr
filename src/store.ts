import { atom } from "recoil";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000"; // change to real endpoint
function makeUsername(length) {
    var result           = 'guest';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

const AUDIO_BLOB = atom<Blob | undefined>({
    key: 'AUDIO_BLOB',
    default: undefined
})

const TEXT = atom<String>({
    key: 'ASR',
    default: ""
})

const SCREEN = atom({
    key: 'SCREEN',
    default: 2
})

const PLAY_SCREEN = atom({
    key: 'PLAY_SCREEN',
    default: 0
})

const JOIN_CUSTOM_LOBBY_SCREEN = atom({
    key: 'JOIN_CUSTOM_LOBBY_SCREEN',
    default: false
})

const LOBBY_CODE = atom({
    key: 'LOBBY_CODE',
    default: ""
})

const USERNAME = atom({
    key: 'USERNAME',
    default: makeUsername(5)
})

const SOCKET = atom({
    key: 'SOCKET',
    default: socketIOClient(ENDPOINT)
})

const PLAYERS = atom({
    key: 'PLAYERS',
    default: [""]
})

export { AUDIO_BLOB, TEXT, SCREEN, PLAY_SCREEN, JOIN_CUSTOM_LOBBY_SCREEN, LOBBY_CODE, USERNAME, SOCKET, PLAYERS }


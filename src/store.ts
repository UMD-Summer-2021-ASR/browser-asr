import { atom } from "recoil";

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
    default: 7
})

export { AUDIO_BLOB, TEXT, SCREEN }


import { atom } from "recoil";

const AUDIO_BLOB = atom<Blob | undefined>({
    key: 'AUDIO_BLOB',
    default: undefined
})
const TEXT = atom<String>({
    key: 'ASR',
    default: ""
})
export { AUDIO_BLOB, TEXT }
import "../styles/AnswerBox.css";
import {React, useState} from 'react'
import ReactDOM from "react-dom";
import {useOnlineAnswering} from 'online-answering'

function AnswerBox(props) {
    const [ready, setReady] = useState(false)
    useOnlineAnswering({
        keywords: { buzzin: 'Listen', buzzout: 'Submit' },
        audio: {
        buzzin:
            'https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav',
        buzzout:
            'https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav'
        },
        timeout: 10000,
        isReady: ready,
        onComplete: async (answer) => window.alert(answer),
        onBuzzin: () => console.log('Buzzin')
    })

    return (
        <div>
            <button onClick={() => setReady(true)}>START</button>
            <button onClick={() => setReady(false)}>STOP</button>
        </div>
    )
}

export default AnswerBox;
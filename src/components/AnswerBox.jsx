import "../styles/AnswerBox.css";
import {React, useState} from 'react'
import ReactDOM from "react-dom";
import {useOnlineAnswering} from 'online-answering'
import Switch from "react-switch";

const VoiceBuzzSwitch = (props) => {
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
        props.setVoice(nextChecked);
    };
  
    return (
      <div>
        <label class="answerbox-toggle-wrapper">
          <span>Toggle voice buzzing</span>
          <Switch
            onChange={handleChange}
            checked={checked}
            className={"answerbox-toggle-content"}
          />
        </label>
      </div>
    );
  };

function AnswerBox(props) {
    const [ready, setReady] = useState(false)
    const [answer, setAnswer] = useState("")
    const [listening, setListening] = useState(false)
    
    function complete(answer) {
        setAnswer(answer.substr(answer.indexOf(" ") + 1)); // drops the "listen" off
        setListening(false);
    }

    function setAnswer2(event) {
        setAnswer(event.target.value);
    }

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
        onComplete: async (answer) => complete(answer),
        onBuzzin: () => setListening(true)
    })

    return (
        <div class="answerbox-wrapper">
            <form class="answerbox-textbox">
                <label>
                    <input type="text" name="name" value={answer} onChange={setAnswer2} className={"answerbox-textbox-text"}/>
                </label>
            </form>
            <VoiceBuzzSwitch setVoice={setReady}/>
        </div>
    )
}

export default AnswerBox;
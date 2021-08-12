import "../styles/AnswerBox.css";
import {React, useState} from 'react'
import ReactDOM from "react-dom";
import {useOnlineAnswering} from 'online-answering'
import Switch from "react-switch";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicOff from "@material-ui/icons/MicOff";

const VoiceBuzzSwitch = (props) => {
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
        props.setVoice(nextChecked);
    };
  
    return (
      <div>
        <label class="answerbox-toggle-wrapper">
          <Switch
            onChange={handleChange}
            checked={checked}
            className={"answerbox-toggle-content"}
            checkedIcon={<MicIcon style={{color: "white", width: "100%", height: "100%", position: "absolute", top: 0}}/>}
            uncheckedIcon={<MicOffIcon style={{color: "white", width: "100%", height: "100%", position: "absolute", top: 0}}/>}
          />
        </label>
      </div>
    );
  };

function AnswerBox(props) {
    const [ready, setReady] = useState(false)
    const [answer, setAnswer] = useState("")
    const [listening, setListening] = useState(false)
    const [currentlyBuzzed, setCurrentlyBuzzed] = useState(false)
    
    function complete(answer) {
        setAnswer(answer.substr(answer.indexOf(" ") + 1)); // drops the "listen" off
        setListening(false);
    }

    function setAnswer2(event) {
        setAnswer(event.target.value);
    }

    function buzzin() {
        console.log("buzzed");
        props.buzz();
    }

    function submit() {
        props.submit(answer);
        setAnswer("");
    }

    function handleVoiceBuzzin() {
        setListening(true);
        buzzin();
    }

    useOnlineAnswering({
        audio: {
          buzzin:
            'https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav',
          buzzout:
            'https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav'
        },
        onAudioData: () => {},
        timeout: 3000,
        isReady: ready,
        onComplete: async (answer, blob) => {
            complete(answer);
            console.log(blob);
        },
        onBuzzin: () => handleVoiceBuzzin()
      });

    // useOnlineAnswering({
    //     keywords: { buzzin: 'Listen', buzzout: 'Submit' },
    //     audio: {
    //     buzzin:
    //         'https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav',
    //     buzzout:
    //         'https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav'
    //     },
    //     timeout: 10000,
    //     isReady: ready,
    //     onComplete: async (answer) => complete(answer),
    //     onBuzzin: () => setListening(true)
    // })

    return (
        <div class="answerbox-answering-wrapper">
            <form class="answerbox-textbox">
                <label>
                    <input type="text" name="name" value={answer} onChange={setAnswer2} className={"answerbox-textbox-text"}/>
                </label>
            </form>
            <VoiceBuzzSwitch setVoice={setReady}/>
            <div class="answerbox-button" onClick={buzzin}>
                Buzz
            </div>
            <div class="answerbox-button" onClick={submit}>
                Submit
            </div>
        </div>
    )
}

export default AnswerBox;
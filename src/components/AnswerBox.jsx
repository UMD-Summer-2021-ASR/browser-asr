import "../styles/AnswerBox.css";
import {React, useState, useEffect, useRef} from 'react'
import ReactDOM from "react-dom";
import {useOnlineAnswering} from 'online-answering'
import Switch from "react-switch";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicOff from "@material-ui/icons/MicOff";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Close';
import { useRecoilState, useRecoilValue } from "recoil";
import { AUTHTOKEN, PROFILE } from "../store";
import {
  Tooltip,
} from 'react-tippy';
import axios from "axios";

// Switch that toggles voice buzzin
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

// switch that toggles the classifier
const UseClassifierSwitch = (props) => {
  const [checked, setChecked] = useState(false);
  const handleChange = nextChecked => {
      setChecked(nextChecked);
      props.setVoice(nextChecked);
  };

  return (
    <div>
      <label class="answerbox-toggle-wrapper-2">
        <Switch
          onChange={handleChange}
          checked={checked}
          className={"answerbox-toggle-content-2"}
          checkedIcon={<DoneOutlineIcon style={{color: "white", width: "100%", height: "100%", position: "absolute", top: 0}}/>}
          uncheckedIcon={<CloseIcon style={{color: "white", width: "100%", height: "100%", position: "absolute", top: 0}}/>}
        />
      </label>
    </div>
  );
};


// Legacy function that enables you to store previous state values
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}


// Hook for the answer box at the bottom of all games
function AnswerBox(props) {
    const profile = useRecoilValue(PROFILE);
    const username = profile['username'];
    const URLS = useRecoilValue(URLS);
    const AUTHTOKEN = useRecoilValue(AUTHTOKEN);

    const [answer, setAnswer] = useState("");
    const [ready, setReady] = useState(false);
    const [useClassifier, setUseClassifier] = useState(false);
    const prevQuestionTime = usePrevious(props.questionTime)
    
    // ASR always picks up the wake word, this function removes it
    function complete(answer) {
        setAnswer(answer.substr(answer.indexOf(" ") + 1));
    }

    // Sets answer when typed
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
            if(setUseClassifier) {
              const formdata = new FormData();
              formdata.append("audio", blob);
              formdata.append("auth", AUTHTOKEN);

              //POST TO CLASSIFIER SERVER
              axios.post(URLS['classifier'] + '/check', 
                formdata
              );
            } else {
              complete(answer);
            }
        },
        onBuzzin: () => buzzin()
      });

    return (
        <div class="answerbox-answering-wrapper">
            <form class="answerbox-textbox">
                <label>
                    <input type="text" name="name" value={answer} onChange={setAnswer2} className={"answerbox-textbox-text"}/>
                </label>
            </form>
            <div class="answerbox-switch-wrapper">
              <Tooltip
                // options
                title="Use voice commands"
                position="top"
                trigger="mouseenter"
                unmountHTMLWhenHide="true"
              >
                <VoiceBuzzSwitch setVoice={setReady}/>
              </Tooltip>
              {ready && 
                <div>
                  <Tooltip
                    // options
                    title="Use classifier"
                    position="top"
                    trigger="mouseenter"
                    unmountHTMLWhenHide="true"
                  >
                    <UseClassifierSwitch setVoice={setUseClassifier}/>
                  </Tooltip>
                </div>
              }
                
            </div>
            
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
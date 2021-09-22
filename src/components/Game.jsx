import "../styles/Game.css";
import "../styles/WhitePanel.css";
import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import socketIOClient from "socket.io-client";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  SCREEN,
  PLAY_SCREEN,
  PLAYERS,
  LOBBY_CODE,
  SOCKET,
  AUTHTOKEN,
  PROFILE,
  URLS,
} from "../store";
import AnswerBox from "./AnswerBox.jsx";
import PersonIcon from "@material-ui/icons/Person";
import { useQuestion } from "online-answering";
import { Tooltip } from "react-tippy";
import axios from "axios";

// player display w/ score in-game
function PlayerCard(props) {
  const profile = useRecoilValue(PROFILE);
  const username = profile["username"];
  return (
    <div
      className={
        "game-playercard-wrapper " +
        (props.name === username ? "game-playercard-self " : "") +
        (props.currentlyBuzzed ? "game-playercard-buzzed-outline " : "")
      }
    >
      <div class="game-playercard-username-wrapper">
        {props.name}
        {props.name === username && (
          <Tooltip
            // options
            title="This is you"
            position="top"
            trigger="mouseenter"
            unmountHTMLWhenHide="true"
          >
            <PersonIcon style={{ color: "blue", marginLeft: "0.25rem" }} />
          </Tooltip>
        )}
      </div>
      <div class="game-playercard-username-wrapper">
        {props.currentlyBuzzed && (
          <div class="game-playercard-buzzed-timer">
            {props.buzzTime}
            <div class="game-playercard-buzzed-divider"></div>
          </div>
        )}
        <div class="game-playercard-points">{props.points}</div>
      </div>
    </div>
  );
}

// player display w/ score post-game
function PostgamePlayerCard(props) {
  const profile = useRecoilValue(PROFILE);
  const username = profile["username"];

  return (
    <div className={"game-postgame-playercard-wrapper"}>
      <div
        className={
          "game-playercard-username-wrapper" +
          (props.name === username ? " game-postgame-color-blue" : "")
        }
      >
        {props.name}
        {props.name === username && (
          <Tooltip
            // options
            title="This is you"
            position="top"
            trigger="mouseenter"
            unmountHTMLWhenHide="true"
          >
            <PersonIcon style={{ color: "blue", marginLeft: "0.25rem" }} />
          </Tooltip>
        )}
      </div>
      <div class="game-playercard-username-wrapper">
        <div class="game-playercard-points">{props.points}</div>
      </div>
    </div>
  );
}

// teamcard wrapping playercards
function TeamCard(props) {
  if (props.points[0] === undefined) {
    const pointsArray = [];
    for (const key in props.points) {
      pointsArray.push([key, props.points[key]]);
    }
    return (
      <div
        className={
          "game-team-wrapper " +
          (props.color === "red" ? "game-team-red " : "") +
          (props.color === "yellow" ? "game-team-yellow " : "") +
          (props.color === "standings" ? "game-team-standings " : "")
        }
      >
        <div class="game-team-title">Scoreboard</div>
        <div class="game-team-body">
          {pointsArray.map(([uname, pts]) => (
            <PlayerCard
              name={uname}
              points={pts}
              currentlyBuzzed={props.buzzer === uname}
              buzzTime={props.buzzTime}
            />
          ))}
        </div>
      </div>
    );
  } else {
    const pointsArray1 = [];
    let team1pts = 0;
    let team2pts = 0;
    for (const key in props.points[0]) {
      pointsArray1.push([key, props.points[0][key]]);
      team1pts += props.points[0][key];
    }
    const pointsArray2 = [];
    for (const key in props.points[1]) {
      pointsArray2.push([key, props.points[1][key]]);
      team2pts += props.points[1][key];
    }
    return (
      <div
        className={
          "game-team-wrapper " +
          (props.color === "red" ? "game-team-red " : "") +
          (props.color === "yellow" ? "game-team-yellow " : "") +
          (props.color === "standings" ? "game-team-standings " : "")
        }
      >
        <div class="game-team-title">Scoreboard</div>
        <div class="game-team-body">
          <div>
            Team 1 - {team1pts}
            {pointsArray1.map(([uname, pts]) => (
              <PlayerCard
                name={uname}
                points={pts}
                currentlyBuzzed={props.buzzer === uname}
                buzzTime={props.buzzTime}
              />
            ))}
          </div>
          <div>
            Team 2 - {team2pts}
            {pointsArray2.map(([uname, pts]) => (
              <PlayerCard
                name={uname}
                points={pts}
                currentlyBuzzed={props.buzzer === uname}
                buzzTime={props.buzzTime}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// game hook
function Game() {
  const profile = useRecoilValue(PROFILE);
  const username = profile["username"];
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      round: 0,
      question: 0,
      buzzer: "",
      username: username,
      questionTime: 0,
      buzzTime: 0,
      gapTime: 0,
      inGame: true,
      answerText: "",
      socket: useRecoilValue(SOCKET),
      points: new Map([[username, 0]]),
      lobby: useRecoilValue(LOBBY_CODE),
    }
  );
  const authtoken = useRecoilValue(AUTHTOKEN);
  const [gameScreen, setGameScreen] = useState("ingame");
  const [screen, setScreen] = useRecoilState(SCREEN);
  const [playScreen, setPlayScreen] = useRecoilState(PLAY_SCREEN);

  // for HLS
  const [token, setToken] = useState("");
  const [rid, setRid] = useState("");
  const [classifiable, setClassifiable] = useState(true);

  // URLS
  const urls = useRecoilValue(URLS);

  // ANSWER BOX
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    const buzzerListener = (data) => {
      var video = document.getElementById("hls");
      video.pause();
      setState({ buzzer: data });
    };

    const gameStateListener = (data) => {
      if (data[0] === false) {
        setGameScreen("postgame");
      }
      setState({
        inGame: data[0],
        round: data[1],
        question: data[2],
        questionTime: data[3].toFixed(1), // rounds to nearest tenth
        buzzTime: data[4].toFixed(1),
        gapTime: data[5].toFixed(1),
        buzzer: data[6],
        points: data[7],
      });
    };

    const answeredIncorrectlyListener = (data) => {
      var video = document.getElementById("hls");
      video.play();
      console.log(data);
      // this.setBuzzTime(time);
      // TODO correct animation
    };

    const answeredCorrectlyListener = (data) => {
      var video = document.getElementById("hls");
      video.play();
      console.log(data);
      // this.setBuzzTime(time);
      // TODO correct animation
    };

    const hlsListener = (data) => {
      var div = document.getElementById("transcript-box");
      if (div) div.innerHTML = "";
      console.log(data["token"]);
      console.log(data["rid"]);
      setToken(data["token"]);
      setRid(data["rid"]);
      setClassifiable(data["classifiable"]);
      setAnswerText("");
    };

    const hlsPlayListener = (data) => {
      var video = document.getElementById("hls");
      video.play();
    };

    state.socket.on("buzzed", buzzerListener);
    state.socket.on("gamestate", gameStateListener);
    state.socket.on("answeredincorrectly", answeredIncorrectlyListener);
    state.socket.on("answeredcorrectly", answeredCorrectlyListener);
    state.socket.on("hlsupdate", hlsListener);
    state.socket.on("hlsplay", hlsPlayListener);

    return function cleanSockets() {
      state.socket.off("buzzed", buzzerListener);
      state.socket.off("gamestate", gameStateListener);
      state.socket.off("answeredincorrectly", answeredIncorrectlyListener);
      state.socket.off("answeredcorrectly", answeredCorrectlyListener);
      state.socket.off("hlsupdate", hlsListener);
      state.socket.off("hlsplay", hlsPlayListener);
    };
  });

  useEffect(() => {});

  const [hls, isParsed] = useQuestion({
    onCue: (cue) => {
      var div = document.getElementById("transcript-box");
      let splitarr = div.innerHTML.split(" ");
      if (cue === splitarr[splitarr.length - 1]) {
        return;
      }

      if (div) div.innerHTML = div.innerHTML + "  \n" + cue;
    },
    backend_url: urls["HLS"] + "/hls",
    recording_id: rid,
    token: token,
    header: "x-gostreamer-token",
    mediaId: "hls",
    listeners: {
      seeking: false,
    },
  });

  function buzz() {
    state.socket.emit("buzz", {
      auth: authtoken,
    });
  }

  function answer(txt) {
    console.log("answered");
    state.socket.emit("answer", {
      auth: authtoken,
      answer: txt,
    });
  }

  if (gameScreen === "ingame") {
    return (
      <div class="game1-big-white-panel-wrapper">
        <div>
          <div>
            <video id="hls" controls hidden></video>
          </div>
        </div>

        <div class="game1-big-white-panel">
          <div class="game1-content-wrapper">
            <div class="game-content-wrapper">
              <div class="game-header-wrapper">
                <div class="game-header-rq">
                  R: {state.round} / Q: {state.question}
                </div>
                <div class="game-header-time">
                  Current: {state.questionTime} / Next in: {state.gapTime}
                </div>
              </div>

              <div class="game-transcriptbox" id="transcript-box"></div>

              <div class="game-menubox">
                <button
                  onClick={() => {
                    var video = document.getElementById("hls");
                    console.log("Triggering Play");
                    video.play();
                  }}
                >
                  PLAY{" "}
                </button>
                <AnswerBox
                  buzz={buzz}
                  buzzer={state.buzzer}
                  submit={answer}
                  questionTime={state.questionTime}
                  state={state}
                  classifiable={classifiable}
                  answer={answerText}
                  setAnswer={setAnswerText}
                />
              </div>
            </div>
          </div>
        </div>
        <TeamCard
          color="standings"
          points={state.points}
          buzzer={state.buzzer}
          buzzTime={state.buzzTime}
        />
      </div>
    );
  } else {
    if (state.points[0] === undefined) {
      const pointsArray = [];

      for (const key in state.points) {
        pointsArray.push([key, state.points[key]]);
      }

      return (
        <div class="big-white-panel-wrapper">
          <div class="big-white-panel">
            <div class="game-postgame-content-wrapper">
              <div class="game-postgame-standings-title">Final Standings</div>
              <div class="game-postgame-standings-wrapper">
                {pointsArray.map(([uname, pts]) => (
                  <PostgamePlayerCard name={uname} points={pts} />
                ))}
              </div>
              <div
                onClick={() => {
                  setPlayScreen(0);
                  setScreen(3);
                }}
                class="game-postgame-return-btn"
              >
                Back to home
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const pointsArray1 = [];
      const pointsArray2 = [];
      let team1pts = 0;
      let team2pts = 0;
      for (const key in state.points[0]) {
        pointsArray1.push([key, state.points[0][key]]);
        team1pts += state.points[0][key];
      }
      for (const key in state.points[1]) {
        pointsArray2.push([key, state.points[1][key]]);
        team2pts += state.points[1][key];
      }

      return (
        <div class="big-white-panel-wrapper">
          <div class="big-white-panel">
            <div class="game-postgame-content-wrapper">
              <div class="game-postgame-standings-title">Final Standings</div>
              <div class="game-postgame-standings-wrapper">
                Team 1 - {team1pts}
                {pointsArray1.map(([uname, pts]) => (
                  <PostgamePlayerCard name={uname} points={pts} />
                ))}
                Team 2 - {team2pts}
                {pointsArray2.map(([uname, pts]) => (
                  <PostgamePlayerCard name={uname} points={pts} />
                ))}
              </div>
              <div
                onClick={() => {
                  setPlayScreen(0);
                  setScreen(3);
                }}
                class="game-postgame-return-btn"
              >
                Back to home
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Game;

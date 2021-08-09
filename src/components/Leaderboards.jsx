import "../styles/Leaderboards.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";

// ASSETS
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

function User(props) {
    return (
        <div class="leaderboards-board-user-wrapper">
            <div class="leaderboards-board-user-rank">
                {props.rank}
            </div>
            <div class="leaderboards-board-user-name">
                {props.username}
            </div>
            <div class="leaderboards-board-user-rating">
                {props.rating}
            </div>
        </div>
    );
}

function Topic(props) {
    return (
        <div className={"leaderboards-topic-wrapper " + (props.self === props.topic ? "leaderboards-topic-wrapper-selected" : "")}
         onClick={() => {props.setTopic(props.self)}}
         >
            <div class="leaderboards-topic-name">
                {props.name}
            </div>

            <div>
                #{props.rank} / {props.percentile}%
            </div>
        </div>
    )
}

function Leaderboards() {
    const [topic, setTopic] = useState("all");
    return (
        <div class="leaderboards-content-wrapper">
            <div class="leaderboards-board-wrapper">
                <div class="leaderboards-board-title">
                    <EmojiEventsIcon style={{color: "#6287F6", marginRight: "0.5rem"}}/>
                    Global Leaderboards
                </div>
                <div class="leaderboards-board-content-wrapper-wrapper">
                    <div class="leaderboards-board-content-wrapper">
                        <User rank="1" rating={3798} username="bob1"/>
                        <User rank="2" rating={3564} username="bob2"/>
                        <User rank="3" rating={3543} username="bob3"/>
                        <User rank="4" rating={3489} username="bob4"/>
                        <User rank="5" rating={3401} username="bob5"/>
                        <User rank="6" rating={3391} username="bob6"/>
                        <User rank="7" rating={3364} username="bob7"/>
                        <User rank="8" rating={3362} username="bob8"/>
                        <User rank="9" rating={3351} username="bob9"/>
                        <User rank="10" rating={3340} username="bob10"/>
                    </div>
                </div>
                
            </div>
            <div class="leaderboards-topics-content-wrapper">
                <div class="leaderboards-topics-title">
                    Topics
                </div>
                <div class="leaderboards-topics-title-divider"></div>
                <div class="leaderboards-topic-list-wrapper">
                    <Topic name="Overall" rank={5} percentile={0.02} self={"all"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Current Events" rank={5} percentile={0.02} self={"currentevents"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Fine Arts" rank={5} percentile={0.02} self={"finearts"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Geography" rank={5} percentile={0.02} self={"geography"} topic={topic} setTopic={setTopic}/>
                    <Topic name="History" rank={5} percentile={0.02} self={"history"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Literature" rank={5} percentile={0.02} self={"literature"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Mythology" rank={5} percentile={0.02} self={"mythology"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Philosophy" rank={5} percentile={0.02} self={"philosophy"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Religion" rank={5} percentile={0.02} self={"religion"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Science" rank={5} percentile={0.02} self={"science"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Social Science" rank={5} percentile={0.02} self={"socialscience"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Trash" rank={5} percentile={0.02} self={"trash"} topic={topic} setTopic={setTopic}/>
                </div>
            </div>
        </div>
    );
}

export default Leaderboards;
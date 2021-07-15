import "../styles/Play.css";
import React from "react";
import ReactDOM from "react-dom";

// ASSETS

class gameSettings {
    
    constructor({
        title = "Practice",
        description = "A solo, infinite gamemode designed for individual practice.",
        cost = "1 energy per question",
        maxPlayers = "1",
        teams = "1",
        timeBetweenQuestions = "5s",
        buzzTimeAfterQuestions = "5s",
        topics = "All",
        rounds = "1",
        questionsPerRound = "Infinite",
        isTextDisabled = "No",
        tiebreaker = "None"
    }) {
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.maxPlayers = maxPlayers;
        this.teams = teams;
        this.timeBetweenQuestions = timeBetweenQuestions;
        this.buzzTimeAfterQuestions = buzzTimeAfterQuestions;
        this.topics = topics;
        this.rounds = rounds;
        this.questionsPerRound = questionsPerRound;
        this.isTextDisabled = isTextDisabled;
        this.tiebreaker = tiebreaker;
    }
}

class Play extends React.Component {
    constructor(props) {
        super(props);
        // 0 = solo, 1 = ranked 1v1, 2 = ranked 2v2, 3 = 1v1 custom, 4 = 4v4 custom, 5 = complete custom
        this.state = {gamemode: 0, 
            gameSettingsList: [
                new gameSettings({}),
                new gameSettings({ // gamemode = 1 (ranked 1v1)
                    title: "Ranked 1v1",
                    description: "Compete against other players to climb the ladder and earn rating!",
                    cost: "10 energy per game",
                    maxPlayers: "2",
                    teams: "2",
                    timeBetweenQuestions: "5s",
                    buzzTimeAfterQuestions: "5s",
                    topics: "All",
                    rounds: "3",
                    questionsPerRound: "5",
                    isTextDisabled: "No",
                    tiebreaker: "Tiebreaker question"
                }),
                new gameSettings({ // gamemode = 2 (ranked 2v2)
                    title: "Ranked 2v2",
                    description: "Compete against other players in teams of 2 to climb the ladder and earn rating!",
                    cost: "10 energy per game",
                    maxPlayers: "4",
                    teams: "2",
                    timeBetweenQuestions: "5s",
                    buzzTimeAfterQuestions: "5s",
                    topics: "All",
                    rounds: "3",
                    questionsPerRound: "5",
                    isTextDisabled: "Yes",
                    tiebreaker: "Tiebreaker question"
                }),
                new gameSettings({ // gamemode = 3 (1v1 custom)
                    title: "Casual 1v1",
                    description: "Preset to play against friends in a blitz 1v1 (all settings can be modified in the lobby)",
                    cost: "10 energy per player per game",
                    maxPlayers: "2",
                    teams: "2",
                    timeBetweenQuestions: "5s",
                    buzzTimeAfterQuestions: "5s",
                    topics: "All",
                    rounds: "3",
                    questionsPerRound: "5",
                    isTextDisabled: "Yes",
                    tiebreaker: "Tiebreaker question"
                }),
                new gameSettings({ // gamemode = 4 (4v4 custom)
                    title: "Casual 4v4",
                    description: "Preset to play a full 20-30 minute game against friends in a casual 4v4 (all settings can be modified in the lobby)",
                    cost: "40 energy per player per game",
                    maxPlayers: "8",
                    teams: "2",
                    timeBetweenQuestions: "5s",
                    buzzTimeAfterQuestions: "5s",
                    topics: "All",
                    rounds: "3",
                    questionsPerRound: "25",
                    isTextDisabled: "No",
                    tiebreaker: "Tiebreaker question"
                }),
                new gameSettings({ // gamemode = 5 (Custom)
                    title: "Custom Lobby",
                    description: "Play with friends in a completely custom lobby (all settings can be modified in the lobby)",
                    cost: "Varies",
                    maxPlayers: "2-8",
                    teams: "2-4",
                    timeBetweenQuestions: "0-60s",
                    buzzTimeAfterQuestions: "0-20s",
                    topics: "All",
                    rounds: "1-7",
                    questionsPerRound: "1-30",
                    isTextDisabled: "No",
                    tiebreaker: "Tiebreaker question"
                }),
            ]
        } 
    }

    setGamemode(newGM) {
        this.setState({
            gamemode: newGM
        })
    }

    render() {
        return (
            <div class="play-content-wrapper">
                <div class="play-description-wrapper">
                    <div class="play-description-title">
                        {this.state.gameSettingsList[this.state.gamemode].title}
                    </div>
                    <div class="play-description-title-divider"/>
                    <div class="play-description-description">
                        {this.state.gameSettingsList[this.state.gamemode].description}
                    </div>
                    <div class="play-description-settings-wrapper">
                        <div class="play-description-settings-title">
                            Game Settings
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Max players
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].maxPlayers}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Teams
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].teams}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Rounds
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].rounds}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Questions per round
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].questionsPerRound}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Tiebreaker
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].tiebreaker}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Is text disabled?
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].isTextDisabled}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Teams
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].teams}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Topics
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].topics}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Time between questions
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].timeBetweenQuestions}
                            </div>
                        </div>
                        <div class="play-description-settings-item-wrapper">
                            <div class="play-description-settings-item-name">
                                Buzz window after questions
                            </div>
                            <div class="play-description-settings-item-value">
                                {this.state.gameSettingsList[this.state.gamemode].buzzTimeAfterQuestions}
                            </div>
                        </div>
                    </div>

                    <div class="play-description-start">
                        START LOBBY
                    </div>
                </div>
                <div class="play-gamemodes-wrapper">
                    <div class="play-gamemodes-title">Gamemodes</div>
                    <div class="play-gamemodes-content-wrapper">
                        <div class="play-gamemodes-category-wrapper">
                            <div class="play-gamemodes-category-title">
                                Solo
                                <hr/>
                            </div>
                            <div className={'play-gamemodes-gamemode ' + (this.state.gamemode === 0 ? "play-gamemodes-gamemode-selected" : "")} onClick={() => this.setGamemode(0)}>
                                PRACTICE
                            </div>
                        </div>

                        <div class="play-gamemodes-category-wrapper">
                            <div class="play-gamemodes-category-title">
                                Ranked
                                <hr/>
                            </div>
                            <div className={'play-gamemodes-gamemode ' + (this.state.gamemode === 1 ? "play-gamemodes-gamemode-selected" : "")} onClick={() => this.setGamemode(1)}>
                                1V1
                            </div>
                            <div className={'play-gamemodes-gamemode ' + (this.state.gamemode === 2 ? "play-gamemodes-gamemode-selected" : "")} onClick={() => this.setGamemode(2)}>
                                2V2
                            </div>
                        </div>

                        <div class="play-gamemodes-category-wrapper">
                            <div class="play-gamemodes-category-title">
                                Casual
                                <hr/>
                            </div>
                            <div className={'play-gamemodes-gamemode ' + (this.state.gamemode === 3 ? "play-gamemodes-gamemode-selected" : "")} onClick={() => this.setGamemode(3)}>
                                1V1
                            </div>
                            <div className={'play-gamemodes-gamemode ' + (this.state.gamemode === 4 ? "play-gamemodes-gamemode-selected" : "")} onClick={() => this.setGamemode(4)}>
                                4V4
                            </div>
                            <div className={'play-gamemodes-gamemode ' + (this.state.gamemode === 5 ? "play-gamemodes-gamemode-selected" : "")} onClick={() => this.setGamemode(5)}>
                                CUSTOM LOBBY
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Play;
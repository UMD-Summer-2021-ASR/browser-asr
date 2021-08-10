import "../styles/Shop.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useAlert } from 'react-alert';
import CoinIcon from '../assets/coin_transparent.png';
import {
    Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'

//ASSETS
import LoopIcon from '@material-ui/icons/Loop';

function Taskbounty(props) {
    return (
        <div class="shop-taskbounty-wrapper">
            Bounty: 
            <img class="shop-taskbounty-coin-icon" src={CoinIcon} alt="Coins: "/>
            {props.bounty}
        </div>
    );
}

function SpendComingSoon(props) {
    return (
        <div class="shop-spend-comingsoon-wrapper">
            Coming Soon!
        </div>
    );
}

function TranscriptOption(props) {
    return (
        <div class="shop-selectingtranscript-transcript-wrapper">
            <div class="shop-selectingtranscript-transcript-body-wrapper">
                <div class="shop-selectingtranscript-transcript-body">
                    Neil Bartlett confirmed this man's 1932 prediction of xenon-fluorine compounds.  He stated that the cation coordination number is set by the ratio of ionic radii in one of his rules for ionic crystals.  He took the bond energy for the compound AB minus the geometric mean of the bond energies for AA and BB as a measure of a bond's ionic character.  For 10 points--name this chemist who thus introduced electronegativity.
                </div>
            </div>
            <div class="shop-selectingtranscript-transcript-footer">
                <div class="shop-taskbounty-wrapper">
                    Bounty: 
                    <img class="shop-selectingtranscript-coin-icon" src={CoinIcon} alt="Coins: "/>
                    {props.bounty}
                </div>

                <div onClick={() => {props.setShopScreen("recording")}} class="shop-selectingtranscript-record-btn">
                    Record &#187;
                </div>
            </div>
        </div>
    );
}

function Shop() {
    const [shopScreen, setShopScreen] = useState("home");
    const [difficulty, setDifficulty] = useState("easy");

    function activateShopScreen(diff) {
        setDifficulty(diff);
        setShopScreen("selectingtranscript");
    }

    if(shopScreen === "home") {
        return (
            <div class="shop-content-wrapper">
                <div class="shop-title">Spend</div>
                <div class="shop-title-divider"></div>
                <div class="shop-spend-wrapper">
                    <SpendComingSoon/>
                    <SpendComingSoon/>
                    <SpendComingSoon/>
                    <SpendComingSoon/>
                </div>
                <div class="shop-title">Earn</div>
                <div class="shop-title-divider"></div>
                <div class="shop-earn-wrapper">
                    
                    <div onClick={() => {activateShopScreen("easy")}} class="shop-earn-selector-wrapper shop-earn-selector-hvr-grow shop-earn-selector-easy">
                        <div>
                            <div class="shop-earn-selector-task-title">
                                RECORD
                            </div>
                            <div class="shop-earn-selector-task-description">
                                Record an easy difficulty transcript
                            </div>
                        </div>
                        
                        <Taskbounty bounty="10-30"/>
                    </div>
                    <div onClick={() => activateShopScreen("medium")} class="shop-earn-selector-wrapper shop-earn-selector-hvr-grow shop-earn-selector-medium">
                        <div>
                            <div class="shop-earn-selector-task-title">
                                RECORD
                            </div>
                            <div class="shop-earn-selector-task-description">
                                Record a medium difficulty transcript
                            </div>
                        </div>
                        
                        <Taskbounty bounty="30-50"/>
                    </div>
                    <div onClick={() => activateShopScreen("hard")} class="shop-earn-selector-wrapper shop-earn-selector-hvr-grow shop-earn-selector-hard">
                        <div>
                            <div class="shop-earn-selector-task-title">
                                RECORD
                            </div>
                            <div class="shop-earn-selector-task-description">
                                Record a hard difficulty transcript
                            </div>
                        </div>
                        
                        <Taskbounty bounty="50-100"/>
                    </div>
                </div>
            </div>
        );
    } else if(shopScreen === "selectingtranscript") {
        return (
            <div class="shop-content-wrapper">
                <div class="shop-selectingtranscript-title">
                    Select {difficulty==="easy" ? "an" : "a"} {difficulty} difficulty transcript to record
                </div>
                <div class="shop-selectingtranscript-layer-wrapper">
                    <TranscriptOption bounty={50} setShopScreen={setShopScreen}/>
                    <TranscriptOption bounty={50} setShopScreen={setShopScreen}/>
                </div>
                <div class="shop-selectingtranscript-layer-wrapper">
                    <TranscriptOption bounty={50} setShopScreen={setShopScreen}/>
                    <TranscriptOption bounty={50} setShopScreen={setShopScreen}/>
                </div>
                <div class="shop-selectingtranscript-footer-wrapper">
                    <div class="shop-selectingtranscript-placeholder"></div>
                    <div onClick={() => {setShopScreen("home")}} class="shop-selectingtranscript-cancel-btn">
                        Cancel
                    </div>
                    {/* <Tooltip 
                        title="Reroll" 
                        position="right" 
                        trigger="mouseenter" 
                        arrow={true}
                        duration={300}
                    > */}
                        <div class="shop-selectingtranscript-reroll-btn shop-selectingtranscript-reroll-btn-hvr-rotate">
                            <LoopIcon style={{color: "white", height: "2.5rem"}}/>
                        </div>
                    {/* </Tooltip> */}
                </div>
                
            </div>
        );
    } else {
        return (
            <div>

            </div>
        );
    }
    
}

export default Shop;
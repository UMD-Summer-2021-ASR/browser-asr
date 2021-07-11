import "../styles/Profile.css";
import React from "react";
import ReactDOM from "react-dom";

// ASSETS
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventNoteIcon from '@material-ui/icons/EventNote';


function NewsCard(props) {
    return (
        <div class="newscard-wrapper">
            <div class="newscard-title">
                {props.title}
            </div>
            <div class="newscard-date-wrapper">
                <ScheduleIcon style={{color: "green", height: "15px", width: "auto"}}/>
                <div class="newscard-date-text">
                    {props.date}
                </div>
            </div>
            <div class="newscard-content">
                {props.content}
            </div>
            <div class="newscard-divider"></div>
        </div>
    );
}

function NewsColumn(props) {
    return (
        <div class="newscolumn-wrapper">
            <div class="newscolumn-title-wrapper">
                <EventNoteIcon style={{color: "#6287F7", height: "25px", width: "auto"}}/>
                <div class="newscolumn-title">News</div>
            </div>
            <div class="newscolumn-cards-wrapper">
                <NewsCard title="Official Beta Release!" date="July 20th, 2021" content="This is our very first news release- we are officially in Beta!"/>
                <NewsCard title="Official Beta Release!" date="July 20th, 2021" content="This is our very first news release- we are officially in Beta!"/>
                <NewsCard title="Official Beta Release!" date="July 20th, 2021" content="This is our very first news release- we are officially in Beta!"/>
                <NewsCard title="Official Beta Release!" date="July 20th, 2021" content="This is our very first news release- we are officially in Beta!"/>
                
            </div>
        </div>
    );
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="dashboard-content-wrapper">
                <NewsColumn/>
            </div>
        );
    }
}

export default Profile;
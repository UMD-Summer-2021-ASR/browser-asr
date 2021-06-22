import "../styles/AnimatedCard.css";
import {
    Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'

function AnimatedCard(props) {
    // text, image, caption, enabled/disabled
    if(props.enabled) {
        return (
            <a class="animated-card-wrapper" href={props.href}>
                <div class="animated-card-img-wrapper">
                    <img src={props.src} class="animated-card-img"/>
                </div>
                <div class="animated-card-title">{props.title}</div>
                <div class="animated-card-caption">{props.caption}</div>
            </a>
        );
    } else {
        return (
            <Tooltip 
                title="Login to access this gamemode!" 
                position="top" 
                trigger="mouseenter" 
                arrow={true}
                duration={300}
            >
                <a class="animated-card-wrapper" href="#">
                    <div class="animated-card-img-wrapper">
                        <img src={props.src} class="animated-card-img"/>
                    </div>
                    <div class="animated-card-title">{props.title}</div>
                    <div class="animated-card-caption">{props.caption}</div>
                </a>
            </Tooltip>
        )
    }
    
}

export default AnimatedCard;
import "../styles/AnimatedCard.css";

function AnimatedCard(props) {
    // text, image, caption, enabled/disabled
    let enabled = true
    if(enabled) {
        return (
            <div class="animated-card-wrapper">
                <div class="animated-card-img-wrapper">
                    <img src={props.src} class="animated-card-img"/>
                </div>
                
                
                <div class="animated-card-title">{props.title}</div>
                <div class="animated-card-caption">{props.caption}</div>
            </div>
        );
    } else {
        return (
            <div>

            </div>
        )
    }
    
}

export default AnimatedCard;
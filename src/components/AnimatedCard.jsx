import "../styles/AnimatedCard.css";

function AnimatedCard(props) {
    // text, image, caption, enabled/disabled
    let enabled = true
    if(enabled) {
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
            <div>

            </div>
        )
    }
    
}

export default AnimatedCard;
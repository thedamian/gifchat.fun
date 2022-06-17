export default function Chat({ msg,name }) {

    const classname= msg.who == name ? "message sent" : "message received";

    return (
    <>
    <div className={classname}>
    
    <div className="message-text">
        <img src={msg.pic} className="gif"/>
    </div>
    </div>
    </>
    )
}
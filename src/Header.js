import React from "react";
import Avvvatars from "avvvatars-react";

export default function Header(props) {
    return (
        <div className="header">
            <h1>Artem Alexandrov</h1>
            <div className="menu">
                <div className="menu-item" onClick={()=>props.sectionHandler(props.web)}>
                    <Avvvatars style="shape" value={props.web} size="25" />
                    <span className="menu-text">Web</span>
                </div>
                <div className="menu-item" onClick={props.sectionHandler}>
                    <Avvvatars style={"shape"} value={props.gamedev} size="25" />
                    <span className="menu-text">GameDev</span>
                </div>
                <div className="menu-item" onClick={props.sectionHandler}>
                    <Avvvatars style={"shape"} value={props.etCetera} size="25" />
                    <span className="menu-text">Et Cetera</span>
                </div>
                <div className="menu-item" onClick={props.sectionHandler}>
                    <Avvvatars style={"shape"} value={props.cv} size="25" />
                    <span className="menu-text">CV/resume</span>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
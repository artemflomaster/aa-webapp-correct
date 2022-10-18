import React from "react";
import Avvvatars from "avvvatars-react";
import { nanoid } from "nanoid";

export default function Header() {
    return (
        <div className="header">
            <h1>Artem Alexandrov</h1>
            <div className="menu">
                <div className="menu-item">
                    <Avvvatars style="shape" value={nanoid()} size="25" />
                    <span className="menu-text">Web</span>
                </div>
                <div className="menu-item">
                    <Avvvatars style={"shape"} vvalue={nanoid()} size="25" />
                    <span className="menu-text">GameDev</span>
                </div>
                <div className="menu-item">
                    <Avvvatars style={"shape"} value={nanoid()} size="25" />
                    <span className="menu-text">Et Cetera</span>
                </div>
                <div className="menu-item">
                    <Avvvatars style={"shape"} value={nanoid()} size="25" />
                    <span className="menu-text">CV/resume</span>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
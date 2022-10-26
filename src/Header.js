import React from "react";
import Avvvatars from "avvvatars-react";

export default function Header(props) {
    let nameHeader = '';
    let nameResume = '';
    switch (props.lang) {
        case 'Ru': {
            nameHeader = 'Артём Александров';
            nameResume = 'резюме';
            break
        }
        case 'En': {
            nameHeader = 'Artem Alexandrov';
            nameResume = 'CV/resume';
            break
        }
        default: {
            nameHeader = 'Artem Alexandrov'
            nameResume = 'CV/resume';
        }
    }



    return (
        <div className="header" >
            <h1 onClick={() => props.sectionHandler(false)}>{nameHeader}</h1>
            <div className="menu">
                <div className="menu-item" onClick={() => props.sectionHandler('Web')}>
                    <Avvvatars style="shape" value={props.web} size="25" />
                    <span className="menu-text">Web</span>
                </div>
                <div className="menu-item" onClick={() => props.sectionHandler('GameDev')}>
                    <Avvvatars style={"shape"} value={props.gamedev} size="25" />
                    <span className="menu-text">GameDev</span>
                </div>
                <div className="menu-item" onClick={() => props.sectionHandler('EtCetera')}>
                    <Avvvatars style={"shape"} value={props.etCetera} size="25" />
                    <span className="menu-text">Et Cetera</span>
                </div>
                <div className="menu-item" onClick={() => props.sectionHandler('CV')}>
                    <Avvvatars style={"shape"} value={props.cv} size="25" />
                    <span className="menu-text">{nameResume}</span>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
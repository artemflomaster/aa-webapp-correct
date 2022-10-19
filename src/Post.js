import React from "react";
import Avvvatars from "avvvatars-react";
import { nanoid } from "nanoid";


export default function Post(props) {
    return (
        <div className="post">
            <div className="post-title">
               <span className="post-avvvatar"> <Avvvatars style={"shape"} value={props.avvvatar} size="30" /></span>
                {props.title}
            </div>
            <div className="post-text" dangerouslySetInnerHTML={{ __html: props.text }}></div>
            <div className="post-tags">{props.tags}</div>
            <hr></hr>
        </div>
    )
}
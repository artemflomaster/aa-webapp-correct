import React from "react";
import Avvvatars from "avvvatars-react";
import Tag from "./Tag";
import { nanoid } from "nanoid";



export default function Post(props) {

    const tagsContent = JSON.parse(props.tags).map(item => {
        return <Tag tag={item} key={nanoid()} />
    })


    return (
        <div className="post">
            <div className="post-title">
                <span className="post-avvvatar"> <Avvvatars style={"shape"} value={props.avvvatar} size="30" /></span>
                {props.title}
            </div>
            <div className="post-text" dangerouslySetInnerHTML={{ __html: props.text }}></div>
            <div className="post-tags">{tagsContent}</div>
            <hr></hr>
        </div>
    )
}
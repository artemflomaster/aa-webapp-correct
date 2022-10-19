import React from "react";
import data from "./data";
import { decode } from "he";
import Post from "./Post.js"
import { nanoid } from "nanoid";

export default function Content(props) {
    React.useEffect(() => {
        setPostData(
            {
                isLoaded: true,
                posts: data
            }
        )
    }, []);


    const [postData, setPostData] = React.useState({
        isLoaded: false,
        posts: null,
    })




    function createMarkup(string) {
        return { __html: string };
    }

    let content = 'content is loading';

    if (postData.isLoaded) {
        content = postData.posts.map(item => {
            return (
                <Post key={nanoid()} title={item.title} text={(item.innertext)} tags={item.tags} avvvatar={item.section=='Web'&& props.web}/>
            )
        })

    };

    // content = <div dangerouslySetInnerHTML={createMarkup(decode(postData.posts[0].innertext))} />

    console.log(content)
    return (
        <div className="content">
            {content}
        </div >
    )
}
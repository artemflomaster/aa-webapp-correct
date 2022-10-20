import React from "react";
import data from "./data";
import Post from "./Post.js"
import { nanoid } from "nanoid"; 

export default function Content(props) {

    //loading posts data and updationd state
    React.useEffect(() => {
        setPostData(
            {
                isLoaded: true,
                isClicked: false,
                posts: data
            }
        )
    }, []);

    //posts data
    const [postData, setPostData] = React.useState({
        isLoaded: false,
        isClicked: false,
        posts: null,
    })


    //the preloading value for posts content
    let content = 'content is loading';

    if (postData.isLoaded) {
        content = postData.posts.map(item => {

            //making unique avvvatar for each section in posts. 
            //These avvvatars will be the same as in the Menu
            //love that wierd switch compose
            let avvvatarKey = '';
            switch (item.section) {
                case 'Web': { avvvatarKey = props.web; break }
                case 'GameDev': { avvvatarKey = props.gamedev; break }
                case 'EtCetera': { avvvatarKey = props.etCetera; break }
                case 'CV': { avvvatarKey = props.cv; break }
                default: { avvvatarKey = 'default' }

            }
            //returning bunch of the posts
            return (
                <Post key={nanoid()} title={item.title} text={(item.innertext)} tags={item.tags} avvvatar={avvvatarKey} />
            )
        })

    };


    return (
        <div className="content">
            {content}
        </div >
    )
}
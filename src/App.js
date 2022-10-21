import React from 'react';
import './App.css';
import Header from './Header';
import Post from "./Post.js"
import data from "./data";
import { nanoid } from "nanoid";

export default function App() {
  const web = nanoid();
  const gamedev = nanoid();
  const etCetera = nanoid();
  const cv = nanoid();

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
        case 'Web': { avvvatarKey = web; break }
        case 'GameDev': { avvvatarKey = gamedev; break }
        case 'EtCetera': { avvvatarKey = etCetera; break }
        case 'CV': { avvvatarKey = cv; break }
        default: { avvvatarKey = 'default' }
      }


      //checking case when some section was chosen and returning if post is a not from chosen section    
      if (postData.isClicked && postData.isClicked !== item.section) {

        return [];

      }

      //returning bunch of the posts
      return (
        <Post key={nanoid()} title={item.title} text={(item.innertext)} tags={item.tags} avvvatar={avvvatarKey} />
      )
    })

  };

//update state with tag that some section was choose
  function clickHandler(section) {

    setPostData(oldData => {
      return ({
        ...oldData,
        isClicked: section
      })


    })
  }

  return (
    <div className="App">
      <Header web={web} gamedev={gamedev} etCetera={etCetera} cv={cv} sectionHandler={clickHandler} />
      <div className="content">
        {content}
      </div>
    </div>
  );
}
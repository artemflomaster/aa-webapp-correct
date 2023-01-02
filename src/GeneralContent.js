import React from 'react';
import './App.css';
import Header from './Header';
import Post from "./Post.js"
import { nanoid } from "nanoid";

export default function GeneralContent() {
  const web = nanoid();
  const gamedev = nanoid();
  const etCetera = nanoid();
  const cv = nanoid();

  //preloader animation
  const preloader = <div className="loader-container"><div className="spinner"></div></div>

  //laguage state
  const [lang, setLang] = React.useState('Ru')

  //posts data state
  const [postData, setPostData] = React.useState({
    isLoaded: false,
    isClicked: false,
    posts: null,
  })


  //loading posts data and updating data state

  //hardcoded version of useEffect
  // React.useEffect(() => {
  //   if (lang === "Ru") {
  //     setPostData(
  //       {
  //         isLoaded: true,
  //         isClicked: false,
  //         posts: dataRu
  //       }
  //     )
  //   } else {

  //     setPostData(
  //       {
  //         isLoaded: true,
  //         isClicked: false,
  //         posts: dataEn
  //       }
  //     )


  //   }
  //   console.log('loaded lang ' + lang)
  // }, [lang]);

  React.useEffect(() => {
    getData();
  }, [lang]);



  //function to fetch API data
  async function getData() {
    try {
      console.log('Fetching');
      const url = lang === 'Ru' ? 'https://artemalexandrov.ru/php/php-rest/api/read.php' : 'https://artemalexandrov.ru/php/pdo.php?lang=en';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed. Server response ${response.status}`)
      }
      const json = await response.json();


      if (json.response_code === 1) {
        throw new Error(`Failed. Wrong API request. No results`)
      } else if (json.response_code === 2) {
        throw new Error(`Failed. Wrong API parameters. No results`)
      }
      console.log('Fetched!')

      setPostData(
        {
          isLoaded: true,
          isClicked: false,
          posts: json
        }
      )

    }
    catch (err) {
      console.error(err);
      setPostData({
        isLoaded: false,
        isClicked: false,
        errorMessage: 'Somethin went wrong. Please Try Again!',
        posts: null
      });
    }

  }


  //language handler
  function switchLang(clickedLang) {

    if (lang !== clickedLang) {
      setLang(prevLang => {
        return prevLang === 'Ru' ? 'En' : 'Ru'
      })
      setPostData(prevData => {
        return ({
          ...prevData,
          posts: null,
          isLoaded: false
        })
      })
    }
  }

  //add style to chosen laguage
  let isRuChosen = '';
  let isEnChosen = '';
  lang === 'Ru' ? isRuChosen = 'lang-chosen' : isEnChosen = 'lang-chosen';



  //the preloading value for posts content
  let content = preloader;


  //generating components to show
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
        <Post key={nanoid()} title={item.title} text={item.innertext} tags={item.tags} avvvatar={avvvatarKey} />
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
      <div className='lang-block'>
        <span className={'lang-item ru ' + isRuChosen} onClick={() => switchLang('Ru')}>RU</span>
        <span className={'lang-item en ' + isEnChosen} onClick={() => switchLang('En')}>EN</span>
      </div>
      <Header lang={lang} web={web} gamedev={gamedev} etCetera={etCetera} cv={cv} sectionHandler={clickHandler} />
      <div className="content">
        {content}
      </div>
    </div>
  );
}
import React from "react";
import "./App.css";
import "./Admin.css"
import Post from "./Post";
import { nanoid } from "nanoid";

export default function AdminPanel() {

    //all posts data
    const [postData, setPostData] = React.useState({
        isLoaded: false,
        isClicked: false,
        posts: null,
    })

    //language state
    const [lang, setLang] = React.useState('Ru')

    //state of form and preview
    const [post, setPost] = React.useState({
        title: "",
        section: "Web",
        innertext: "",
        tags: "[]"
    })

    //controlling edit or new post mode
    const [editMode, setEditMode] = React.useState({
        isEdit: false,
        editId: undefined

    })

    React.useEffect(() => {
        getData();
    }, [lang]);



    //function to fetch API data
    async function getData() {
        try {
            console.log('Fetching');
            const url = lang === 'Ru' ? 'http://localhost/phptest/php-rest/api/read.php' : 'https://artemalexandrov.ru/php/pdo.php?lang=en';
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



    //handling all form and preview data
    function previewHandler(elementName, elementType, elementValue) {
        // console.log(elementName, elementType, elementType);
        if (elementType === "radio") {
            setPost(prev => {
                return ({
                    ...prev,
                    section: elementName
                })
            })

        }
        else if (elementName === 'tags') {

            const tagsArray = elementValue.split(',');
            const tagsJson = JSON.stringify(tagsArray);
            let toReturn = { ...post };
            toReturn[elementName] = tagsJson;
            setPost(toReturn);

        }

        else {
            // console.log(elementName, elementType, elementValue);
            let toReturn = { ...post };
            toReturn[elementName] = elementValue;
            setPost(toReturn);
        }
    }
    //radio buttons setting up
    let radios =
    {
        Web: false,
        GameDev: false,
        EtCetera: false,
        CV: false
    }

    radios[post.section] = true;

    //edit button on the post list 
    function editHandler(id) {
        console.log(id);
        setEditMode({
            isEdit: true,
            editId: id
        });
        //find chosen post data
        const postToset = postData.posts.filter(post => post.id === id);

        console.log(postToset[0]);
        setPost(postToset[0]);
    }


    //delete button on the post list
    function deleteHandler(id) {
        const data = { "id": id };
        const url = "http://localhost/phptest/php-rest/api/delete.php"

        async function DeleteData(url, data) {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response;
        }

        DeleteData(url, data)
            .then((data) => {
                console.log(data);
            });

        setEditMode(prev => {
            return (
                {
                    ...prev,
                    isEdit: false
                }
            )
        })
    }

    //generating list of posts
    let postArray = [];
    if (postData.isLoaded) {
        postArray = postData.posts.map(post => {
            return (
                <div
                    className="post-row"
                    key={nanoid()}>id:{post.id} {post.section} {post.title} {<span onClick={() => editHandler(post.id)} className="edit-button">edit</span>}{<span onClick={() => deleteHandler(post.id)} className="delete-button">delete</span>}
                </div>);
        })

    }

    //URLs and data sets for API
    let postFormHeader = 'New post';
    let buttonName = 'Create post';
    let apiUrl = 'http://localhost/phptest/php-rest/api/create.php';
    let apiData = {
        "title": post.title,
        "section": post.section,
        "innertext": post.innertext,
        "tags": post.tags
    }

    if (editMode.isEdit) {
        postFormHeader = 'Edit post ' + editMode.editId;
        buttonName = 'Update post';
        apiUrl = 'http://localhost/phptest/php-rest/api/update.php';
        apiData = {
            "id": editMode.editId,
            "title": post.title,
            "section": post.section,
            "innertext": post.innertext,
            "tags": post.tags
        }

    }


    //create new post and edit function
    function apiFunction(url, data) {

        async function PostData(url, data) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response;
        }

        PostData(url, data)
            .then((data) => {
                console.log(data);
            });
    }




    const form = <form className="form">
        <h3>{postFormHeader}</h3>
        <label htmlFor="title-input">Title</label>
        <input className="title-input" id="title-input" name="title"
            value={post.title} onChange={e => previewHandler(e.target.name, e.target.type, e.target.value)} />

        <label htmlFor="section-input" >Section</label>
        <div className="section-input" id="section-input" name="section-input">

            <label htmlFor="web" className="section-radio">
                <input checked={radios.Web} type="radio" name="Web" id="web"
                    value='web' onChange={e => previewHandler(e.target.name, e.target.type, e.target.value)} />
                Web</label>

            <label htmlFor="gamedev" className="section-radio">
                <input checked={radios.GameDev} type="radio" name="GameDev" id="gamedev"
                    value='gamedev' onChange={e => previewHandler(e.target.name, e.target.type, e.target.value)} />
                GameDev</label>

            <label htmlFor="etcetera" className="section-radio">
                <input checked={radios.EtCetera} type="radio" name="EtCetera" id="etcetera"
                    value='etcetera' onChange={e => previewHandler(e.target.name, e.target.type, e.target.value)} />
                Et Cetera</label>

            <label htmlFor="cv" className="section-radio">
                <input checked={radios.CV} type="radio" name="CV" id="cv"
                    value='cv' onChange={e => previewHandler(e.target.name, e.target.type, e.target.value)} />
                CV</label>
        </div>
        <label htmlFor="content-input" >Content, html compatible</label>
        <textarea className="content-input" id="content-input" name="innertext"
            value={post.innertext} onChange={e => previewHandler(e.target.name, e.target.type, e.target.value)} />

        <label htmlFor="tags-input">Tags, separate with comma</label>
        <input className="tags-input" id="tags-input" name="tags"
            value={JSON.parse(post.tags)} onChange={e => previewHandler(e.target.name, e.target.type, e.target.value)} />

        <button onClick={() => apiFunction(apiUrl, apiData)}>{buttonName}</button>

    </form>

    const preview = <div className="preview">
        <h3>Post preview</h3>
        <Post key={nanoid()} title={post.title} text={post.innertext} tags={post.tags} avvvatar={nanoid()} />
    </div>

    return (
        <div className="admin-wrapper">
            <div className="list-and-form">
                <div className="login-form">
                    <label htmlFor="username">Username</label>
                    <input name="username"></input>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" autoComplete="current-password" required></input>
                </div>
                <div className="posts-list">
                    <h3>List of posts</h3>
                    {postArray}
                </div>
                {form}
            </div>
            {preview}
        </div>
    );
}

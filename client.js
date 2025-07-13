const url = 'http://localhost:3000' 
const axios = require('axios')

// registering
async function register(username, password){
    try {
        const res = await axios.post(`${url}/register`, {
            username:username,
            password:password
        });
        console.log(res.data)
    } catch(err){
        console.error("there was an error", err)
    };
}

// login 
let token = null;
async function login(username, password){
    try{
        const res = await axios.post(`${url}/login`,{
            username:username,
            password:password
        });

        console.log(res.data.message);
        token = res.data.token;

    } catch(err){
        console.error("there was an error", err)
    };
};


// to post a message
async function addContent(content){
    try{
        const response = await axios.post(`${url}/posts/new`, 
        {
            content:content
        }, 
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        console.log(response.data.message);
    }catch(err){
        console.error('posting error', err)
    }
};

// to see all posts
async function seePosts(){
    try{
        const response = await axios.get(`${url}/posts`, 
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        console.log(response.data);

    }catch(err){
        console.log(`can't see posts because ${err}`);
    }
}

// function calls 
async function main(){
    // await register("ishan", "ishan007");
    // await login("ishan", "ishan007");
    // await login("sayanbhowal", "secret007");
    // await addContent('i know what you made');
    // await seePosts();
}

// main()

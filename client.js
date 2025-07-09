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
async function login(username, password){
    try{
        const res = await axios.post(`${url}/login`,{
            username:username,
            password:password
        });
        console.log(res.data.message);
        const token = res.data.token;
    } catch(err){
        console.error("there was an error", err)
    };
}


// function calls 
async function main(){
    await register("sayanbhowal", "secret007");
    await login("sayanbhowal", "secret007");
}

main()

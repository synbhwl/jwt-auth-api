const fs = require('fs')
const path = require('path')
const userspath = path.join(__dirname, 'users.json')

function readUsers(){
    try {
        if(!fs.existsSync(userspath)){fs.writeFileSync(userspath, '[]')};
        const data = fs.readFileSync(userspath, 'utf8');
        return JSON.parse(data);
    } catch(err){
        console.error('there was an error', err)
    }
};

function writeUsers(users){
    try {
        fs.writeFileSync(userspath, JSON.stringify(users, null, 2));
    } catch(err){
        console.error('there was an error', err)
    };
};

module.exports = { readUsers, writeUsers }
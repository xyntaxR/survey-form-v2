const yaml          = require('js-yaml');
const fs            = require('fs');
var constant        = {};

constant.ACTIVE  	= 1;
constant.INATIVE  	= 0;

try {
    /*
    	if the environment is development, load the configuration files as specified in development_env.json
    	this file is set to be automatically .gitignored
    	if you dont have this file, copy development_env.example.yml and adjust the setting based on your local configuration settings
    */
    let env_file = "test.env.yml";

    if(process.env.NODE_ENV == "development"){
        env_file = "development.env.yml";
    }else if(process.env.NODE_ENV == "staging"){
        env_file = "staging.env.yml";
    }else if(process.env.NODE_ENV == "production"){
        env_file = "production.env.yml";
    }

    /* 
    	DOCU: now load the env_file
     	env_file should have all the sensitive information
     	information stored in development_env should not be the same as what's stored in staging or production
    */
    let fileContents = fs.readFileSync(__dirname+'/'+env_file, 'utf8');
    let data = yaml.load(fileContents);

    for(let key in data){
        constant[key] = data[key];
    }
} catch(err) {
    console.log('Error loading yml file', err);
    process.exit(1);
}

constant.PORT  		= 3000;

constant.SESSION_SECRET = "keyboard cat";
constant.SESSION_NAME   = "some secret session name";
constant.SERVER         = "some server"; 

module.exports = constant;
/** Command-line tool to generate Markov text. */

const fs=require("fs");
const Markov=require("./markov");
const axios=require("axios");
const process=require("process");


/** Make markov machine from text + generate text  */

function generateText(text){
    let mm=new Markov.MarkovMachine(text);
    console.log(mm.makeText());
}


/** read file and generate text from it  */



function makeText(path){
    fs.readFile(path,"utf8",function cb(err,data){
        if(err){
            console.error(`Cant read file: ${path}: ${err}`);
            process.exit(1);
        }else{
            generateText(data);
        }
        
    });
}


/** read url and make text from it */

async function makeURLText(url){
    let resp;
    try{
        resp=await axios.get(url);
    }catch(err){
        console.error(`Cant read URL: ${url}: ${err}`);
        process.exit(1);

    }
    generateText(resp.data)
}


/** interpret CMDLINE to decide what to do */

let [method,path]=process.argv.slice(2);
if(method==="file"){
    makeText(path);
}
else if (method=="url"){
    makeURLText(path);
}
else{
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
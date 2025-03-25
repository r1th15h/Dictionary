const card = document.getElementById("card");
const searchbar = document.getElementById("searchbar");
const searchbtn = document.getElementById("searchbtn");
const newdivs=document.getElementById("newdiv");
const allcontents= document.getElementById("allcontents")
let alldata;
searchbtn.addEventListener("click",async(event)=>{
    event.preventDefault();
    allcontents.textContent="";
    let word = searchbar.value;
    if (word){
        let data = await getdata(word);
        alldata = data;
        console.log(data);
        displaydata(data);
    }
    else{
        displayerr("Please type a word!");
    }
    searchbar.value="";

});

async function getdata(word){
    let url= `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let response = await fetch(url);
    if(response.ok){
        let jsondata = await response.json();
        return jsondata;
    }
    else{
        displayerr("Invalid Word!");
    }
   
}

function displaydata(data){
    let word = data[0].word;
    let desc = data[0].meanings[0].partOfSpeech;
    let meaning1 = data[0].meanings[0].definitions[0].definition;
    let example = data[0].meanings[0].definitions[0].example;
    let newdiv = document.createElement("div");
    newdiv.id="newdiv";
    newdiv.innerHTML = `<div class="flex flex-row mt-3 ml-15">
                            <p class="text-4xl">${word}</p>
                            <p class="bg-black rounded-full text-3xl h-10 w-10 ml-5 hover:scale-105 cursor-pointer" onclick = "playaudio()">🔉</p>
                        </div>
                        <p class="ml-16 mt-2 text-[#000000a3]">${desc}</p>
                        <p class="ml-15 mt-6 border-l-[#ff0000] border-l-4 p-1">1) ${meaning1}</p>
                        <p class="ml-15 mt-6 border-l-[#820f64] border-l-4 p-1">Ex:${example}</p>`
    allcontents.append(newdiv);
}

function playaudio(){
    const audiourl = alldata[0].phonetics[0].audio;
    if (audiourl){
        const audio = new Audio(audiourl);
        audio.play();
    }
    else{
        const audiourl1 = alldata[0].phonetics[1].audio;
        const audio1 = new Audio(audiourl1);
        audio1.play();
    }
   
}


function displayerr(msg){
    allcontents.textContent="";
    const newerr = document.createElement("h1");
    newerr.textContent = msg;
    newerr.className="text-[#ff0000] text-center font-bold p-10 text-5xl";
    allcontents.append(newerr);
}

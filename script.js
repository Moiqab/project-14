const selectvoice=document.getElementById('select-voice');
const customtext=document.getElementById('text');
const submitbtn=document.getElementById('submit');
const main=document.getElementById('main');

const data=[
    {
        img: './images/angry.jpg',
        text:"I am Angry"
    },
    {
        img: './images/happy.jpg',
        text:"I am Happy"
    },
    {
        img: './images/hungry.jpg',
        text:"I am hungry"
    },
    {
        img: './images/sad.jpg',
        text:"I am sad"
    },
    {
        img: './images/thirsty.jpg',
        text:"I am thirsty"
    },
    {
        img: './images/tired.jpg',
        text:"I am tired"
    },
    {
        img: './images/cricket.jpg',
        text:"I want to play cricket"
    },
    {
        img: './images/game.jpg',
        text:"I want to play video game"
    },
];

let voiceArray=[];
function fetchvoices(){
    if(speechSynthesis.onvoiceschanged!==undefined){
        speechSynthesis.onvoiceschanged=()=>rendervoices();
    }
};
function rendervoices(){
    const voices=speechSynthesis.getVoices();
    voiceArray=voices;
    voiceArray.forEach((voice=>{
        let option=document.createElement('option');
        option.textContent=`
        ${voice.name}${voice.lang}
        `;
        if(voice.default){
            option.textContent+='(Default voices)';
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        selectvoice.appendChild(option);


    }))
}
fetchvoices();
rendervoices();
data.forEach(checkimg);
function checkimg(imgageobj){
    const{img, text}=imgageobj;
    const div=document.createElement('div');
    div.classList.add('box');
    div.innerHTML=`
    <image src="${img}" alt="${text}"></image>
    <p class="imageinfo" > ${text}</p>
    `;
    div.addEventListener('click', ()=>{
        readText(text);
        speaktext();
    })
    main.appendChild(div);
}
const message=new SpeechSynthesisUtterance();
function readText(text){
      message.text=text;
}
function speaktext(){
    speechSynthesis.speak(message);
}

//Event Listerns

speechSynthesis.addEventListener('voiceschanged', fetchvoices);
submitbtn.addEventListener('click', ()=>{
    readText(customtext.value);
    console.log(customtext.value);
    speaktext();
});
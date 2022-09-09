const btn = document.getElementById('btn')
const listen_p = document.getElementById('p-listen')
const div = document.getElementById('main')

const speech = new SpeechSynthesisUtterance()
speech.lang= "pt"

const colors = ['BLUE', 'RED', 'GREEN']

const respostas = ['Não', 'Sim', 'Talvez', 'Se mata']

if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var myRecognition = new SpeechRecognition()

    myRecognition.lang = 'pt-BR'
    SpeechRecognition.continuous = true

    btn.addEventListener('click', () =>{
        try{

            myRecognition.start()
            listen_p.innerHTML = 'Faça alguma pergunta'
        }catch(err){
            alert('Error: ' + err.message)
        }
    }, false)

    myRecognition.addEventListener('result', (evt)=>{
        let result = evt.results[0][0].transcript
        let index = Math.floor(Math.random() * respostas.length)
        listen_p.innerHTML = respostas[index]

        speech.text = respostas[index]
        window.speechSynthesis.speak(speech)

        console.log(result.toUpperCase())

        if(colors.includes(result.toUpperCase())){
            console.log('entrou')
            div.classList.add(result.toLowerCase())
        }
        
    }, false)

    myRecognition.addEventListener('speechstart', (evt)=>{

        listen_p.innerHTML = 'Ouvindo...'
    }, false)

    myRecognition.addEventListener('error', (err)=>{
        listen_p.innerHTML = 'Não consegui te ouvir direito'
    }, false)
}else{
    listen_p.innerHTML = 'Seu navegador não é compativel'
}
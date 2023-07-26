let scoreTag = document.getElementById('score');
let agreement = document.getElementById('agreement');
let subjectivity = document.getElementById('subjectivity');
let confidence = document.getElementById('confidence');
let irony = document.getElementById('irony');



function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    
    if(Client.checkForName(formText)){
        console.log("::: Form Submitted :::")
        fetch('http://localhost:8080/test')
        postResults('http://localhost:8081/api', {url: formText})
        .then(res => res.json())
        .then(function(res) {
            scoreTag.innerHTML = `Polarity Term: ${scoreCheck(res.score_tag)}`;
            agreement.innerHTML = `Agreement: ${res.agreement}`;
            subjectivity.innerHTML = `Subjectivity: ${res.subjectivity}`;
            confidence.innerHTML = `Confidence: ${res.confidence}`
            irony.innerHTML = `Irony: ${res.irony}`;
        })
    }
    else{
        alert('Please enter a valid URL');
    }
}

const postResults = async (url = '', data = {}) =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const usrInput = await response.json();
        console.log('User Input received ', usrInput);
        return usrInput;
    }
    catch(error){
        console.log('Error', error);
    }
};

const scoreCheck = (score) =>{
    let term = '';
    switch(score){
        case 'P+':
            term = 'Strong Positive';
            break;
        case 'P':
            term = 'Positive';
            break;
        case 'NEU':
            term = 'Neutral';
            break;
        case 'N':
            term = 'Negative';
            break;
        case 'N+':
            term = 'Strong Negative';
            break;
        case 'NONE':
            term = 'No Sentiment';
            break;
        default:
            term = 'No data';
    }
}

    

export { handleSubmit }
export {scoreCheck}
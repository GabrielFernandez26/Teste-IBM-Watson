const fs = require('fs');

const TextToSpeechV1 = require('ibm-watson/text-to-speech/V1');

const { IamAuthenticator } = require('ibm-watson/auth');

const credentials = require('./config.json');


const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: credentials.apikey,
    }),
    serviceUrl: credentials.url,
});

const params = {
    text: 'Olá mundo!',
    accept: 'audio/wav',
    voice: 'pt-BR_IsabelaV3Voice',
}

textToSpeech.synthesize(params)
    .then(response => {
        return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(buffer => {
        fs.writeFileSync('synthesize.wav', buffer);
    })
    .catch(err => {
        console.log('error: ', err);
    })



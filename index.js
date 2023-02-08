const express = require('express')

//const say = require('say')
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser')
const cors = require('cors')
const configuration = new Configuration({
    organization: "org-zXlHeW9N2QmIUbsuPtABbTZ7",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 3080
app.post('/', async(req,res)=>{
    const { message } = req.body;
    console.log(message, "message")
    //say.speak("Hey,I am Victoria. Your personal assistant!", 'Victoria', 1)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
    console.log()   
    res.json({
        // data: response.data
        message: response.data.choices[0].text,
    }) 
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});
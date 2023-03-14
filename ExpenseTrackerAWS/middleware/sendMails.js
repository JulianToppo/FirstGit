const Sib = require('sib-api-v3-sdk')
require('dotenv').config()

exports.sendMails = async(mail) => {
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY
    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
        email: 'juliankingston07@gmail.com',
        name: 'Julian Toppo',
    }
    const receivers = [
        {
            email:mail,
        },
    ]
    await tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Subscribe to Cules Coding to become a developer',
            textContent: `
        Cules Coding will teach you how to become {{params.role}} a developer.
        `,
            htmlContent: `
        <h1>Cules Coding</h1>
        <a href="https://cules-coding.vercel.app/">Visit</a>
                `,
            params: {
                role: 'Frontend',
            },
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}

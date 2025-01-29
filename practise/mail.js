var nodeMailer = require("nodemailer");
var transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    auth: {
        user:'abhijeetkumars0567@gmail.com',
        pass:'hnbz lgfn ekfg pmdc'
    }
});
var mailOption={
    from: 'abhijeetkumars0567@gmail.com',
    to: 'pnegi2117@gmail.com',
    subject: 'node mail'
}

transport.sendMail(mailOption, function (error, info)
{
    if (error) {
        console.log(error)
    }
    else {
        console.log('email sent', info.response)
    }
})
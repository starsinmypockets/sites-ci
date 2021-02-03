const nodemailer = require('nodemailer')
const config = require('./config')
const axios = require('axios')

const transport = {
    host: config.SERVER,
    port: 587,
    auth: {
    user: config.USER,
    pass: config.PASS
  }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
})

const getsite = async (url, htmlText) => {
  try {
    const res = await axios({
      method: "get",
      url,
    })
    const hasText = res.data.includes(htmlText)
    console.log("Passing:", hasText)
    if (!hasText) {
      sendmail(`${url} is down!`, `${htmlText} not found at ${url} -- go take a look.`)
    }
  } catch (e) {
    console.log("Error fetching website", e)
    sendmail(`Error fetching ${url}`, `Get site ${url} failed -- go take a look.`)
  }
}

const sendmail = async (subject, text) => {
  const mail = {
    from: 'pjwalker76@gmail.com',
    to: 'starsinmypockets@gmail.com', 
    subject,
    text
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent')
    }
  })
}

config.SITES.forEach(site => {
  console.log(site)
  getsite(site.url, site.text)
})

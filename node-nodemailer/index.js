const nodemailer = require('nodemailer');

const EMAIL = 'ih174test@gmail.com';
const PASSWORD = 'IH174@lis';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

transporter
  .sendMail({
    from: `Jan20 Test <${EMAIL}>`,
    to: EMAIL,
    subject: 'A test 😜 email',
    // text: 'Hello world!'
    html: 'Hello <strong>world</strong>'
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

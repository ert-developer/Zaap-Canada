import axios from 'axios';
import {MAIL_SERVER_URL} from '@env';
const apiUrl = `${MAIL_SERVER_URL}/sendmail`;
// const apiUrl = 'http://192.168.0.153:3000/sendmail';
// const apiUrl = 'http://localhost:3000/sendmail';

// Example data for sending mail
export const mailSenter = (to, subject, textMsg, bodyText) => {
  const mailData = {
    to: to,
    subject: subject,
    text: textMsg,
    body: `<p>${bodyText}</p>`,
  };
  axios
    .post(apiUrl, mailData)
    .then(response => {})
    .catch(error => {
      console.error('Error:', error.response.data);
    });
};

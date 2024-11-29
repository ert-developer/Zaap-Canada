import axios from 'axios';
import {MAIL_SERVER_URL} from '@env';
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
    .post(`${MAIL_SERVER_URL}/sendmail`, mailData)
    .then(response => {})
    .catch(error => {
      console.error('Error:', error.response.data);
    });
};

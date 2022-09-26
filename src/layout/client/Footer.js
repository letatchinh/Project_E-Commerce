import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

 const Footer = () => {
  let templateParams = {
    from_name: 'cuong',
    email_id : "cuonghuynh936@gmail.com",
    message: 'xin chao!'
};
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send('service_vgfk2fw', 'template_5hh6rll', templateParams,'aimbcoRqHHjBFFklB')
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
   }, function(error) {
      console.log('FAILED...', error);
   });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
  
      <input type="submit" value="Send" />
    </form>
  );
};
export default Footer
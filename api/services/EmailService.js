import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport(sails.config.smtp);

export default {
  sendUserActivationMail(user, cb) {
    const activationUrl = `${sails.config.hostname}/register/${user.id}/${user.activationCode}`;
    const mail = {
      from: sails.config.mail_from,
      to: user.email,
      subject: 'TODO registration',
      html: `<h3>TODO user registration</h3><p><a href="${activationUrl}">Follow this link to activate your user account</a></p>`,
    };
    smtpTransport.sendMail(mail, (error, info) => {
      if (error) {
        return sails.log.error('sendMail:', error);
      }
      if (cb) {
        return cb(info);
      }
      return sails.log.info(`Message sent:${info.response}`);
    });
  },
};

import nodemailer from 'nodemailer';

var smtpTransport = nodemailer.createTransport(sails.config.smtp);

export default {
    sendUserActivationMail: function(user, cb) {
        var activationUrl = sails.config.admin_host + '/register/' + user.id + '/' + user.activationCode,
            mail = {
                from: sails.config.mail_from,
                to: user.email,
                subject: 'TODO activation',
                html: '<h3>Register a new TODO user</h3><p><a href="'+activationUrl+'">Follow this link to activate your account</a></p>'
            };
        smtpTransport.sendMail(mail, function(error, info) {
            if (error) {
                return console.error('sendMail:', error);
            }
            if (cb) {
                cb(info);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }
}

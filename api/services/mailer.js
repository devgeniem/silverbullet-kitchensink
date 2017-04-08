import nodemailer from 'nodemailer';

var smtpTransport = nodemailer.createTransport(sails.config.smtp);

export default {
    sendUserActivationMail: function(user, cb) {
        var activationUrl = sails.config.hostname + '/register/' + user.id + '/' + user.activationCode,
            mail = {
                from: sails.config.mail_from,
                to: user.email,
                subject: 'TODO registration',
                html: '<h3>TODO user registration</h3><p><a href="'+activationUrl+'">Follow this link to activate your user account</a></p>'
            };
        smtpTransport.sendMail(mail, function(error, info) {
            if (error) {
                return sails.log.error('sendMail:', error);
            }
            if (cb) {
                cb(info);
            } else {
                sails.log.info('Message sent: ' + info.response);
            }
        });
    }
}

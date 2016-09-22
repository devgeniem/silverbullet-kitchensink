/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  // !!!! PLEASE PUT YOUR EMAIL SETTINGS TO config/local.js !!!!
  // Example email settings:

  //  mail_from: 'todo@example.com',
  //  admin_email: 'feedback@example.com',
  //  smtp: {
  //      port: MY_SMTP_PORT,
  //      host: 'smtp.MY_SMTP_SERVER.com',
  //      auth: {
  //          user: 'MY_USERNAME',
  //          pass: 'MY_PASSWORD',
  //      },
  //  },

  hostname: 'http://localhost:1337',

};

//import uuid from "node-uuid";
import Hashids from "hashids";
import bcrypt from "bcrypt-nodejs";

var hashids = new Hashids("TODO", 6, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");

export default {
    schema: true,
    attributes: {
        role: {
            type: "string",
            enum: ['admin', 'user']
        },
        email: {
            type: "email",
            unique: true,
            required: true
        },
        name: {
            type: "string"
        },
        encryptedPassword: {
            type: "string"
        },
        comparePassword: function(password) {
            return bcrypt.compareSync(password, this.encryptedPassword);
        },
        // We don't wan't to send back encrypted password
        toJSON: function () {
            var obj = this.toObject();
            delete obj.encryptedPassword;
            //delete obj.activationCode;
            return obj;
        }
    },
    beforeUpdate: function(newUserData, next) {
        //user id has to be in update request body, see policies.js

        // Encrypt new password
        if (newUserData.hasOwnProperty('id') && newUserData.hasOwnProperty('newPassword')) {
            newUserData.encryptedPassword = bcrypt.hashSync(newUserData.newPassword, bcrypt.genSaltSync(10));
        }

        next();
    }
};

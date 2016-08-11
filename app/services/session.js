export default {
    login: function(data, rememberme) {
        if (data.token) {
            if (rememberme) {
                localStorage.setItem('token', data.token);
            } else {
                sessionStorage.setItem('token', data.token);                
            }
        }
        if (data.user) {
            if (rememberme) {
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }
        }
    },
    logout: function() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getToken: function() {
        var token = localStorage.getItem('token');
        return token ? token : sessionStorage.getItem('token');
    },
    getUser: function() {
        var user = localStorage.getItem('user');
        if (!user) user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
        }
        return user;
    }
}

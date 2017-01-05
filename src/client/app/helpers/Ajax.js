var Ajax = {
    login : {
        login (credentials) {
            var url = '/login';
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                })
        },
        status () {
            var url = '/status';
            return fetch(url)
        }
    },
    user: {
        getAll() {
            var url = '/user';
            return fetch(url)
        },
        getOne(user) {
            var url = '/user/' + user.id;
            return fetch(url)
        },
        save(user) {
            var url = '/user';
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
        },
        update(user) {
            var url = '/user';
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
        },
        delete(user) {
            var url = '/user/' + user.id;
            return fetch(url, {
                    method: 'DELETE'
                })
        }
    },
    task: {
        getAll() {
            var url = '/task';
            return fetch(url)
        },
        getOne(task) {
            var url = '/task/' + task.id;
            return fetch(url)
        },
        save(task) {
            var url = '/task';
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task)
                })
        },
        update(task) {
            var url = '/task';
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task)
                })
        },
        delete(task) {
            var url = '/task/' + task.id;
            return fetch(url, {
                    method: 'DELETE'
                })
        }
    }
};
export default Ajax;

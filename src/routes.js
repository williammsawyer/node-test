'use strict';

const Tasks = require('./api/tasks');
const Path = require('path');

module.exports = [
    {
        method: 'GET',
        path:   '/resources/{path*}',
        handler : {
            directory : {
                path: Path.join(__dirname, 'resources'),
                index: true
            }
        }
    },

    {
        method: 'GET',
        path: '/hello/{name}',
        handler: (request, h) => {
            return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
        }
    },

    {
        method: 'GET',
        path: '/',
        handler: {
            file : Path.join(__dirname, 'public/tasks.html')
        }
    },

    {
        method: 'GET',
        path: '/rest/tasks/{id}',
        handler: Tasks.get
    },
    {
        method: 'GET',
        path: '/rest/tasks',
        handler: Tasks.getAll
    },
    {
        method: 'POST',
        path: '/rest/tasks',
        handler: Tasks.post
    },
    {
        method: 'DELETE',
        path: '/rest/tasks/{id}',
        handler: Tasks.delete
    }
];
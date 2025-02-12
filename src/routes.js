const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
    // post notes
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    // get notes
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    // get notes by id
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    // put edit by id
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    // delete by id
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;
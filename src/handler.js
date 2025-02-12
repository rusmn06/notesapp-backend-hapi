const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload; // variabel request dari frontend
    const id = nanoid(16); // variabel id yang menggunakan nanoid untuk unik
    const createdAt = new Date().toISOString(); // menyimpan global tanggal dalam string menggunakan convert string
    const updatedAt = createdAt;

    const newNote = { // membuat array guna di push ke array data (notes)
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote); // push array newNote ke array note

    const isSuccess = notes.filter((note) => note.id === id).length > 0; // objek untuk mengetahui apakah data berhasil tersimpan pada array utama (notes)
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
}); // nilai dalam tanda kurung langsung dikembalikan

const getNoteByIdHandler = (request, h) => {
    const  { id } = request.params; // mendapatkan nilai id dari request.params

    const note = notes.filter((n) => n.id === id) // dapatkan objek note dengan id tersebut dari objek array notes

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const  { id } = request.params; // mendapatkan nilai id dari request.params
    const { title, tags, body } = request.payload; // variabel request dari frontend
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler, };
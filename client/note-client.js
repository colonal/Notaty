const baseUrl = 'http://localhost:3000/api';

async function addNote(note) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });

    return response;
}

async function updateNote(note) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });

    return response;
}

async function deleteNote(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: 'DELETE',
    });

    return response.json();
}

async function getNoteById(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`);

    return response.json();
}

async function getAllNotes(noteTitle) {
    let url = `${baseUrl}/notes`;
    if (noteTitle) {
        url += `/?title=${encodeURIComponent(noteTitle)}`;
    }
    const response = await fetch(url);

    return response.json();
}
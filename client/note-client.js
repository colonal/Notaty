const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1";

const baseUrl = isLocalhost
    ? "http://localhost:3000/api"
    : "https://notaty-orja.onrender.com/api";

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
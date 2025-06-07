function openAddModal() {
    const model = document.getElementById('addNoteModal');
    model.style.display = 'block';

    const closeIcon = document.getElementById('closeAdd');
    closeIcon.onclick = () => {
        model.style.display = 'none';
        _clearModelData();
    };

    const closeButton = document.getElementById('cancelAddNoteBtn');
    closeButton.onclick = () => {
        model.style.display = 'none';
        _clearModelData();
    };
}

function _clearModelData() {
    document.getElementById('addTitle').value = '';
    document.getElementById('addContent').value = '';
    document.getElementById('addError').innerText = '';
}

function saveNewNote() {
    const titleInput = document.getElementById('addTitle');
    const contentInput = document.getElementById('addContent');
    const note = {
        title: titleInput.value.trim(),
        content: contentInput.value.trim()
    };

    if (!note.title || !note.content) {
        alert("Title and content cannot be empty.");
        return;
    }

    addNote(note).then(response => {
        if (response.ok) {
            _clearModelData();
            const model = document.getElementById('addNoteModal');
            model.style.display = 'none';
            response.json().then(data => {
                var id = data.note._id;
                updateNotesTable(id);
            })

        }
        else {
            response.text().then(text => {
                document.getElementById('addError').innerText = text;
                console.error("Failed to add note:", response.statusText);
            });
        }
    }).catch(error => {
        document.getElementById('addError').innerText = error;
        console.error("Failed to add note:", error);
    })

}

function openEditModel(noteId) {
    const model = document.getElementById('editNoteModal');
    model.style.display = 'block';

    const closeIcon = document.getElementById('closeEdit');
    closeIcon.onclick = () => {
        model.style.display = 'none';
        _clearEditModelData();
    };

    const closeButton = document.getElementById('cancelEditNoteBtn');
    closeButton.onclick = () => {
        model.style.display = 'none';
        _clearEditModelData();
    };

    loadEditNoteData(noteId);
}

function loadEditNoteData(noteId) {
    var model = document.getElementById('editNoteModal');
    var noteIdAttribute = document.createAttribute('noteId');

    noteIdAttribute.value = noteId;
    model.setAttributeNode(noteIdAttribute);


    getNoteById(noteId).then(data => {
        document.getElementById('editTitle').value = data.note.title;
        document.getElementById('editContent').value = data.note.content;
        document.getElementById('editError').innerText = '';
    }).catch(error => {
        console.error("Failed to fetch note for editing:", error);
        alert("Failed to fetch note for editing.");
    });
}

function saveEditNote() {
    var model = document.getElementById('editNoteModal');

    const titleInput = document.getElementById('editTitle');
    const contentInput = document.getElementById('editContent');
    var noteId = model.getAttribute('noteId');

    const note = {
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
    };

    if (!note.title || !note.content) {
        alert("Title and content cannot be empty.");
        return;
    }


    updateNote({ _id: noteId, ...note }).then(response => {
        if (response.ok) {
            _clearEditModelData();
            const model = document.getElementById('editNoteModal');
            model.style.display = 'none';
            updateNotesTable(noteId);
        } else {
            document.getElementById('editError').innerText = response.message;
            console.error("Failed to update note:", response.message);
        }
    }).catch(error => {
        document.getElementById('editError').innerText = error;
        console.error("Failed to update note:", error);
    });
}

_clearEditModelData = () => {
    document.getElementById('editTitle').value = '';
    document.getElementById('editContent').value = '';
    document.getElementById('editError').innerText = '';
    const model = document.getElementById('editNoteModal');
    model.removeAttribute('noteId');
}
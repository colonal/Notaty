function updateNotesTable(noteId, noteTitle) {
    getAllNotes(noteTitle).then(response => {
        _updateTable(response.notes);
    }).then(() => {
        if (noteId) {
            const row = document.getElementById(noteId);
            if (row) {
                row.setAttribute("style", "animation: new-row 5s;");
            }
        }
    }).catch(error => {
        console.error("Error fetching notes:", error);
    });
}

function searchNotes() {
    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput.value.trim();

    updateNotesTable(undefined, searchValue);
}

function _updateTable(notes) {
    var table = document.getElementById("notes-table");
    _clearTable();
    notes.forEach(note => {
        var nodeId = note["_id"];

        var row = table.insertRow(1);
        var idAttribute = document.createAttribute("id");
        idAttribute.value = nodeId;
        row.setAttributeNode(idAttribute);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = note["title"];
        cell2.innerHTML = note["content"];
        const updatedAt = new Date(note["updatedAt"]);
        cell3.innerHTML = updatedAt.toDateString();

        cell4.innerHTML = `<a onclick="openEditModel('${nodeId}')" href="#"><img src="images/edit.png" style="width: 22px;"></a>
                           <a onclick="confirmDeleteNote('${nodeId}')" href="#"> <img src="images/delete.png" style="width: 22px;"> </a>`;
    });
}

function _clearTable() {
    var table = document.getElementById("notes-table");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

function confirmDeleteNote(noteId) {
    var action = confirm("Are you sure you want to delete this note?");
    if (action) {
        deleteNote(noteId).then(response => {
            if (response.success) {
                updateNotesTable();
            } else {
                alert("Error deleting note: " + response.message);
            }
        }).catch(error => {
            console.error("Error deleting note:", error);
            alert("An error occurred while deleting the note.");
        });
    }

}
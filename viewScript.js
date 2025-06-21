function displayNotes(title) {
    const notesList = document.getElementById('noteList');

    const div = document.createElement('div');
    div.classList.add('noteItem');

    const titlePara = document.createElement('p');
    titlePara.classList.add('dataInside');
    titlePara.innerText = title;

    const viewBtn = document.createElement('button');
    viewBtn.classList.add('action-button');
    viewBtn.innerText = 'View Note';
    viewBtn.onclick = function () {
        viewNote(title); // ✅ correct
    };

    const updateBtn = document.createElement('button');
    updateBtn.classList.add('action-button');
    updateBtn.innerText = 'Update Note';
    updateBtn.onclick = function () {
        updateNote(title); // ✅ correct
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('action-button');
    deleteBtn.innerText = 'Delete Note';
    deleteBtn.onclick = function () {
        deleteNote(title); // ✅ correct
    };

    div.appendChild(titlePara);
    div.appendChild(viewBtn);
    div.appendChild(updateBtn);
    div.appendChild(deleteBtn);

    notesList.appendChild(div);
}

document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("Note_")) {
            const note = JSON.parse(localStorage.getItem(key));
            displayNotes(note.Title);
        }
    }
});

function deleteNote(title) {
    console.log(title + ' is being deleted!');
    
    // Loop from 0 to length - 1
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Only target notes
        if (key.startsWith("Note_")) {
            const item = JSON.parse(localStorage.getItem(key));
            
            if (item.Title === title) {
                localStorage.removeItem(key);
                console.log(title + ' deleted successfully!');
                break; // stop after deleting one match
            }
        }
    }
    location.reload();
}


function viewNote(title) {
    let cont = '';
    let list = document.getElementById('noteList');
    list.style.display = 'none';

    let element = document.getElementById('popup');
    element.style.display = 'flex';
    element.style.flexDirection = 'column';

    const heading = document.createElement('h3');
    heading.innerText = title;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));
        if (data.Title === title) {
            cont = data.Content;
            break;
        }
    }

    const div_data = document.getElementById('popup_data');
    div_data.innerHTML = cont;

    // Insert heading at the top
    div_data.insertBefore(heading, div_data.firstChild);
}

function closePopup()
{
    let element = document.getElementById('popup');
    element.style.display = 'none';

    let list = document.getElementById('noteList');
    list.style.display = 'flex';

    let div_data = document.getElementById('popup_data');
    div_data.innerHTML = ''

    
}

function updateNote(title) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("Note_")) {
      const note = JSON.parse(localStorage.getItem(key));
      if (note.Title === title) {
        localStorage.setItem("UpdateTitle", note.Title);
        localStorage.setItem("UpdateContent", note.Content);
        localStorage.setItem("UpdateKey", key);
        break;
      }
    }
  }

  window.location.href = 'AddNotes.html';
}

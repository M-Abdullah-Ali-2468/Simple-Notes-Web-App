// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Quill Editor
  const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Write your notes here...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean']
      ]
    }
  });

  window.quill = quill;

  // Check if updating an existing note
  const updateTitle = localStorage.getItem("UpdateTitle");
  const updateContent = localStorage.getItem("UpdateContent");

  if (updateTitle && updateContent) {
    document.getElementById("noteTitle").value = updateTitle;
    quill.root.innerHTML = updateContent;
  }
});

function saveNote() {
  const title = document.getElementById('noteTitle').value.trim();
  if (!title) {
    alert('Title must be entered!');
    document.getElementById('noteTitle').focus();
    return;
  }

  const content = quill.root.innerHTML;
  const updateKey = localStorage.getItem("UpdateKey");

  if (updateKey) {
    // ✅ Update the existing note
    localStorage.setItem(updateKey, JSON.stringify({ Title: title, Content: content }));
    alert("Note updated successfully!");

    // 🧹 Remove temporary update values
    localStorage.removeItem("UpdateTitle");
    localStorage.removeItem("UpdateContent");
    localStorage.removeItem("UpdateKey");
  } else {
    // ➕ Save a new note
    localStorage.setItem("Note_" + Date.now(), JSON.stringify({ Title: title, Content: content }));
    alert("Note saved successfully!");
  }

  // Reset editor and input
  document.getElementById('noteTitle').value = '';
  quill.root.innerHTML = '';
}

function clearLocalStorage() {
  localStorage.clear();
}

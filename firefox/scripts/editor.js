document.addEventListener('DOMContentLoaded', () => {
  let isEditing = false;

  const editBtn = document.getElementById('edit-toggle');
  const allLinks = document.querySelectorAll('.link-card');

  const modal = document.getElementById('edit-modal');
  const nameInput = document.getElementById('edit-name');
  const urlInput = document.getElementById('edit-url');
  const iconInput = document.getElementById('edit-icon');
  const saveBtn = document.getElementById('modal-save');
  const cancelBtn = document.getElementById('modal-cancel');

  let currentCard = null;

  editBtn.addEventListener('click', () => {
    isEditing = !isEditing;
    document.body.classList.toggle('editing-mode', isEditing);

    // Clear existing content
    editBtn.textContent = '';

    // Create icon
    const icon = document.createElement('i');
    icon.className = isEditing ? 'fas fa-check' : 'fas fa-edit';

    // Create label text
    const label = document.createTextNode(isEditing ? ' Done' : ' Edit');

    // Append to button
    editBtn.appendChild(icon);
    editBtn.appendChild(label);

  });

  allLinks.forEach(linkCard => {
    linkCard.addEventListener('click', (e) => {
      if (!isEditing) return;

      e.preventDefault();
      currentCard = linkCard;

      const nameEl = linkCard.querySelector('.link-name');
      const iconEl = linkCard.querySelector('.link-icon i');

      nameInput.value = nameEl.textContent;
      urlInput.value = linkCard.href;
      iconInput.value = Array.from(iconEl.classList).join(' ');

      modal.style.display = 'flex';
    });
  });

  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    currentCard = null;
  });

  saveBtn.addEventListener('click', () => {
    if (!currentCard) return;

    const newName = nameInput.value.trim();
    const newURL = urlInput.value.trim();
    const newIcon = iconInput.value.trim();

    if (newName) currentCard.querySelector('.link-name').textContent = newName;
    if (newURL) currentCard.href = newURL;
    if (newIcon) currentCard.querySelector('.link-icon i').className = newIcon;

    modal.style.display = 'none';
    currentCard = null;
  });
});

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

  // 🔹 Load saved data on page load
  browser.storage.local.get("linksData").then(result => {
    const savedLinks = result.linksData || {};
    allLinks.forEach((linkCard, index) => {
      if (savedLinks[index]) {
        linkCard.querySelector('.link-name').textContent = savedLinks[index].name;
        linkCard.href = savedLinks[index].url;
        linkCard.querySelector('.link-icon i').className = savedLinks[index].icon;
      }
    });
  });

  editBtn.addEventListener('click', () => {
    isEditing = !isEditing;
    document.body.classList.toggle('editing-mode', isEditing);

    editBtn.textContent = '';

    const icon = document.createElement('i');
    icon.className = isEditing ? 'fas fa-check' : 'fas fa-edit';

    const label = document.createTextNode(isEditing ? ' Done' : ' Edit');

    editBtn.appendChild(icon);
    editBtn.appendChild(label);
  });

  allLinks.forEach((linkCard, index) => {
    linkCard.addEventListener('click', (e) => {
      if (!isEditing) return;

      e.preventDefault();
      currentCard = { element: linkCard, index };

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

    const { element, index } = currentCard;
    const newName = nameInput.value.trim();
    const newURL = urlInput.value.trim();
    const newIcon = iconInput.value.trim();

    if (newName) element.querySelector('.link-name').textContent = newName;
    if (newURL) element.href = newURL;
    if (newIcon) element.querySelector('.link-icon i').className = newIcon;

    // 🔹 Save to browser storage
    browser.storage.local.get("linksData").then(result => {
      const updatedLinks = result.linksData || {};
      updatedLinks[index] = { name: newName, url: newURL, icon: newIcon };
      browser.storage.local.set({ linksData: updatedLinks });
    });

    modal.style.display = 'none';
    currentCard = null;
  });
});

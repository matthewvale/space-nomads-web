// Opens gallery images in a full-screen dialog instead of navigating to the file.
// Without JS the links still work: they just open the image directly.
(function () {
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    const image = document.createElement('img');
    dialog.appendChild(image);
    document.body.appendChild(dialog);

    dialog.addEventListener('click', () => dialog.close());

    // Listens on the document so slides the carousel adds later are covered too.
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a.shot');
        if (!link) return;
        event.preventDefault();
        image.src = link.href;
        image.alt = link.querySelector('img')?.alt ?? '';
        dialog.showModal();
    });
})();

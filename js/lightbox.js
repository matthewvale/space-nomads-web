// Opens gallery images in a full-screen dialog instead of navigating to the file.
// Without JS the links still work: they just open the image directly.
(function () {
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    const image = document.createElement('img');
    dialog.appendChild(image);
    document.body.appendChild(dialog);

    dialog.addEventListener('click', () => dialog.close());

    document.querySelectorAll('a.shot').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            image.src = link.href;
            image.alt = link.querySelector('img')?.alt ?? '';
            dialog.showModal();
        });
    });
})();

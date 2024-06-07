document.addEventListener('DOMContentLoaded', (event) => {
    const imagesContainer = document.querySelector('.image-zone');
    const images = Array.from(document.querySelectorAll('.draggable'));
    const dropBoxes = Array.from(document.querySelectorAll('.drop-box'));
    const resultContainer = document.getElementById('result-container');
    const playAgainButton = document.getElementById('playAgain');

    let currentImageIndex = 2; // Start with image 2 as per your requirements
    const selectedImages = [];

    images.forEach(img => {
        img.addEventListener('click', handleImageClick);
    });

    const audioIcons = Array.from(document.querySelectorAll('.audio-icon'));
    audioIcons.forEach(icon => {
        icon.addEventListener('click', handleAudioIconClick);
    });

    playAgainButton.addEventListener('click', resetGame);

    function handleImageClick(e) {
        const imageIndex = parseInt(e.target.getAttribute('data-index'));
        const dropBox = dropBoxes[currentImageIndex - 1]; // Adjusting for 0-based index

        if (imageIndex === currentImageIndex) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.src;
            imgElement.classList.add('correct');
            imgElement.classList.add('droppable');
            dropBox.appendChild(imgElement);
            selectedImages.push(e.target);
            e.target.style.opacity = '0.5';
            playSound(e.target.getAttribute('data-audio'));
            currentImageIndex++;
        } else {
            e.target.classList.add('incorrect');
            setTimeout(() => e.target.classList.remove('incorrect'), 500);
        }

        checkGameStatus();
    }

    function handleAudioIconClick(e) {
        const audioSrc = e.target.getAttribute('data-audio');
        playSound(audioSrc);
    }

    function playSound(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
    }

    function checkGameStatus() {
        if (currentImageIndex > dropBoxes.length) {
            resultContainer.classList.remove('hidden');
        }
    }

    function resetGame() {
        resultContainer.classList.add('hidden');
        currentImageIndex = 2; // Reset to image 2
        selectedImages.forEach(img => img.style.opacity = '1');
        selectedImages.length = 0;
        dropBoxes.forEach((box, index) => {
            while (box.firstChild) {
                box.removeChild(box.firstChild);
            }
            if (index === 0) {
                // Recreate the initial image with the audio icon for the first drop-box
                const initialImage = document.createElement('img');
                initialImage.src = 'kuva1.PNG';
                initialImage.alt = 'Kuva 1';
                initialImage.classList.add('initial-image');

                const audioIcon = document.createElement('div');
                audioIcon.classList.add('audio-icon');
                audioIcon.setAttribute('data-audio', 'aani1.mp3');
                audioIcon.innerHTML = '&#x1F50A;';

                box.appendChild(audioIcon);
                box.appendChild(initialImage);

                audioIcon.addEventListener('click', handleAudioIconClick);
            }
        });
        shuffleImages();
    }

    function shuffleImages() {
        const shuffledImages = images.sort(() => 0.5 - Math.random());
        imagesContainer.innerHTML = '';
        shuffledImages.forEach(img => {
            img.style.opacity = '1'; // Reset opacity for all images
            imagesContainer.appendChild(img);
        });
    }

    // Initial shuffle on page load
    shuffleImages();
});

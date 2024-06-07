// Video script
// document.getElementById('uploadForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (file) {
//         const mediaPreview = document.getElementById('mediaPreview');
//         mediaPreview.innerHTML = '';

//         const url = URL.createObjectURL(file);
//         let mediaElement;

//         if (file.type.startsWith('video/')) {
//             mediaElement = document.createElement('video');
//             mediaElement.controls = true;
//         } else if (file.type.startsWith('audio/')) {
//             mediaElement = document.createElement('audio');
//             mediaElement.controls = true;
//         }

//         if (mediaElement) {
//             mediaElement.src = url;
//             mediaPreview.appendChild(mediaElement);
//         }
//     }
// });


// Next and prev button
document.addEventListener('DOMContentLoaded', function() {
    const partials = document.querySelectorAll('.partial');
    let currentIndex = 0;
    let currentStep = 1;

    function showPartial(index) {
        partials.forEach((partial, i) => {
            if (i === index) {
                partial.classList.remove('hidden');
            } else {
                partial.classList.add('hidden');
            }
        });
    }

    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showPartial(currentIndex);
            updateProgressBar(false); // Update progress bar when going back
        }
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        if (validateForm()) {
            if (currentIndex < partials.length - 1) {
                currentIndex++;
                showPartial(currentIndex);
            }
        }
    });

    showPartial(currentIndex); // Initialize the first partial to be visible


    // Progressbar
    function validateForm() {
        const currentPartial = partials[currentIndex];
        const inputs = currentPartial.querySelectorAll('input[required], textarea[required]');
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                alert('Please fill in all required fields.');
                return false;
            }
        }
        // Update the progress bar here if validation succeeds
        updateProgressBar(true);
        return true;
    }

    function updateProgressBar(isNext) {
        const steps = document.querySelectorAll('.progressbar');
        if (isNext) {
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
            }
        } else {
            if (currentStep > 1) {
                currentStep--;
                steps[currentStep].classList.remove('active');
            }
        }
    }
});


// Back button profile
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = '/foryou';
  });    


// Show/hide edit icon
document.addEventListener('DOMContentLoaded', function() {
    const editIcon = document.querySelector('#editIcon');
    const saveButton = document.querySelector('#saveButton');
    const inputs = document.querySelectorAll('input[type="text"], textarea'); // Selecteer alle input- en textarea-elementen
    const mediaInputs = document.querySelectorAll('.mediaInput');
    const savePhotoButton = document.querySelector('#savePhotoButton');
    const backgroundSection = document.querySelector('#backgroundSection');

    // Function to toggle readonly attributes
    function toggleReadonly(enable) {
        inputs.forEach(function(input) {
            if (enable) {
                input.setAttribute('readonly', 'readonly');
                input.classList.remove('toggleInput'); // Verwijder highlight class
            } else {
                input.removeAttribute('readonly');
                input.classList.add('toggleInput'); // Voeg highlight class toe
            }
        });
    }

    // Event listener for the 'Save' button
    saveButton.addEventListener('click', function() {
        saveButton.style.display = 'none'; // Verberg de 'Save' knop
        toggleReadonly(true); // Schakel readonly attributen weer in
        mediaInputs.forEach(function(input) {
            input.style.display = 'none'; // Verberg het bestand-input
        });
        savePhotoButton.style.display = 'none'; // Verberg de 'Save Photo' knop
    });

    // Event listener for the main edit icon
    editIcon.addEventListener('click', function() {
        saveButton.style.display = 'block'; // Toon de 'Save' knop
        toggleReadonly(false); // Verwijder readonly attributen
        mediaInputs.forEach(function(input) {
            input.style.display = 'block'; // Toon het bestand-input
        });
        savePhotoButton.style.display = 'block'; // Toon de 'Save Photo' knop
    });

    // Event listener for the 'Save Photo' button
    savePhotoButton.addEventListener('click', function() {
        mediaInputs.forEach(function(input) {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    backgroundSection.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);
            }
        });
    });
});




// Edit partials 
document.addEventListener('DOMContentLoaded', function() {
    const editDescriptionIcon = document.getElementById('editDescriptionIcon');

    const partials = document.querySelectorAll('.partial');

    function hideAllPartials() {
        partials.forEach(partial => {
            partial.style.display = 'none';
        });
    }

    function showPartial(partialId) {
        hideAllPartials();
        document.getElementById(partialId).style.display = 'block';
    }

    editDescriptionIcon.addEventListener('click', function() {
        showPartial('partial-description');
    });

        // Initially hide all partials
        hideAllPartials();
});

// pauze for you
function videoPauze() {
    var videos = document.querySelectorAll("video");
    const contentElement = document.getElementById('user-info-container');

    videos.forEach(function(video) {
        video.addEventListener("click", function() {

// @@ -193,78 +184,9 @@ function videoPauze() {
//                 video.pause();
//             }
        });

        contentElement.addEventListener('scroll', () => {
            video.pause();
          });
    });
}
videoPauze();

// in css: #user-info-container div:first-of-type.hidden {
//     display: none; 
//   }

// search test
document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let videoBackgrounds = document.querySelectorAll('#videoBackground');

    videoBackgrounds.forEach(function(videoBackground) {
        let bandNameElement = videoBackground.querySelector('h2');
        let bandName = bandNameElement.textContent.toLowerCase();

        if (bandName.includes(filter)) {
            videoBackground.classList.remove('hidden');
            if (filter !== "") { 
                videoBackground.scrollIntoView({ behavior: 'auto' });
            }
        } else {
            videoBackground.classList.add('hidden');
        }
    });

let noResultParagraph = document.getElementById('noResultsMessage');
    if (!filter || !document.querySelectorAll('#videoBackground:not(.hidden)').length) {
        if (!noResultParagraph) {
            noResultParagraph = document.createElement('p');
            noResultParagraph.id = 'noResultsMessage';
            noResultParagraph.textContent = 'Geen resultaten gevonden';
            document.body.appendChild(noResultParagraph);
        }
    } else {
        if (noResultParagraph) {
            noResultParagraph.remove();
        }
    }
});

// test













  
  
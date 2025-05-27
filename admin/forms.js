document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const stepNumber = document.getElementById("step-number");
    const onlineCheckbox = document.getElementById("online");
    const venueField = document.getElementById("venue-field");
    const addParticipantBtn = document.getElementById("addParticipant");
    const participantsContainer = document.getElementById("participants");

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });
        stepNumber.textContent = index + 1;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () =>{
            if (currentStep < steps.length -1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if(currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    onlineCheckbox.addEventListener("change", () => {
        venueField.style.display = onlineCheckbox.checked ? "none" : "block";
    });

    addParticipantBtn.addEventListener("click", () => {
        const count = participantsContainer.querySelectorAll("input").length + 1;
        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.name = "participant[]";
        newInput.placeholder = `Participant ${count}`;
        newInput.style.marginTop = "1rem";
        participantsContainer.appendChild(newInput);
    });

    document.getElementById("multiStepForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Form submitted!");
    });
});

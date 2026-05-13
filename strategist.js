document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('strategist-form');
    const outputMessage = document.getElementById('output-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Normally, this would send data to a backend or write to files.
        // For this frontend, we will just show the success message 
        // to indicate that the AI Strategist can now take over.
        
        outputMessage.style.display = 'block';

        // You could also log the captured inputs:
        const briefText = document.getElementById('brief-text').value;
        const fileInput = document.getElementById('brief-file').files[0];
        const urls = document.getElementById('brief-urls').value;

        console.log("Strategist Inputs Collected:");
        console.log("- Text:", briefText);
        console.log("- File attached:", fileInput ? fileInput.name : "None");
        console.log("- URLs:", urls);
        
        // Disable button to prevent multiple submissions
        const submitBtn = document.getElementById('wpSave');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        submitBtn.classList.remove('mw-ui-progressive');
    });

    const cancelLink = document.getElementById('mw-editform-cancel');
    cancelLink.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
        outputMessage.style.display = 'none';
        
        const submitBtn = document.getElementById('wpSave');
        submitBtn.textContent = 'Run Strategist Workflow';
        submitBtn.disabled = false;
        submitBtn.classList.add('mw-ui-progressive');
    });
});

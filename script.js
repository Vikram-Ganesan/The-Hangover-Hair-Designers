// Select all <h1> elements inside .heroMemberList
const heroMemberList = document.querySelectorAll(".heroMemberList > h1");

// Intersection Observer to track when sections enter viewport
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find the span element containing the number to increment
            const numberSpan = entry.target.querySelector('.number');
            if (numberSpan) {
                // Get the target number to increment to
                const target = parseInt(numberSpan.textContent.trim());
                // Call function to increment the number
                incrementNumber(numberSpan, target);
                // Stop observing once incremented
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of section is visible

// Observe each <h1> element to detect when it enters viewport
heroMemberList.forEach(section => {
    observer.observe(section);

});

// Function to increment a number element to a specific target value
function incrementNumber(numberElement, target) {
    // Initial value is set to 0
    let currentNumber = 0;
    // Calculate the increment step based on the difference between target and current values
    const incrementStep = Math.ceil(target / 100); // Increment over 100 steps

    // Use setInterval to increment the number gradually
    const interval = setInterval(() => {
        // Increment the current number by the step
        currentNumber += incrementStep;
        // Ensure current number does not exceed target
        if (currentNumber >= target) {
            currentNumber = target;
            clearInterval(interval); // Stop interval when target is reached
        }
        // Update the text content with the rounded current number
        numberElement.textContent = currentNumber + ' +';
    }, 20); // Adjust interval timing as needed (10ms here for smoother animation)
}
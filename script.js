document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const sidebarItems = document.querySelectorAll('.each-steps a');
    let currentStep = 0;

    // Display Current Step
    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
        });
        sidebarItems.forEach((item, index) => {
            item.classList.toggle('active', index === step);
        });
    }

    window.nextStep = function() {
        // Ensure fields are filled on the first step
        if (currentStep === 0) {
            const name = document.querySelector('.name-section input').value;
            const email = document.querySelector('.email-section input').value;
            const phone = document.querySelector('.phone-section input').value;
            if (!name || !email || !phone) {
                alert('Please fill the form before proceeding.');
                return;
            }
        }
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    };

    window.prevStep = function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    };

    var yearBtn = document.querySelector(".toggle-btn");
    var activeYear = document.querySelectorAll(".month-year-div p");
    var planOptions = document.querySelectorAll('.each-option');
    var selectedPlan = document.querySelector('.each-option'); // Default selected plan

    // Function to update prices based on the toggle state
    function updatePrices(isYearly) {
        const planPrices = document.querySelectorAll('.each-option p');
        const planSpans = document.querySelectorAll('.each-option span');
        const summaryHeader = document.querySelector('.top-summary h3');
        const summaryPrice = document.querySelector('.top-summary span');
        const singlePrices = document.querySelectorAll('.buttom-summary span');
        const addOnPrices = document.querySelectorAll('.price-time p');
        const totalPayment = document.querySelector('.total-payment h3');
    
        // Change plan prices
        planPrices.forEach(price => {
            const text = price.textContent;
            if (isYearly) {
                if (text.includes('$9/mo')) {
                    price.textContent = '$90/yr';
                } else if (text.includes('$12/mo')) {
                    price.textContent = '$120/yr';
                } else if (text.includes('$15/mo')) {
                    price.textContent = '$150/yr';
                }
            } else {
                if (text.includes('$90/yr')) {
                    price.textContent = '$9/mo';
                } else if (text.includes('$120/yr')) {
                    price.textContent = '$12/mo';
                } else if (text.includes('$150/yr')) {
                    price.textContent = '$15/mo';
                }
            }
        });
    
        // Toggle the free months text
        planSpans.forEach(span => {
            span.style.display = isYearly ? 'block' : 'none';
        });
    
        // Update the summary section
        const selectedPlanPrice = selectedPlan.querySelector('p').textContent;
        summaryHeader.textContent = summaryHeader.textContent.replace(isYearly ? 'Monthly' : 'Yearly', isYearly ? 'Yearly' : 'Monthly');
        summaryPrice.textContent = selectedPlanPrice;
    
        // Update add-ons and total price
        addOnPrices.forEach(price => {
            price.textContent = isYearly ? price.textContent.replace('mo', 'yr') : price.textContent.replace('yr', 'mo');
        });
    
        // Update the span text in the buttom-summary div to reflect yr or mo
        singlePrices.forEach(price => {
            const amount = parseFloat(price.textContent.replace(/[^0-9]/g, ''));
            price.textContent = isYearly ? `+$${amount * 12}/yr` : `+$${amount}/mo`;
        });
    
        // Calculate total amount
        let totalAmount = 0;
        singlePrices.forEach(price => {
            const amount = parseFloat(price.textContent.replace(/[^0-9]/g, ''));
            totalAmount += isYearly ? amount * 12 : amount; // Adjust total amount calculation
        });
        totalPayment.textContent = `+$${totalAmount}${isYearly ? '/yr' : '/mo'}`;
    }

    // Event listener for the yearly/monthly toggle button
    yearBtn.onclick = function() {
        yearBtn.classList.toggle("toggle-btn-on");
        activeYear.forEach(year => {
            year.classList.toggle('active-time');
        });
        const isYearly = yearBtn.classList.contains('toggle-btn-on');
        updatePrices(isYearly);
    };

    // Event listener for selecting a plan option
    planOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (selectedPlan) selectedPlan.classList.remove('selected');
            option.classList.add('selected');
            selectedPlan = option;

            // Update the summary with the selected plan's price
            const isYearly = yearBtn.classList.contains('toggle-btn-on');
            const selectedPlanPrice = selectedPlan.querySelector('p').textContent;
            document.querySelector('.top-summary span').textContent = selectedPlanPrice;
        });
    });

    // Set default selection
    selectedPlan.classList.add('selected');
    document.querySelector('.top-summary span').textContent = selectedPlan.querySelector('p').textContent;
});

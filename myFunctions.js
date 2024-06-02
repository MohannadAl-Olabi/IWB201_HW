    $(document).ready(function () {
        // CAPTCHA Generation
        function generateCaptcha() {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var captcha = '';
            for (var i = 0; i < 6; i++) {
                var index = Math.floor(Math.random() * characters.length);
                captcha += characters.charAt(index);
            }
            return captcha;
        }

            // Initialize the CAPTCHA
            var currentCaptcha = generateCaptcha();
    $('#captchaDisplay').text(currentCaptcha);

    // Toggle property details
    $(".check").change(function () {
        $(this).closest("tr").next(".hidden").toggleClass("visible");
            });

    // Handle form submission
    $('#propertyForm').submit(function (e) {
        e.preventDefault();  // Prevent default form submission

    var userCaptcha = $('#captchaInput').val();
    if (userCaptcha === currentCaptcha) {
                    // Check if form fields are valid
                    if (this.checkValidity()) {
                        // Collect form data
                        const details = {
        fullName: $('#fullName').val(),
    nationalID: $('#nationalID').val(),
    dob: $('#dob').val(),
    mobile: $('#mobile').val(),
    email: $('#email').val()
                        };

    // Retrieve selected property details
    var selectedDetails = $('input[type="radio"]:checked').closest("tr").next("tr.hidden").find("ul li").map(function () {
                            return $(this).text();
                        }).get().join('\n');

    // Display the alert message
    alert('Form submitted successfully! \nProperty details:\n' + selectedDetails);

    // Clear form and reset CAPTCHA
    $('#formContainer').fadeOut();
    $('#captchaInput').val('');
    currentCaptcha = generateCaptcha(); // Refresh CAPTCHA
    $('#captchaDisplay').text(currentCaptcha);
                    } else {
        alert('Please correct the errors and try again.');
                    }
                } else {
        alert('Incorrect CAPTCHA. Please try again.');
    $('#captchaInput').val(''); // Clear the captcha input for retry
    currentCaptcha = generateCaptcha(); // Refresh the CAPTCHA
    $('#captchaDisplay').text(currentCaptcha);
                }
            });

    // Button to open the form
    $('#continueButton').click(function () {
                if ($('input[type="radio"]:checked').length > 0) {
        $('#formContainer').fadeIn();
                } else {
        alert('Please select a property first.');
                }
            });

    // Button to close the form
    $('#closeForm').click(function () {
        $('#formContainer').fadeOut();
            });
        });


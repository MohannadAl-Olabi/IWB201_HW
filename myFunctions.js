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

    // Function to refresh CAPTCHA
    function refreshCaptcha() {
        currentCaptcha = generateCaptcha();
        $('#captchaDisplay').text(currentCaptcha);
    }

    // Event listener for CAPTCHA refresh button
    $('#refreshCaptcha').click(function () {
        refreshCaptcha();
    });

    // Toggle property details
    $(".check").change(function () {
        $(this).closest("tr").next(".hidden").toggleClass("visible");
    });

    function validateForm() {
        var isValid = true;
        var errorMsg = "";

        // Validate National ID (required)
        var nationalID = $('#nationalID').val();
        var regexNationalID = /^(0[1-9]|1[0-4])[0-9]{9}$/;
        if (!regexNationalID.test(nationalID)) {
            errorMsg += "الرقم الوطني غير صالح. يجب أن يبدأ بالأرقام بين 01-14 متبوعاً بـ 9 أرقام.\n";
            isValid = false;
        }

        // Validate other fields only if they are not empty
        var fullName = $('#fullName').val();
        if (fullName && !/^[أ-ي\s]+$/.test(fullName)) {
            errorMsg += "الاسم المدخل غير صالح. يجب استخدام الأحرف العربية والمسافات فقط.\n";
            isValid = false;
        }

        var dob = $('#dob').val();
        if (dob && !/^\d{2}-\d{2}-\d{4}$/.test(dob)) {
            errorMsg += "تاريخ ميلاد غير صالح. يرجى إدخال التاريخ بالتنسيق التالي dd-mm-yyyy.\n";
            isValid = false;
        }

        var mobile = $('#mobile').val();
        if (mobile && !/^09[^12]\d{7}$/.test(mobile)) {
            errorMsg += "رقم الجوال غير صالح. يجب أن يبدأ بـ 09 ويتبعه 8 أرقام.\n";
            isValid = false;
        }

        var email = $('#email').val();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg += "البريد الالكتروني المدخل غير صالح.\n";
            isValid = false;
        }

        // Display error message if validation fails
        if (!isValid) {
            alert(errorMsg);
        }

        return isValid;
    }

    // Handle the form display on button click
    $('#continueButton').click(function () {
        if ($('input[type="radio"]:checked').length > 0) {
            $('#formContainer').fadeIn();
        } else {
            alert('يرجى اختيار عقار أولاً.');
        }
    });

    // Button to close the form
    $('#closeForm').click(function () {
        $('#formContainer').fadeOut();
    });

    // Handle form submission
    $('#propertyForm').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            var userCaptcha = $('#captchaInput').val();
            if (userCaptcha === currentCaptcha) {
                const details = {
                    fullName: $('#fullName').val(),
                    nationalID: $('#nationalID').val(),
                    dob: $('#dob').val(),
                    mobile: $('#mobile').val(),
                    email: $('#email').val()
                };
                var selectedDetails = $('input[type="radio"]:checked').closest("tr").next("tr.hidden").find("ul li").map(function () {
                    return $(this).text();
                }).get().join('\n');
                alert('تم حجز العقار بنجاح! \nتفاصيل العقار:\n' + selectedDetails);
                $('#formContainer').fadeOut();
                $('#captchaInput').val('');
                refreshCaptcha(); // Refresh CAPTCHA
            } else {
                alert('رمز التحقق غير صحيح. حاول مرة أخرى.');
                $('#captchaInput').val(''); // Clear the captcha input for retry
                refreshCaptcha(); // Refresh the CAPTCHA
                
            }
        }
    });
});

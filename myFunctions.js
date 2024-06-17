$(document).ready(function () {
    // توليد رمز التحقق
    function generateCaptcha() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var captcha = '';
        for (var i = 0; i < 6; i++) {
            var index = Math.floor(Math.random() * characters.length);
            captcha += characters.charAt(index);
        }
        return captcha;
    }

    // عرض رمز التحقق
    var currentCaptcha = generateCaptcha();
    $('#captchaDisplay').text(currentCaptcha);

    // طريقة لإعادة توليد رمز التحقق
    function refreshCaptcha() {
        currentCaptcha = generateCaptcha();
        $('#captchaDisplay').text(currentCaptcha);
    }

    // حدث لإعادة توليد رمز التحقق
    $('#refreshCaptcha').click(function () {
        refreshCaptcha();
    });

    // إخفاء وإظهار تفاصيل العقار
    $(".check").change(function () {
        $(this).closest("tr").next(".hidden").toggleClass("visible");
    });

    // التحقق من صحة المدخلات في النموذج
    function validateForm() {
        var isValid = true;
        var errorMsg = "";

        // التحقق من الرقم الوطني
        var nationalID = $('#nationalID').val();
        var regexNationalID = /^(0[1-9]|1[0-4])[0-9]{9}$/;
        if (!regexNationalID.test(nationalID)) {
            errorMsg += "الرقم الوطني غير صالح. يجب أن يبدأ بالأرقام بين 01-14 متبوعاً بـ 9 أرقام.\n";
            isValid = false;
        }

        // التحقق من الاسم الكامل
        var fullName = $('#fullName').val();
        if (fullName && !/^[أ-ي\s]+$/.test(fullName)) {
            errorMsg += "الاسم المدخل غير صالح. يجب استخدام الأحرف العربية والمسافات فقط.\n";
            isValid = false;
        }
        // لم نستخدم نموذج التحقق من التاريخ لأننا وضعنا نوع الإدخال كتاريخ وليس نص يدوي
        // التحقق من التاريخ
        //var dob = $('#dob').val();
        //if (dob && !/^\d{2}-\d{2}-\d{4}$/.test(dob)) {
        //    errorMsg += "تاريخ ميلاد غير صالح. يرجى إدخال التاريخ بالتنسيق التالي dd-mm-yyyy.\n";
        //    isValid = false;
        //}

        // التحقق من رقم الموبايل
        var mobile = $('#mobile').val();
        if (mobile && !/^09[^12]\d{7}$/.test(mobile)) {
            errorMsg += "رقم الجوال غير صالح. يجب أن يبدأ بـ 09 ويتبعه 8 أرقام.\n";
            isValid = false;
        }

        // التحقق من الايميل
        var email = $('#email').val();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg += "البريد الالكتروني المدخل غير صالح.\n";
            isValid = false;
        }

        // عرض رسالة خطأ في حال فشل التحقق
        if (!isValid) {
            alert(errorMsg);
        }

        return isValid;
    }

    // عرض النموذج
    $('#continueButton').click(function () {
        if ($('input[type="radio"]:checked').length > 0) {
            $('#formContainer').fadeIn();
        } else {
            alert('يرجى اختيار عقار أولاً.');
        }
    });

    // زر لإغلاق النموذج
    $('#closeForm').click(function () {
        $('#formContainer').fadeOut();
    });

    // حدث إرسال النموذج
    $('#propertyForm').on('submit', function (e) {
        e.preventDefault(); // لمنع إرسال النموذج دون القيام بالتحقق

        if (validateForm()) {
            var userCaptcha = $('#captchaInput').val();
            if (userCaptcha === currentCaptcha) {

                var selectedDetails = $('input[type="radio"]:checked').closest("tr").next("tr.hidden").find("ul li").map(function () {
                    return $(this).text();
                }).get().join('\n');
                alert('تم حجز العقار بنجاح! \n\nتفاصيل العقار:\n' + selectedDetails);
                $('#formContainer').fadeOut();
                $('#captchaInput').val('');
                refreshCaptcha();
            } else {
                alert('رمز التحقق غير صحيح. حاول مرة أخرى.');
                $('#captchaInput').val('');
                refreshCaptcha();

            }
        }
    });
});

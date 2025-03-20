$(document).ready(function() {
    // Password visibility toggle
    $('#toggle-visibility').on('click', function() {
        var passwordField = $('#password');
        var type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);

        // Toggle eye icon
        $(this).find('i').toggleClass('fa-eye fa-eye-slash');
    });

    // Listen for password input
    $('#password').on('input', function() {
        var password = $(this).val();
        var strength = checkPasswordStrength(password);
        updateStrengthBar(strength);
        updateRequirements(password);
    });

    function checkPasswordStrength(password) {
        var strength = 0;

        // Length check (at least 8 characters)
        if (password.length >= 8) strength += 1;

        // Uppercase letter check
        if (/[A-Z]/.test(password)) strength += 1;

        // Lowercase letter check
        if (/[a-z]/.test(password)) strength += 1;

        // Number check
        if (/\d/.test(password)) strength += 1;

        // Special character check
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

        return strength;
    }

    function updateStrengthBar(strength) {
        var strengthText = "";
        var strengthClass = "";
        var strengthColor = "#ddd";

        if (strength <= 2) {
            strengthText = "Weak";
            strengthClass = "weak";
        } else if (strength <= 4) {
            strengthText = "Moderate";
            strengthClass = "medium";
        } else {
            strengthText = "Strong";
            strengthClass = "strong";
        }

        // Adjust strength bar
        var width = (strength * 20) + "%";
        $('#strength-bar').css('width', width).removeClass().addClass(strengthClass);
        $('#strength-text').text(strengthText);
    }

    function updateRequirements(password) {
        // Validate password against criteria
        var requirements = [
            { regex: /.{8,}/, index: "#length-requirement" },
            { regex: /[a-z]/, index: "#lowercase-requirement" },
            { regex: /[A-Z]/, index: "#uppercase-requirement" },
            { regex: /\d/, index: "#number-requirement" },
            { regex: /[!@#$%^&*(),.?":{}|<>]/, index: "#special-requirement" }
        ];

        // Update requirements based on password
        requirements.forEach(function(requirement) {
            if (requirement.regex.test(password)) {
                $(requirement.index).find('.cross').text('✔').removeClass('cross').addClass('check');
            } else {
                $(requirement.index).find('.check').text('❌').removeClass('check').addClass('cross');
            }
        });
    }
});

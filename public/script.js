// ======================================================
// PROFILEFLOW - COMPLETE REGISTRATION JAVASCRIPT
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ==================================================
    // GET FORM ELEMENTS
    // ==================================================

    const form = document.getElementById("registrationForm");

    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const bio = document.getElementById("bio");
    const bioCount = document.getElementById("bioCount");

    const submitButton = document.getElementById("submitButton");

    let isSubmitting = false;

    // ==================================================
    // LIVE BIO CHARACTER COUNTER
    // ==================================================

    function updateBioCount() {
        if (!bio || !bioCount) {
            return;
        }

        const length = bio.value.length;

        bioCount.textContent = length;

        const counter = bioCount.parentElement;

        if (counter) {
            counter.setAttribute(
                "aria-label",
                `${length} of 250 characters used`
            );

            counter.style.color = length >= 250
                ? "#c0392b"
                : "";
        }

        if (length > 250) {
            bio.value = bio.value.slice(0, 250);
            bioCount.textContent = "250";
        }
    }

    if (bio) {
        bio.addEventListener("input", updateBioCount);
        bio.addEventListener("change", updateBioCount);

        // Show the correct count for restored form data.
        updateBioCount();
    }

    // ==================================================
    // PHONE NUMBER: DIGITS ONLY
    // ==================================================

    if (phone) {
        phone.addEventListener("input", function () {
            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 10);

            this.setCustomValidity("");
        });
    }

    // ==================================================
    // PASSWORD STRENGTH INDICATOR
    // ==================================================

    if (password) {
        password.addEventListener("input", function () {
            const length = this.value.length;

            if (length >= 12) {
                this.style.borderColor = "#438b65";
            } else if (length >= 8) {
                this.style.borderColor = "#c9a44c";
            } else {
                this.style.borderColor = "";
            }

            this.setCustomValidity("");

            validatePasswordMatch();
        });
    }

    // ==================================================
    // CONFIRM PASSWORD VALIDATION
    // ==================================================

    function validatePasswordMatch() {
        if (!password || !confirmPassword) {
            return true;
        }

        if (!confirmPassword.value) {
            confirmPassword.setCustomValidity("");
            return false;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );

            return false;
        }

        confirmPassword.setCustomValidity("");
        return true;
    }

    if (confirmPassword) {
        confirmPassword.addEventListener("input", function () {
            validatePasswordMatch();
        });
    }

    // ==================================================
    // DATE OF BIRTH VALIDATION
    // ==================================================

    function validateDateOfBirth() {
        if (!dob || !dob.value) {
            return true;
        }

        const birthDate = new Date(dob.value + "T00:00:00");
        const today = new Date();

        today.setHours(23, 59, 59, 999);

        if (
            Number.isNaN(birthDate.getTime()) ||
            birthDate > today
        ) {
            dob.setCustomValidity(
                "Please enter a valid date of birth that is not in the future."
            );

            return false;
        }

        dob.setCustomValidity("");
        return true;
    }

    if (dob) {
        dob.addEventListener("change", validateDateOfBirth);
    }

    // ==================================================
    // VALIDATION HELPERS
    // ==================================================

    function setError(field, message) {
        if (field) {
            field.setCustomValidity(message);
        }
    }

    function clearError(field) {
        if (field) {
            field.setCustomValidity("");
        }
    }

    // ==================================================
    // COMPLETE FORM VALIDATION
    // ==================================================

    function validateForm() {
        let valid = true;

        // Clear previous custom errors.
        [
            name,
            email,
            phone,
            dob,
            password,
            confirmPassword,
            bio
        ].forEach(clearError);

        // ----------------------------------------------
        // FULL NAME
        // ----------------------------------------------

        if (!name || name.value.trim().length < 3) {
            setError(
                name,
                "Full name must contain at least 3 characters."
            );

            valid = false;
        }

        // ----------------------------------------------
        // EMAIL
        // ----------------------------------------------

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !email ||
            !emailPattern.test(email.value.trim())
        ) {
            setError(
                email,
                "Please enter a valid email address."
            );

            valid = false;
        }

        // ----------------------------------------------
        // PHONE
        // ----------------------------------------------

        if (
            !phone ||
            !/^[0-9]{10}$/.test(phone.value.trim())
        ) {
            setError(
                phone,
                "Phone number must contain exactly 10 digits."
            );

            valid = false;
        }

        // ----------------------------------------------
        // DATE OF BIRTH
        // ----------------------------------------------

        if (!dob || !dob.value) {
            setError(
                dob,
                "Please enter your date of birth."
            );

            valid = false;
        } else if (!validateDateOfBirth()) {
            valid = false;
        }

        // ----------------------------------------------
        // PASSWORD
        // ----------------------------------------------

        if (!password || password.value.length < 8) {
            setError(
                password,
                "Password must contain at least 8 characters."
            );

            valid = false;
        }

        // ----------------------------------------------
        // CONFIRM PASSWORD
        // ----------------------------------------------

        if (
            !confirmPassword ||
            !password ||
            password.value !== confirmPassword.value
        ) {
            setError(
                confirmPassword,
                "Passwords do not match."
            );

            valid = false;
        }

        // ----------------------------------------------
        // GENDER
        // ----------------------------------------------

        const genderSelected = document.querySelector(
            'input[name="gender"]:checked'
        );

        if (!genderSelected) {
            alert("Please select your gender.");
            valid = false;
        }

        // ----------------------------------------------
        // SKILLS
        // ----------------------------------------------

        const selectedSkills = document.querySelectorAll(
            'input[name="skills"]:checked'
        );

        if (selectedSkills.length === 0) {
            alert("Please select at least one skill.");
            valid = false;
        }

        // ----------------------------------------------
        // ABOUT YOU
        // ----------------------------------------------

        if (!bio || bio.value.trim().length < 20) {
            setError(
                bio,
                "About you must contain at least 20 characters."
            );

            valid = false;
        } else if (bio.value.length > 250) {
            setError(
                bio,
                "About you cannot exceed 250 characters."
            );

            valid = false;
        }

        // ----------------------------------------------
        // TERMS AND CONDITIONS
        // ----------------------------------------------

        const terms = document.querySelector(
            'input[name="terms"]'
        );

        if (!terms || !terms.checked) {
            alert(
                "You must accept the terms and conditions."
            );

            valid = false;
        }

        // ----------------------------------------------
        // SHOW THE FIRST INVALID FIELD
        // ----------------------------------------------

        if (!valid) {
            const firstInvalid = form
                ? form.querySelector(":invalid")
                : null;

            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.reportValidity();
            }

            return false;
        }

        return true;
    }

    // ==================================================
    // MAKE VALIDATION ACCESSIBLE TO THE HTML FORM
    // ==================================================

    window.validateForm = validateForm;

    // ==================================================
    // FORM SUBMISSION
    // ==================================================

    if (form) {
        form.addEventListener("submit", function (event) {
            if (isSubmitting) {
                event.preventDefault();
                return;
            }

            if (!validateForm()) {
                event.preventDefault();
                return;
            }

            isSubmitting = true;

            if (submitButton) {
                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <span>Creating Profile...</span>
                    <span>✓</span>
                `;
            }

            // Allow the browser to submit the form to Express.
        });
    }

    // ==================================================
    // RESTORE BUTTON AFTER BROWSER NAVIGATION
    // ==================================================

    window.addEventListener("pageshow", function () {
        isSubmitting = false;

        if (submitButton) {
            submitButton.disabled = false;

            submitButton.innerHTML = `
                <span>Create Profile</span>
                <span>→</span>
            `;
        }

        updateBioCount();
    });

    // ==================================================
    // INITIALIZE
    // ==================================================

    updateBioCount();

    console.log(
        "ProfileFlow registration validation initialized."
    );
});
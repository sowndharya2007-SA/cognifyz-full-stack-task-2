const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

// Temporary storage for registered profiles
const registeredUsers = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve CSS and JavaScript files
app.use(express.static(path.join(__dirname, "public")));

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ==========================================
// REGISTRATION PAGE
// ==========================================

app.get("/", (req, res) => {
    res.render("index", {
        errors: [],
        oldData: {}
    });
});

// ==========================================
// REGISTRATION SUBMISSION
// ==========================================

app.post("/register", (req, res) => {

    const {
        fullName = "",
        email = "",
        phone = "",
        dob = "",
        password = "",
        confirmPassword = "",
        gender = "",
        bio = ""
    } = req.body;

    const errors = [];

    // Handle skills
    let skills = req.body.skills || [];

    if (!Array.isArray(skills)) {
        skills = [skills];
    }

    // FIX: Check whether the checkbox was actually submitted
    const acceptedTerms =
        Object.prototype.hasOwnProperty.call(
            req.body,
            "terms"
        );

    // ==========================================
    // SERVER-SIDE VALIDATION
    // ==========================================

    if (fullName.trim().length < 3) {
        errors.push(
            "Full name must contain at least 3 characters."
        );
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
        errors.push(
            "Please enter a valid email address."
        );
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
        errors.push(
            "Phone number must contain exactly 10 digits."
        );
    }

    if (!dob) {
        errors.push(
            "Please enter your date of birth."
        );
    } else {
        const birthDate = new Date(`${dob}T00:00:00`);
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        if (
            Number.isNaN(birthDate.getTime()) ||
            birthDate > today
        ) {
            errors.push(
                "Please enter a valid date of birth."
            );
        }
    }

    if (password.length < 8) {
        errors.push(
            "Password must contain at least 8 characters."
        );
    }

    if (password !== confirmPassword) {
        errors.push(
            "Passwords do not match."
        );
    }

    if (
        !["Female", "Male", "Other"].includes(gender)
    ) {
        errors.push(
            "Please select your gender."
        );
    }

    const allowedSkills = [
        "Python",
        "JavaScript",
        "Java",
        "SQL"
    ];

    skills = skills.filter(skill =>
        allowedSkills.includes(skill)
    );

    if (skills.length === 0) {
        errors.push(
            "Please select at least one skill."
        );
    }

    if (bio.trim().length < 20) {
        errors.push(
            "About you must contain at least 20 characters."
        );
    }

    if (bio.trim().length > 250) {
        errors.push(
            "About you cannot exceed 250 characters."
        );
    }

    // ==========================================
    // TERMS AND CONDITIONS VALIDATION
    // ==========================================

    if (!acceptedTerms) {
        errors.push(
            "You must accept the terms and conditions."
        );
    }

    // ==========================================
    // DISPLAY VALIDATION ERRORS
    // ==========================================

    if (errors.length > 0) {

        return res.status(400).render("index", {
            errors,

            oldData: {
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                dob,
                gender,
                skills,
                bio: bio.trim(),
                terms: acceptedTerms
            }
        });
    }

    // ==========================================
    // CREATE PROFILE
    // ==========================================

    const user = {
        id: registeredUsers.length + 1,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        dob,
        gender,
        skills,
        bio: bio.trim()
    };

    registeredUsers.push(user);

    // Passwords are deliberately not stored or displayed.
    res.render("profile", {
        user
    });
});

// ==========================================
// HANDLE UNKNOWN ROUTES
// ==========================================

app.use((req, res) => {
    res.status(404).send(
        "Page not found. Please return to the registration page."
    );
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log(
        `ProfileFlow running at http://localhost:${PORT}`
    );
});
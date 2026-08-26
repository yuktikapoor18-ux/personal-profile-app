/* =========================================
   PERSONAL PROFILE APP
   ========================================= */


/* DEFAULT DATA */

const defaultProfile = {

    name: "Your Name",

    college: "Your College • Your Branch",

    bio: "Write a short introduction about yourself here.",

    skills: [
        "HTML",
        "CSS",
        "JavaScript"
    ],

    github: "https://github.com/",

    linkedin: "https://linkedin.com/",

    instagram: "https://instagram.com/",

    email: "example@email.com",

    photo: "https://placehold.co/180x180?text=Photo"

};


/* LOAD SAVED DATA */

let profile;

try {

    const saved =
        localStorage.getItem("studentProfile");

    profile =
        saved
            ? JSON.parse(saved)
            : { ...defaultProfile };

} catch (error) {

    profile = { ...defaultProfile };

}


/* SAVE DATA */

function saveData() {

    localStorage.setItem(
        "studentProfile",
        JSON.stringify(profile)
    );

}


/* ELEMENTS */

const profileName =
    document.getElementById("profileName");

const profileCollege =
    document.getElementById("profileCollege");

const profileBio =
    document.getElementById("profileBio");

const profilePhoto =
    document.getElementById("profilePhoto");

const skillsList =
    document.getElementById("skillsList");

const skillInput =
    document.getElementById("skillInput");

const addSkillBtn =
    document.getElementById("addSkillBtn");

const editBtn =
    document.getElementById("editBtn");

const modal =
    document.getElementById("modal");

const closeBtn =
    document.getElementById("closeBtn");

const saveBtn =
    document.getElementById("saveBtn");

const themeBtn =
    document.getElementById("themeBtn");

const photoInput =
    document.getElementById("photoInput");

const shareBtn =
    document.getElementById("shareBtn");

const copyBtn =
    document.getElementById("copyBtn");

const resetBtn =
    document.getElementById("resetBtn");


/* =========================================
   DISPLAY PROFILE
   ========================================= */

function displayProfile() {

    profileName.textContent =
        profile.name;

    profileCollege.textContent =
        profile.college;

    profileBio.textContent =
        profile.bio;

    profilePhoto.src =
        profile.photo;


    document.getElementById("github").href =
        profile.github;

    document.getElementById("linkedin").href =
        profile.linkedin;

    document.getElementById("instagram").href =
        profile.instagram;

    document.getElementById("email").href =
        "mailto:" + profile.email;


    displaySkills();

    updateCompletion();

}


/* =========================================
   DISPLAY SKILLS
   ========================================= */

function displaySkills() {

    skillsList.innerHTML = "";

    profile.skills.forEach(
        function(skill, index) {

            const skillDiv =
                document.createElement("div");

            skillDiv.className =
                "skill";


            const skillText =
                document.createElement("span");

            skillText.textContent =
                skill;


            const removeButton =
                document.createElement("button");

            removeButton.textContent =
                "×";

            removeButton.className =
                "remove-skill";


            removeButton.addEventListener(
                "click",
                function() {

                    profile.skills.splice(
                        index,
                        1
                    );

                    saveData();

                    displayProfile();

                }
            );


            skillDiv.appendChild(
                skillText
            );

            skillDiv.appendChild(
                removeButton
            );

            skillsList.appendChild(
                skillDiv
            );

        }
    );

}


/* =========================================
   ADD SKILL
   ========================================= */

function addSkill() {

    const skill =
        skillInput.value.trim();


    if (skill === "") {

        alert(
            "Please enter a skill."
        );

        return;

    }


    const duplicate =
        profile.skills.some(
            function(existingSkill) {

                return (
                    existingSkill.toLowerCase() ===
                    skill.toLowerCase()
                );

            }
        );


    if (duplicate) {

        alert(
            "This skill is already added."
        );

        return;

    }


    if (profile.skills.length >= 12) {

        alert(
            "Maximum 12 skills allowed."
        );

        return;

    }


    profile.skills.push(skill);

    skillInput.value = "";

    saveData();

    displayProfile();

}


addSkillBtn.addEventListener(
    "click",
    addSkill
);


skillInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addSkill();

        }

    }
);


/* =========================================
   EDIT PROFILE
   ========================================= */

editBtn.addEventListener(
    "click",
    function() {

        document.getElementById("nameInput").value =
            profile.name;

        document.getElementById("collegeInput").value =
            profile.college;

        document.getElementById("bioInput").value =
            profile.bio;

        document.getElementById("githubInput").value =
            profile.github;

        document.getElementById("linkedinInput").value =
            profile.linkedin;

        document.getElementById("instagramInput").value =
            profile.instagram;

        document.getElementById("emailInput").value =
            profile.email;


        modal.classList.add("show");

    }
);


/* =========================================
   CLOSE MODAL
   ========================================= */

closeBtn.addEventListener(
    "click",
    function() {

        modal.classList.remove("show");

    }
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    }
);


/* =========================================
   SAVE EDITED PROFILE
   ========================================= */

saveBtn.addEventListener(
    "click",
    function() {

        const name =
            document
                .getElementById("nameInput")
                .value
                .trim();

        const college =
            document
                .getElementById("collegeInput")
                .value
                .trim();

        const bio =
            document
                .getElementById("bioInput")
                .value
                .trim();

        const github =
            document
                .getElementById("githubInput")
                .value
                .trim();

        const linkedin =
            document
                .getElementById("linkedinInput")
                .value
                .trim();

        const instagram =
            document
                .getElementById("instagramInput")
                .value
                .trim();

        const email =
            document
                .getElementById("emailInput")
                .value
                .trim();


        if (name === "") {

            alert(
                "Please enter your name."
            );

            return;

        }


        profile.name =
            name;

        profile.college =
            college ||
            "Your College • Your Branch";

        profile.bio =
            bio ||
            "Write a short introduction about yourself here.";

        profile.github =
            github ||
            "https://github.com/";

        profile.linkedin =
            linkedin ||
            "https://linkedin.com/";

        profile.instagram =
            instagram ||
            "https://instagram.com/";

        profile.email =
            email ||
            "example@email.com";


        saveData();

        displayProfile();

        modal.classList.remove("show");

    }
);


/* =========================================
   PROFILE PHOTO
   ========================================= */

photoInput.addEventListener(
    "change",
    function(event) {

        const file =
            event.target.files[0];


        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            alert(
                "Please select an image."
            );

            return;

        }


        if (file.size > 2 * 1024 * 1024) {

            alert(
                "Please select an image smaller than 2 MB."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function() {

                profile.photo =
                    reader.result;

                saveData();

                displayProfile();

            };


        reader.readAsDataURL(file);

    }
);


/* =========================================
   PROFILE COMPLETION
   ========================================= */

function updateCompletion() {

    let completed = 0;

    let total = 8;


    if (
        profile.name &&
        profile.name !== "Your Name"
    ) {

        completed++;

    }


    if (
        profile.college &&
        profile.college !==
        "Your College • Your Branch"
    ) {

        completed++;

    }


    if (
        profile.bio &&
        profile.bio !==
        "Write a short introduction about yourself here."
    ) {

        completed++;

    }


    if (
        profile.skills &&
        profile.skills.length > 0
    ) {

        completed++;

    }


    if (
        profile.photo &&
        !profile.photo.includes(
            "placehold.co"
        )
    ) {

        completed++;

    }


    if (
        profile.github &&
        profile.github !==
        "https://github.com/"
    ) {

        completed++;

    }


    if (
        profile.linkedin &&
        profile.linkedin !==
        "https://linkedin.com/"
    ) {

        completed++;

    }


    if (
        profile.email &&
        profile.email !==
        "example@email.com"
    ) {

        completed++;

    }


    const percentage =
        Math.round(
            completed / total * 100
        );


    document.getElementById(
        "completionText"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";

}


/* =========================================
   COPY PROFILE
   ========================================= */

copyBtn.addEventListener(
    "click",
    async function() {

        const details =

`PERSONAL PROFILE

Name: ${profile.name}

College / Branch:
${profile.college}

Bio:
${profile.bio}

Skills:
${profile.skills.join(", ")}

GitHub:
${profile.github}

LinkedIn:
${profile.linkedin}

Instagram:
${profile.instagram}

Email:
${profile.email}`;


        try {

            await navigator.clipboard.writeText(
                details
            );

            copyBtn.textContent =
                "✅ Copied!";


            setTimeout(
                function() {

                    copyBtn.textContent =
                        "📋 Copy Details";

                },
                2000
            );

        } catch (error) {

            alert(
                "Copy is not supported in this browser."
            );

        }

    }
);


/* =========================================
   SHARE PROFILE
   ========================================= */

shareBtn.addEventListener(
    "click",
    async function() {

        const shareData = {

            title:
                profile.name +
                "'s Profile",

            text:
                profile.name +
                " - " +
                profile.college,

            url:
                window.location.href

        };


        if (
            navigator.share
        ) {

            try {

                await navigator.share(
                    shareData
                );

            } catch (error) {

                // Sharing cancelled.

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                shareBtn.textContent =
                    "✅ Link Copied!";


                setTimeout(
                    function() {

                        shareBtn.textContent =
                            "📤 Share Profile";

                    },
                    2000
                );

            } catch (error) {

                alert(
                    "Sharing is not supported."
                );

            }

        }

    }
);


/* =========================================
   DARK MODE
   ========================================= */

let darkMode =
    localStorage.getItem(
        "profileTheme"
    ) === "dark";


function applyTheme() {

    if (darkMode) {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

    } else {

        document.body.classList.remove("dark");

        themeBtn.textContent = "🌙";

    }

}


themeBtn.addEventListener(
    "click",
    function() {

        darkMode =
            !darkMode;


        localStorage.setItem(
            "profileTheme",
            darkMode
                ? "dark"
                : "light"
        );


        applyTheme();

    }
);


/* =========================================
   RESET
   ========================================= */

resetBtn.addEventListener(
    "click",
    function() {

        const answer =
            confirm(
                "Are you sure you want to reset your profile?"
            );


        if (!answer) {
            return;
        }


        profile =
            JSON.parse(
                JSON.stringify(
                    defaultProfile
                )
            );


        saveData();

        displayProfile();

    }
);


/* =========================================
   START APP
   ========================================= */

applyTheme();

displayProfile();
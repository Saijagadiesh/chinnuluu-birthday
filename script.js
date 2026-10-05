const enterButton = document.getElementById("enterButton");
const heroContent = document.querySelector(".hero-content");
const hero = document.querySelector(".hero");
const memoriesSection = document.getElementById("memories");


/* =================================
   STAGE 2 — HERO
================================= */

window.addEventListener("load", () => {

    heroContent.classList.add("hero-hidden");

    setTimeout(() => {

        heroContent.classList.remove("hero-hidden");
        heroContent.classList.add("hero-visible");

        // IMPORTANT:
        // The photo animation depends on .hero-visible
        // being on the HERO parent, not only the content.
        hero.classList.add("hero-visible");

    }, 300);

});


/* =================================
   STAGE 8 — BACKGROUND MUSIC
================================= */

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

let musicStarted = false;


if (backgroundMusic) {

    backgroundMusic.volume = 0.45;

}


function startBackgroundMusic() {

    if (!backgroundMusic || musicStarted) {
        return;
    }

    backgroundMusic
        .play()
        .then(() => {

            musicStarted = true;

            if (musicToggle) {
                musicToggle.classList.add("is-playing");
            }

        })
        .catch((error) => {

            console.log(
                "Music waiting for user interaction.",
                error
            );

        });

}


/* =================================
   HERO ENTER BUTTON
================================= */

if (enterButton) {

    enterButton.addEventListener("click", () => {

        enterButton.disabled = true;

        // Start music after the user's click.
        startBackgroundMusic();

        hero.classList.add("hero-exit");

        setTimeout(() => {

            if (memoriesSection) {

                memoriesSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 550);

    });

}


/* =================================
   MUSIC TOGGLE
================================= */

if (backgroundMusic && musicToggle) {

    musicToggle.addEventListener("click", () => {

        if (backgroundMusic.paused) {

            backgroundMusic
                .play()
                .then(() => {

                    musicStarted = true;

                    musicToggle.classList.add(
                        "is-playing"
                    );

                })
                .catch((error) => {

                    console.error(
                        "Music playback failed:",
                        error
                    );

                });

        } else {

            backgroundMusic.pause();

            musicToggle.classList.remove(
                "is-playing"
            );

        }

    });

}


/* =================================
   STAGE 4 — VIDEO FUNCTIONALITY
================================= */

const birthdayVideo =
    document.getElementById("birthdayVideo");

const videoPlayButton =
    document.getElementById("videoPlayButton");

const videoFrame =
    document.querySelector(".video-frame");

const videoSection =
    document.getElementById("videoMoment");

const videoCaption =
    document.getElementById("videoCaption");


if (birthdayVideo && videoPlayButton) {

    videoPlayButton.addEventListener(
        "click",
        async () => {

            try {

                birthdayVideo.controls = true;

                await birthdayVideo.play();

            } catch (error) {

                console.error(
                    "Video playback failed:",
                    error
                );

            }

        }
    );


    birthdayVideo.addEventListener(
    "play",
    () => {

        videoFrame.classList.add(
            "is-playing"
        );

        videoCaption.textContent = "♡";


        // Pause background music while video plays.

        if (backgroundMusic) {

            backgroundMusic.pause();

            console.log("Background music paused for video.");

        }

        if (musicToggle) {

            musicToggle.classList.remove(
                "is-playing"
            );

        }

    }
);


    birthdayVideo.addEventListener(
        "ended",
        () => {

            videoFrame.classList.add(
                "is-playing"
            );

            videoSection.classList.add(
                "video-finished"
            );

            videoCaption.textContent =
                "And after all these little moments... ♡";


            // Resume background music after video.

            if (
                backgroundMusic &&
                musicStarted
            ) {

                backgroundMusic
                    .play()
                    .then(() => {

                        if (musicToggle) {

                            musicToggle.classList.add(
                                "is-playing"
                            );

                        }

                    })
                    .catch(() => {});

            }

        }
    );

}


/* =================================
   STAGE 5 — BIRTHDAY MOMENT
================================= */

const birthdayMoment =
    document.getElementById("birthdayMoment");

const birthdayContinue =
    document.getElementById("birthdayContinue");


if (birthdayMoment) {

    const birthdayObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        birthdayMoment.classList.add(
                            "is-visible"
                        );

                        birthdayObserver.unobserve(
                            birthdayMoment
                        );

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

    birthdayObserver.observe(birthdayMoment);

}


if (birthdayContinue) {

    birthdayContinue.addEventListener(
        "click",
        () => {

            const letterSection =
                document.getElementById("letter");

            if (letterSection) {

                letterSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* =================================
   STAGE 6 — PERSONAL LETTER
================================= */

const letterSection =
    document.getElementById("letter");

const letterContinue =
    document.getElementById("letterContinue");


if (letterSection) {

    const letterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        letterSection.classList.add(
                            "is-visible"
                        );

                        letterObserver.unobserve(
                            letterSection
                        );

                    }

                });

            },
            {
    threshold: 0.05,
    rootMargin: "0px 0px -5% 0px"
}
        );

    letterObserver.observe(letterSection);

}


if (letterContinue) {

    letterContinue.addEventListener(
        "click",
        () => {

            const finalSection =
                document.getElementById("final");

            if (finalSection) {

                finalSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* =================================
   STAGE 7 — ONE LAST QUESTION
================================= */

const memoryGuess =
    document.getElementById("memoryGuess");

const guessButton =
    document.getElementById("guessButton");

const guessResult =
    document.getElementById("guessResult");

const memoryReveal =
    document.getElementById("memoryReveal");

const questionBox =
    document.getElementById("questionBox");


if (
    memoryGuess &&
    guessButton &&
    guessResult &&
    memoryReveal
) {

    function checkGuess() {

        const value =
            Number(memoryGuess.value);


        if (
            !Number.isFinite(value) ||
            value < 1 ||
            value > 999
        ) {

            guessResult.textContent =
                "Come on ra 😂 Pick a number between 1 and 999.";

            memoryReveal.classList.remove(
                "is-visible"
            );

            return;

        }


        questionBox.style.opacity = "0";

        questionBox.style.transform =
            "translateY(-12px)";


        setTimeout(() => {

            questionBox.style.display =
                "none";

            memoryReveal.classList.add(
                "is-visible"
            );

        }, 450);

    }


    guessButton.addEventListener(
        "click",
        checkGuess
    );


    memoryGuess.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                checkGuess();

            }

        }
    );

}
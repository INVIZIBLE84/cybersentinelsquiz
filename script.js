const questions = [
    {
        question: "You receive an email claiming you've won a lottery and need to provide your bank details to claim the prize. What should you do?",
        options: ["Reply with your bank details", "Ignore the email", "Click the link and enter your details", "Forward it to your friend"],
        answer: 1
    },
    {
        question: "A website looks almost identical to your bank’s site, but the URL is slightly different. What’s the safest action?",
        options: ["Log in quickly", "Double-check the URL and contact the bank", "Ignore it and try again later", "Bookmark the site"],
        answer: 1
    },
    {
        question: "You get an email from PayPal asking you to update your payment info via a link. How do you respond?",
        options: ["Click the link and update info", "Ignore it", "Log into PayPal directly to check", "Reply to the email"],
        answer: 2
    },
    {
        question: "You receive a text from your bank warning of suspicious activity and asking you to confirm your account details. What should you do?",
        options: ["Reply with your account details", "Ignore the text", "Call the bank using an official number", "Forward it to a friend"],
        answer: 2
    },
    {
        question: "A social media post promises a big reward if you click a link and enter personal details. What should you do?",
        options: ["Click the link and enter details", "Ignore the post", "Report the post as suspicious", "Comment on the post"],
        answer: 2
    },
    {
        question: "An email claims to be from Amazon, asking you to reset your password because of unusual login attempts. What should you do?",
        options: ["Click the link and reset your password", "Go to Amazon directly and check your account", "Reply to the email for more information", "Ignore it"],
        answer: 1
    },
    {
        question: "You receive a friend request from someone you don’t know, but they have mutual friends. What should you do?",
        options: ["Accept the request", "Check their profile for authenticity", "Ignore it", "Send them a message to confirm"],
        answer: 1
    },
    {
        question: "You get a call from someone claiming to be from tech support, asking for remote access to your computer. What should you do?",
        options: ["Grant access", "Ask for their employee ID", "Hang up and contact the company directly", "Follow their instructions"],
        answer: 2
    },
    {
        question: "A pop-up claims your computer is infected and provides a number to call for assistance. What should you do?",
        options: ["Call the number", "Close the pop-up and run a virus scan", "Ignore it", "Restart your computer"],
        answer: 1
    },
    {
        question: "You receive a message from your boss asking you to buy gift cards and send the codes. What should you do?",
        options: ["Buy the gift cards immediately", "Verify the request with your boss through another channel", "Ignore the message", "Reply and ask for clarification"],
        answer: 1
    },
    {
        question: "An email says your account has been suspended and asks you to log in to verify your details. What should you do?",
        options: ["Log in immediately", "Check the email address and contact the company directly", "Ignore the email", "Reply to the email"],
        answer: 1
    },
    {
        question: "You notice a charge on your credit card you don’t recognize. What should you do?",
        options: ["Ignore it", "Report it to your bank immediately", "Wait to see if it happens again", "Call the number on the transaction"],
        answer: 1
    },
    {
        question: "You get an email from a friend with a suspicious link. What should you do?",
        options: ["Click the link to see what it is", "Ignore it", "Confirm with your friend if they sent it", "Forward the email"],
        answer: 2
    },
    {
        question: "An email claims you need to verify your account password or it will be deleted. What should you do?",
        options: ["Click the link and verify", "Ignore it", "Log into the account directly to check", "Reply for more details"],
        answer: 2
    },
    {
        question: "You get a call from an unknown number saying you’ve won a prize but need to pay shipping fees. What should you do?",
        options: ["Pay the fee", "Hang up and report the call", "Ask for more details", "Give your address to receive the prize"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let timer = 120;
let questionTimer = 20;
let countdown;
let questionCountdown;

const backgroundAudio = new Audio("sound.mp3");
const applauseAudio = new Audio("applause.mp3");
const explosionAudio = new Audio("explosion.mp3");
const beepAudio = new Audio("beep.mp3"); // Beeping sound for tension

document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    
    startTimer();
    backgroundAudio.play();
    loadQuestion();
});

function startTimer() {
    countdown = setInterval(() => {
        timer--;
        
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        
        document.getElementById("timer").innerHTML = `<h2>⏳ ${minutes}:${seconds < 10 ? '0' + seconds : seconds}</h2>`;
        
        if (timer === 30 || timer === 20 || timer === 10) {
            beepAudio.play(); // Play beeping sound at key moments
        }
        
        if (timer <= 5) {
            beepAudio.play(); // Increase intensity as time runs out
        }
        
        if (timer <= 0) {
            clearInterval(countdown);
            triggerExplosion();
        }
    }, 1000);
}

function startQuestionTimer() {
    clearInterval(questionCountdown);
    questionTimer = 20;
    
    questionCountdown = setInterval(() => {
        questionTimer--;
        document.getElementById("question-timer").innerHTML = `<h3>⏳ Time Left: ${questionTimer}s</h3>`;
        
        if (questionTimer <= 5) {
            beepAudio.play(); // Increase tension as time runs out
        }
        
        if (questionTimer <= 0) {
            clearInterval(questionCountdown);
            triggerExplosion();
        }
    }, 1000);
}

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const resultElement = document.getElementById("result");
    
    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = "";
    resultElement.textContent = "";
    
    if (!document.getElementById("question-timer")) {
        const timerElement = document.createElement("div");
        timerElement.id = "question-timer";
        document.getElementById("quiz-screen").prepend(timerElement);
    }
    
    startQuestionTimer();
    
    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        
        button.addEventListener("click", () => checkAnswer(index));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    clearInterval(questionCountdown);
    
    if (selectedIndex !== questions[currentQuestionIndex].answer) {
        triggerExplosion();
    } else {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            triggerSuccess();
        }
    }
}

function triggerExplosion() {
    document.getElementById("quiz-screen").innerHTML = `
        <h2>💥 BOOM! You failed! 💥</h2>
        
        <p>Don't worry! Every failure is a step toward learning. <p>Join <strong>Cyber Sentinels</strong>, HVPM COET’s official cybersecurity club, and master ethical hacking, OSINT, cryptography, and more! 🔥</p> </p>
    `;
    
    clearInterval(countdown);
    clearInterval(questionCountdown);
    backgroundAudio.pause();
    explosionAudio.play();
}

function triggerSuccess() {
    document.getElementById("quiz-screen").innerHTML = `
        <h2>🎯 Quiz Completed! Well Done! 👏</h2>
        
        <p>You have successfully completed the quiz! Ready to take your cybersecurity skills to the next level? Join <strong>Cyber Sentinels</strong> today and become a cyber warrior! 🚀</p>
    `;
    
    clearInterval(countdown);
    clearInterval(questionCountdown);
    backgroundAudio.pause();
    applauseAudio.play();
}
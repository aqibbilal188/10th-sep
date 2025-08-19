// Zoya's birthday: September 10th
const BIRTHDAY_MONTH = 8; // September (0-indexed)
const BIRTHDAY_DAY = 10;
const COUNTDOWN_START_DAYS = 365; // Always show countdown since it's close to birthday

// DOM elements
const countdownElement = document.getElementById('countdown');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const countdownContainer = document.querySelector('.countdown-container');
const birthdayCard = document.querySelector('.birthday-card');

// Removed IST offset - using local time

// Initialize the countdown
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    // Get current time
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Calculate next birthday (midnight on September 10th)
    let nextBirthday = new Date(currentYear, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    
    // If birthday has passed this year, set it to next year
    if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    }
    
    const timeDifference = nextBirthday - now;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Check if it's her birthday
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        celebrateBirthday();
        return;
    }
    
    // Always show countdown since it's close to birthday
    showCountdown();
    updateCountdownDisplay(days, hours, minutes, seconds);
}

// Update countdown display with animation
function updateCountdownDisplay(days, hours, minutes, seconds) {
    // Add animation class for number changes
    const elements = [daysElement, hoursElement, minutesElement, secondsElement];
    const values = [days, hours, minutes, seconds];
    
    elements.forEach((element, index) => {
        const currentValue = parseInt(element.textContent);
        const newValue = values[index];
        
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.2)';
            element.style.color = '#2E7D32';
            
            setTimeout(() => {
                element.textContent = newValue.toString().padStart(2, '0');
                element.style.transform = 'scale(1)';
                element.style.color = '#4CAF50';
            }, 150);
        }
    });
}

// Show countdown with fade-in effect
function showCountdown() {
    if (countdownContainer.classList.contains('countdown-hidden')) {
        countdownContainer.classList.remove('countdown-hidden');
        countdownContainer.style.opacity = '0';
        countdownContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            countdownContainer.style.transition = 'all 0.8s ease-out';
            countdownContainer.style.opacity = '1';
            countdownContainer.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Hide countdown
function hideCountdown() {
    if (!countdownContainer.classList.contains('countdown-hidden')) {
        countdownContainer.style.transition = 'all 0.5s ease-out';
        countdownContainer.style.opacity = '0';
        countdownContainer.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            countdownContainer.classList.add('countdown-hidden');
        }, 500);
    }
}

// Birthday celebration mode
function celebrateBirthday() {
    // Add birthday mode class
    document.body.classList.add('birthday-mode');
    birthdayCard.classList.add('birthday-mode');
    
    // Hide countdown
    countdownContainer.style.display = 'none';
    
    // Update main title
    const mainTitle = document.querySelector('.main-title');
    mainTitle.textContent = 'Happy Birthday Zoya! 🎂';
    
    // Add celebration effects
    addCelebrationEffects();
    
    // Play birthday music (if available)
    playBirthdayMusic();
}

// Add celebration effects
function addCelebrationEffects() {
    // Create confetti effect
    createConfetti();
    
    // Add more floating hearts
    addMoreHearts();
    
    // Add sparkle effects
    addSparkles();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF9800', '#FF5722'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const animation = confetti.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'ease-in'
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }, i * 100);
    }
}

// Add more floating hearts
function addMoreHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartEmojis = ['❤️', '💕', '💖', '💝', '💗', '💓', '💞', '💟'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 3 + 's';
            heart.style.animationDuration = (3 + Math.random() * 3) + 's';
            
            heartsContainer.appendChild(heart);
        }, i * 200);
    }
}

// Add sparkle effects
function addSparkles() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.zIndex = '999';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.opacity = '0';
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            const animation = sparkle.animate([
                { opacity: 0, transform: 'scale(0) rotate(0deg)' },
                { opacity: 1, transform: 'scale(1) rotate(180deg)' },
                { opacity: 0, transform: 'scale(0) rotate(360deg)' }
            ], {
                duration: 2000,
                easing: 'ease-in-out'
            });
            
            animation.onfinish = () => {
                sparkle.remove();
            };
        }, i * 300);
    }
}

// Play birthday music (placeholder function)
function playBirthdayMusic() {
    // This is a placeholder for birthday music
    // You can add actual audio functionality here
    console.log('🎵 Happy Birthday music would play here! 🎵');
}

// Add interactive effects
function addInteractiveEffects() {
    // Add click effect for hearts
    document.addEventListener('click', (e) => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.fontSize = '2rem';
        heart.style.left = (e.clientX - 10) + 'px';
        heart.style.top = (e.clientY - 10) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.opacity = '1';
        
        document.body.appendChild(heart);
        
        // Animate heart
        const animation = heart.animate([
            { opacity: 1, transform: 'scale(0) translateY(0)' },
            { opacity: 1, transform: 'scale(1) translateY(-20px)' },
            { opacity: 0, transform: 'scale(0.5) translateY(-40px)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            heart.remove();
        };
    });
    
    // Add hover effects for the birthday card
    birthdayCard.addEventListener('mouseenter', () => {
        birthdayCard.style.transform = 'scale(1.02)';
        birthdayCard.style.transition = 'transform 0.3s ease';
    });
    
    birthdayCard.addEventListener('mouseleave', () => {
        birthdayCard.style.transform = 'scale(1)';
    });
    
    // Add theme toggle functionality
    addThemeToggle();
}

// Add theme toggle functionality
function addThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add toggle animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    addInteractiveEffects();
    
    // Add loading animation
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        content.style.transition = 'all 1s ease-out';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 500);
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add some extra romantic touches
function addRomanticTouches() {
    // Add subtle background music suggestion
    const musicNote = document.createElement('div');
    musicNote.innerHTML = '🎵';
    musicNote.style.position = 'fixed';
    musicNote.style.bottom = '20px';
    musicNote.style.right = '20px';
    musicNote.style.fontSize = '2rem';
    musicNote.style.opacity = '0.6';
    musicNote.style.cursor = 'pointer';
    musicNote.style.zIndex = '100';
    musicNote.title = 'Click for romantic background music';
    
    musicNote.addEventListener('click', () => {
        alert('💕 Add your favorite romantic song here! 💕');
    });
    
    document.body.appendChild(musicNote);
}

// Call romantic touches after page loads
setTimeout(addRomanticTouches, 2000);

// Create thousands of I love you messages
function createLoveBackground() {
    const loveBackground = document.getElementById('loveBackground');
    const loveMessages = [
        'I love you Zoya',
        'I love you babe',
        'I love you darling',
        'I love you sweetheart',
        'I love you my love',
        'I love you forever',
        'I love you completely',
        'I love you endlessly',
        'I love you passionately',
        'I love you deeply',
        'I love you truly',
        'I love you madly',
        'I love you unconditionally',
        'I love you wholeheartedly',
        'I love you with all my heart',
        'I love you with all my soul',
        'I love you more than words',
        'I love you beyond measure',
        'I love you every inch',
        'I love you every moment',
        'I love you every breath',
        'I love you every heartbeat',
        'I love you every smile',
        'I love you every laugh',
        'I love you every touch',
        'I love you every kiss',
        'I love you every hug',
        'I love you every day',
        'I love you every night',
        'I love you every morning',
        'I love you every sunset',
        'I love you every sunrise',
        'I love you ❤️',
        'I love you 💕',
        'I love you 💖',
        'I love you 💝',
        'I love you 💗',
        'I love you 💓',
        'I love you 💞',
        'I love you 💟',
        'I love you 🥰',
        'I love you 😍',
        'I love you 💋',
        'I love you 💘',
        'I love you 💌',
        'I love you 💎',
        'I love you 🌹',
        'I love you 🥀',
        'I love you 🌸',
        'I love you 🌺',
        'I love you 🌻',
        'I love you 💕 Zoya',
        'I love you 💖 babe',
        'I love you 💝 darling',
        'I love you 💗 sweetheart',
        'I love you 💓 my love',
        'I love you 💞 forever',
        'I love you 💟 completely',
        'I love you 🥰 endlessly',
        'I love you 😍 passionately',
        'I love you 💋 deeply',
        'I love you 💘 truly',
        'I love you 💌 madly',
        'I love you 💎 unconditionally',
        'I love you 🌹 wholeheartedly',
        'I love you 🥀 with all my heart',
        'I love you 🌸 with all my soul',
        'I love you 🌺 more than words',
        'I love you 🌻 beyond measure',
        'I love you 💕 every inch',
        'I love you 💖 every moment',
        'I love you 💝 every breath',
        'I love you 💗 every heartbeat',
        'I love you 💓 every smile',
        'I love you 💞 every laugh',
        'I love you 💟 every touch',
        'I love you 🥰 every kiss',
        'I love you 😍 every hug',
        'I love you 💋 every day',
        'I love you 💘 every night',
        'I love you 💌 every morning',
        'I love you 💎 every sunset',
        'I love you 🌹 every sunrise'
    ];
    
    // Check if device is mobile for performance optimization
    const isMobile = window.innerWidth <= 768;
    const isSamsungS21 = window.innerWidth <= 480; // Samsung S21 specific optimization
    const initialMessages = isSamsungS21 ? 10 : (isMobile ? 20 : 100); // Much further reduced for mobile
    const continuousMessages = isSamsungS21 ? 0 : (isMobile ? 0 : 5); // No continuous messages on mobile
    const creationInterval = isSamsungS21 ? 15000 : (isMobile ? 10000 : 4000); // Much slower for mobile
    
    // Create initial love messages (reduced count for better performance)
    for (let i = 0; i < initialMessages; i++) {
        setTimeout(() => {
            const loveMessage = document.createElement('div');
            loveMessage.className = 'love-message';
            loveMessage.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            
            // Random positioning - cover entire page including sides
            loveMessage.style.left = Math.random() * 200 + 'vw';
            loveMessage.style.top = Math.random() * 200 + 'vh';
            loveMessage.style.animationDelay = Math.random() * 15 + 's';
            loveMessage.style.animationDuration = (10 + Math.random() * 8) + 's';
            loveMessage.style.setProperty('--rotation', (Math.random() * 30 - 15) + 'deg');
            
            // Random font size - larger range
            const fontSize = 0.6 + Math.random() * 1.8;
            loveMessage.style.fontSize = fontSize + 'rem';
            
            // Random opacity - more visible
            loveMessage.style.opacity = 0.3 + Math.random() * 0.6;
            
            loveBackground.appendChild(loveMessage);
            
            // Remove message after animation
            setTimeout(() => {
                if (loveMessage.parentNode) {
                    loveMessage.remove();
                }
            }, 25000);
        }, i * (isMobile ? 100 : 50)); // Slower creation for mobile
    }
    
    // Continue creating messages (reduced frequency for better performance)
    setInterval(() => {
        for (let i = 0; i < continuousMessages; i++) {
            setTimeout(() => {
                const loveMessage = document.createElement('div');
                loveMessage.className = 'love-message';
                loveMessage.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
                
                loveMessage.style.left = Math.random() * 200 + 'vw';
                loveMessage.style.top = Math.random() * 200 + 'vh';
                loveMessage.style.animationDelay = '0s';
                loveMessage.style.animationDuration = (10 + Math.random() * 8) + 's';
                loveMessage.style.setProperty('--rotation', (Math.random() * 30 - 15) + 'deg');
                
                const fontSize = 0.6 + Math.random() * 1.8;
                loveMessage.style.fontSize = fontSize + 'rem';
                loveMessage.style.opacity = 0.3 + Math.random() * 0.6;
                
                loveBackground.appendChild(loveMessage);
                
                setTimeout(() => {
                    if (loveMessage.parentNode) {
                        loveMessage.remove();
                    }
                }, 25000);
            }, i * (isMobile ? 200 : 100)); // Slower for mobile
        }
    }, creationInterval);
}

// Quiz system variables
let currentQuestion = 1;
let correctAnswers = 0;
const totalQuestions = 4;

// Quiz page functions
function showQuizPage() {
    const quizPage = document.getElementById('quizPage');
    quizPage.style.display = 'flex';
    
    // Add entrance animation
    quizPage.style.opacity = '0';
    quizPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        quizPage.style.transition = 'all 0.5s ease-in-out';
        quizPage.style.opacity = '1';
        quizPage.style.transform = 'scale(1)';
    }, 100);
    
    // Sync theme with main page
    const mainPageTheme = localStorage.getItem('theme') || 'light';
    quizPage.classList.toggle('dark-mode', mainPageTheme === 'dark');
    localStorage.setItem('quizTheme', mainPageTheme);
    
    // Initialize quiz page theme toggle
    initQuizThemeToggle();
    
    // Reset quiz state
    currentQuestion = 1;
    correctAnswers = 0;
    showQuestion(1);
    
    // Create love background for quiz page
    setTimeout(() => createPageLoveBackground('quiz'), 500);
}

function hideQuizPage() {
    const quizPage = document.getElementById('quizPage');
    
    // Add exit animation
    quizPage.style.transition = 'all 0.5s ease-in-out';
    quizPage.style.opacity = '0';
    quizPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        quizPage.style.display = 'none';
    }, 500);
}

// Quiz page theme toggle functionality
function initQuizThemeToggle() {
    const quizThemeToggle = document.getElementById('quizThemeToggle');
    const quizPage = document.getElementById('quizPage');
    
    // Check for saved quiz theme preference or default to light mode
    const savedQuizTheme = localStorage.getItem('quizTheme') || 'light';
    quizPage.classList.toggle('dark-mode', savedQuizTheme === 'dark');
    
    quizThemeToggle.addEventListener('click', () => {
        quizPage.classList.toggle('dark-mode');
        const isDark = quizPage.classList.contains('dark-mode');
        localStorage.setItem('quizTheme', isDark ? 'dark' : 'light');
        
        // Add toggle animation
        quizThemeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            quizThemeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Quiz functions
function showQuestion(questionNumber) {
    // Hide all questions
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question${i}`).style.display = 'none';
    }
    
    // Show current question
    document.getElementById(`question${questionNumber}`).style.display = 'block';
}

function checkAnswer(questionNumber, selectedAnswer) {
    const correctAnswers = {
        1: '23rd oct 2024',
        2: 'metro',
        3: 'Kissing you everywhere'
    };
    
    if (selectedAnswer === correctAnswers[questionNumber]) {
        // Correct answer
        if (questionNumber < totalQuestions) {
            showQuestion(questionNumber + 1);
        } else {
            // All questions answered, show text question
            showQuestion(4);
        }
    } else {
        // Wrong answer - show error and stay on same question
        alert('Wrong answer, my love! Try again 💕');
    }
}

function checkTextAnswer() {
    const answer = document.getElementById('answer4').value.toLowerCase().trim();
    
    // Accept any answer for the text question (romantic!)
    if (answer.length > 0) {
        // All questions completed successfully
        hideQuizPage();
        setTimeout(() => {
            showWelcomePage();
        }, 600);
    } else {
        alert('Please write something, my love! 💕');
    }
}

// Welcome page functions
function showWelcomePage() {
    const welcomePage = document.getElementById('welcomePage');
    welcomePage.style.display = 'flex';
    
    // Add entrance animation
    welcomePage.style.opacity = '0';
    welcomePage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        welcomePage.style.transition = 'all 0.5s ease-in-out';
        welcomePage.style.opacity = '1';
        welcomePage.style.transform = 'scale(1)';
    }, 100);
    
    // Sync theme with main page
    const mainPageTheme = localStorage.getItem('theme') || 'light';
    welcomePage.classList.toggle('dark-mode', mainPageTheme === 'dark');
    localStorage.setItem('welcomeTheme', mainPageTheme);
    
    // Initialize welcome page theme toggle
    initWelcomeThemeToggle();
    
    // Create love background for welcome page
    setTimeout(() => createPageLoveBackground('welcome'), 500);
}

function hideWelcomePage() {
    const welcomePage = document.getElementById('welcomePage');
    
    // Add exit animation
    welcomePage.style.transition = 'all 0.5s ease-in-out';
    welcomePage.style.opacity = '0';
    welcomePage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        welcomePage.style.display = 'none';
    }, 500);
}

// Welcome page theme toggle functionality
function initWelcomeThemeToggle() {
    const welcomeThemeToggle = document.getElementById('welcomeThemeToggle');
    const welcomePage = document.getElementById('welcomePage');
    
    // Check for saved welcome theme preference or default to light mode
    const savedWelcomeTheme = localStorage.getItem('welcomeTheme') || 'light';
    welcomePage.classList.toggle('dark-mode', savedWelcomeTheme === 'dark');
    
    welcomeThemeToggle.addEventListener('click', () => {
        welcomePage.classList.toggle('dark-mode');
        const isDark = welcomePage.classList.contains('dark-mode');
        localStorage.setItem('welcomeTheme', isDark ? 'dark' : 'light');
        
        // Add toggle animation
        welcomeThemeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            welcomeThemeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Period tracker functions
function openPeriodTracker() {
    const trackerPage = document.getElementById('periodTrackerPage');
    trackerPage.style.display = 'flex';
    
    // Add entrance animation
    trackerPage.style.opacity = '0';
    trackerPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        trackerPage.style.transition = 'all 0.5s ease-in-out';
        trackerPage.style.opacity = '1';
        trackerPage.style.transform = 'scale(1)';
    }, 100);
    
    // Sync theme with main page
    const mainPageTheme = localStorage.getItem('theme') || 'light';
    trackerPage.classList.toggle('dark-mode', mainPageTheme === 'dark');
    localStorage.setItem('trackerTheme', mainPageTheme);
    
    // Initialize tracker page theme toggle
    initTrackerThemeToggle();
    
    // Create love background for tracker page
    setTimeout(() => createPageLoveBackground('tracker'), 500);
}

function hidePeriodTracker() {
    const trackerPage = document.getElementById('periodTrackerPage');
    
    // Add exit animation
    trackerPage.style.transition = 'all 0.5s ease-in-out';
    trackerPage.style.opacity = '0';
    trackerPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        trackerPage.style.display = 'none';
    }, 500);
}

// Period tracker theme toggle functionality
function initTrackerThemeToggle() {
    const trackerThemeToggle = document.getElementById('trackerThemeToggle');
    const trackerPage = document.getElementById('periodTrackerPage');
    
    // Check for saved tracker theme preference or default to light mode
    const savedTrackerTheme = localStorage.getItem('trackerTheme') || 'light';
    trackerPage.classList.toggle('dark-mode', savedTrackerTheme === 'dark');
    
    trackerThemeToggle.addEventListener('click', () => {
        trackerPage.classList.toggle('dark-mode');
        const isDark = trackerPage.classList.contains('dark-mode');
        localStorage.setItem('trackerTheme', isDark ? 'dark' : 'light');
        
        // Add toggle animation
        trackerThemeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            trackerThemeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Period calculation function using the correct formula
function calculatePeriod() {
    let lastPeriodStart = new Date(document.getElementById("lastPeriodStartDate").value);
    let lastPeriodEnd = new Date(document.getElementById("lastPeriodEndDate").value);
    let cycleLength = parseInt(document.getElementById("cycleLength").value);

    if (!lastPeriodStart || !lastPeriodEnd || isNaN(cycleLength)) {
        document.getElementById("result").innerHTML = "Please enter all dates and cycle length, my love! 💕";
        return;
    }

    // Calculate period duration
    let periodDuration = Math.ceil((lastPeriodEnd - lastPeriodStart) / (1000 * 60 * 60 * 24)) + 1;

    // Calculate Next Period Start Date
    let nextPeriod = new Date(lastPeriodStart);
    nextPeriod.setDate(lastPeriodStart.getDate() + cycleLength);

    // Calculate Next Period End Date
    let nextPeriodEnd = new Date(nextPeriod);
    nextPeriodEnd.setDate(nextPeriod.getDate() + periodDuration - 1);

    // Ovulation Day (14 days before next period)
    let ovulationDay = new Date(nextPeriod);
    ovulationDay.setDate(nextPeriod.getDate() - 14);

    // Fertile Window (5 days before ovulation to 1 day after ovulation)
    let fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5);

    let fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(ovulationDay.getDate() + 1);

    // Days Until Next Period & Ovulation
    let today = new Date();
    let daysUntilNextPeriod = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));
    let daysUntilOvulation = Math.ceil((ovulationDay - today) / (1000 * 60 * 60 * 24));

    // Format date to dd-mm-yyyy
    const formatDate = (date) => {
        let d = date.getDate().toString().padStart(2, "0");
        let m = (date.getMonth() + 1).toString().padStart(2, "0");
        let y = date.getFullYear();
        return `${d}-${m}-${y}`;
    };

    // Check if she's on her period
    let daysSinceLastPeriod = Math.ceil((today - lastPeriodStart) / (1000 * 60 * 60 * 24));
    let isOnPeriod = daysSinceLastPeriod >= 0 && daysSinceLastPeriod <= periodDuration;
    let currentPeriodDay = isOnPeriod ? daysSinceLastPeriod + 1 : null;

    let periodMessage = "";
    if (isOnPeriod && currentPeriodDay <= 5) {
        const romanticMessages = [
            "1st run to your sweet heart! 💕 I'm here for you, my love!",
            "2nd run to your sweet heart! 💖 Take it easy, I love you!",
            "3rd run to your sweet heart! 💕 You're so strong and beautiful!",
            "4th run to your sweet heart! 💖 You're doing amazing, I'm proud of you!",
            "5th run to your sweet heart! 💕 Almost done, you're incredible!"
        ];
        periodMessage = `<br><br>💕 ${romanticMessages[currentPeriodDay - 1]}`;
    }

    document.getElementById("result").innerHTML = `
        <strong>Your Period Info:</strong><br>
        Period Duration: ${periodDuration} days<br><br>
        <strong>Next Period:</strong><br>
        Start: ${formatDate(nextPeriod)}<br>
        End: ${formatDate(nextPeriodEnd)}<br><br>
        <strong>Fertility Info:</strong><br>
        Fertile Window: ${formatDate(fertileStart)} - ${formatDate(fertileEnd)}<br>
        Ovulation Day: ${formatDate(ovulationDay)} (peak fertility)
        ${periodMessage}
    `;

    document.getElementById('trackerResult').style.display = 'block';
}





// Coming soon function
function comingSoon() {
    alert('Coming soon, my love! 💕 More amazing features are on the way!');
}



// Create love background for different pages
function createPageLoveBackground(pageType) {
    // COMPLETELY DISABLE FOR MOBILE
    const isMobile = window.innerWidth <= 480;
    if (isMobile) return; // No animations on mobile
    
    const backgroundId = `${pageType}LoveBackground`;
    const messageClass = `${pageType}-love-message`;
    const background = document.getElementById(backgroundId);
    
    if (!background) return;
    
    const loveMessages = [
        'I love you',
        'I love you Zoya',
        'I love you babe',
        'I love you darling',
        'I love you sweetheart',
        'I love you my love',
        'I love you forever',
        'I love you completely',
        'I love you endlessly',
        'I love you passionately'
    ];
    
    // Only for desktop
    const initialMessages = 20;
    const continuousMessages = 2;
    const creationInterval = 6000;
    
    // Create initial love messages
    for (let i = 0; i < initialMessages; i++) {
        setTimeout(() => {
            const loveMessage = document.createElement('div');
            loveMessage.className = messageClass;
            loveMessage.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            
            // Random positioning
            loveMessage.style.left = Math.random() * 200 + 'vw';
            loveMessage.style.top = Math.random() * 200 + 'vh';
            loveMessage.style.animationDelay = Math.random() * 10 + 's';
            loveMessage.style.animationDuration = (8 + Math.random() * 6) + 's';
            loveMessage.style.setProperty('--rotation', (Math.random() * 20 - 10) + 'deg');
            
            // Random font size
            const fontSize = isMobile ? (0.6 + Math.random() * 0.8) : (0.8 + Math.random() * 1.2);
            loveMessage.style.fontSize = fontSize + 'rem';
            
            // Random opacity
            loveMessage.style.opacity = 0.3 + Math.random() * 0.4;
            
            background.appendChild(loveMessage);
            
            // Remove message after animation
            setTimeout(() => {
                if (loveMessage.parentNode) {
                    loveMessage.remove();
                }
            }, 20000);
        }, i * (isMobile ? 200 : 100));
    }
    
    // Continue creating messages
    setInterval(() => {
        for (let i = 0; i < continuousMessages; i++) {
            setTimeout(() => {
                const loveMessage = document.createElement('div');
                loveMessage.className = messageClass;
                loveMessage.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
                
                loveMessage.style.left = Math.random() * 200 + 'vw';
                loveMessage.style.top = Math.random() * 200 + 'vh';
                loveMessage.style.animationDelay = '0s';
                loveMessage.style.animationDuration = (8 + Math.random() * 6) + 's';
                loveMessage.style.setProperty('--rotation', (Math.random() * 20 - 10) + 'deg');
                
                const fontSize = isMobile ? (0.6 + Math.random() * 0.8) : (0.8 + Math.random() * 1.2);
                loveMessage.style.fontSize = fontSize + 'rem';
                loveMessage.style.opacity = 0.3 + Math.random() * 0.4;
                
                background.appendChild(loveMessage);
                
                setTimeout(() => {
                    if (loveMessage.parentNode) {
                        loveMessage.remove();
                    }
                }, 20000);
            }, i * (isMobile ? 300 : 200));
        }
    }, creationInterval);
}

// Performance optimization for mobile devices
function isLowPerformanceDevice() {
    const isMobile = window.innerWidth <= 768;
    const isSmallScreen = window.innerWidth <= 480;
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Check for older devices or low-end phones
    const isOldDevice = userAgent.includes('android 4') || 
                       userAgent.includes('android 5') || 
                       userAgent.includes('android 6') ||
                       userAgent.includes('safari/9') ||
                       userAgent.includes('safari/10');
    
    return isMobile && (isSmallScreen || isOldDevice);
}

// Ultra performance mode for mobile
function enableUltraPerformanceMode() {
    const isMobile = window.innerWidth <= 480;
    
    if (isMobile) {
        // Disable all animations and heavy operations
        document.body.style.setProperty('--disable-animations', 'true');
        
        // Remove any existing animated elements
        const animatedElements = document.querySelectorAll('.animated-bg, .petals-container, .floating-hearts, .love-background, .petal, .heart, .love-message');
        animatedElements.forEach(el => el.remove());
        
        // Disable any remaining CSS animations
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation: none !important;
                transition: none !important;
            }
            .animated-bg, .petals-container, .floating-hearts, .love-background, .petal, .heart, .love-message {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('Ultra performance mode enabled for mobile');
    }
}

// Mood Feature Variables
let selectedMood = '';
let currentMoodStep = 'selection'; // 'selection', 'message', 'advice'

// Global function test
window.testMoodFunction = function() {
    alert('Mood function is accessible!');
    console.log('testMoodFunction called');
};

// Test if showMoodFeature is accessible
window.testShowMoodFeature = function() {
    if (typeof window.showMoodFeature === 'function') {
        alert('showMoodFeature is accessible!');
        window.showMoodFeature();
    } else {
        alert('showMoodFeature is NOT accessible!');
    }
};

// Make showMoodFeature globally accessible
window.showMoodFeature = function() {
    console.log('showMoodFeature called');
    
    const moodTrackerPage = document.getElementById('moodTrackerPage');
    
    if (!moodTrackerPage) {
        alert('Error: Mood page not found!');
        return;
    }
    
    console.log('Mood tracker page found:', moodTrackerPage);
    console.log('Mood tracker page innerHTML length:', moodTrackerPage.innerHTML.length);
    console.log('Mood tracker page has mood-content:', moodTrackerPage.querySelector('.mood-content') !== null);
    
    // Reset to initial state
    currentMoodStep = 'selection';
    selectedMood = '';
    document.getElementById('moodMessageSection').style.display = 'none';
    document.getElementById('moodAdviceSection').style.display = 'none';
    const moodSelection = document.querySelector('.mood-selection');
    if (moodSelection) {
        moodSelection.style.display = 'block';
    }
    
    // Hide welcome page first
    const welcomePage = document.getElementById('welcomePage');
    if (welcomePage) {
        welcomePage.style.display = 'none';
    }
    
    // Show the page
    console.log('Setting mood tracker page to display: flex');
    moodTrackerPage.style.setProperty('display', 'flex', 'important');
    moodTrackerPage.style.opacity = '1';
    moodTrackerPage.style.visibility = 'visible';
    moodTrackerPage.style.zIndex = '10000';
    console.log('Mood tracker page display after:', moodTrackerPage.style.display);
    console.log('Mood tracker page z-index:', moodTrackerPage.style.zIndex);
    
    // Add entrance animation
    moodTrackerPage.style.transform = 'scale(0.9)';
    setTimeout(() => {
        moodTrackerPage.style.transition = 'all 0.5s ease-in-out';
        moodTrackerPage.style.transform = 'scale(1)';
    }, 100);
    
    // Sync theme with main page
    const mainPageTheme = localStorage.getItem('theme') || 'light';
    moodTrackerPage.classList.toggle('dark-mode', mainPageTheme === 'dark');
    localStorage.setItem('moodTheme', mainPageTheme);
    
    // Initialize mood page theme toggle
    initMoodThemeToggle();
    
    // Check if page is visible
    setTimeout(() => {
        console.log('Mood tracker page visible check:');
        console.log('- display:', moodTrackerPage.style.display);
        console.log('- opacity:', moodTrackerPage.style.opacity);
        console.log('- visibility:', moodTrackerPage.style.visibility);
        console.log('- z-index:', moodTrackerPage.style.zIndex);
        console.log('- computed display:', window.getComputedStyle(moodTrackerPage).display);
        console.log('- computed visibility:', window.getComputedStyle(moodTrackerPage).visibility);
        
        if (window.getComputedStyle(moodTrackerPage).display === 'flex') {
            console.log('✅ Mood tracker page is visible!');
        } else {
            console.log('❌ Mood tracker page is NOT visible!');
        }
    }, 100);
};

// Mood Feature Functions - REMOVED DUPLICATE

window.hideMoodTracker = function() {
    const moodTrackerPage = document.getElementById('moodTrackerPage');
    
    // Add exit animation
    moodTrackerPage.style.transition = 'all 0.5s ease-in-out';
    moodTrackerPage.style.opacity = '0';
    moodTrackerPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        moodTrackerPage.style.display = 'none';
        // Show welcome page again
        const welcomePage = document.getElementById('welcomePage');
        if (welcomePage) {
            welcomePage.style.display = 'flex';
        }
    }, 500);
}

// Mood page theme toggle functionality
function initMoodThemeToggle() {
    const moodThemeToggle = document.getElementById('moodThemeToggle');
    const moodTrackerPage = document.getElementById('moodTrackerPage');
    
    // Check for saved mood theme preference or default to light mode
    const savedMoodTheme = localStorage.getItem('moodTheme') || 'light';
    moodTrackerPage.classList.toggle('dark-mode', savedMoodTheme === 'dark');
    
    // Remove existing event listener to prevent duplicates
    moodThemeToggle.removeEventListener('click', moodThemeToggleClickHandler);
    
    // Add event listener
    moodThemeToggle.addEventListener('click', moodThemeToggleClickHandler);
}

function moodThemeToggleClickHandler() {
    const moodThemeToggle = document.getElementById('moodThemeToggle');
    const moodTrackerPage = document.getElementById('moodTrackerPage');
    
    moodTrackerPage.classList.toggle('dark-mode');
    const isDark = moodTrackerPage.classList.contains('dark-mode');
    localStorage.setItem('moodTheme', isDark ? 'dark' : 'light');
    
    // Add toggle animation
    moodThemeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        moodThemeToggle.style.transform = 'scale(1)';
    }, 150);
}

window.selectMood = function(mood) {
    console.log('selectMood called with:', mood);
    selectedMood = mood;
    currentMoodStep = 'message';
    
    // Hide mood selection and show message section
    document.querySelector('.mood-selection').style.display = 'none';
    document.getElementById('moodMessageSection').style.display = 'block';
    document.getElementById('selectedMoodText').textContent = mood;
    
    // Add transition animation
    const messageSection = document.getElementById('moodMessageSection');
    messageSection.style.opacity = '0';
    messageSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageSection.style.transition = 'all 0.5s ease';
        messageSection.style.opacity = '1';
        messageSection.style.transform = 'translateY(0)';
    }, 100);
}

window.sendMoodMessage = async function() {
    const message = document.getElementById('moodMessage').value.trim();
    
    if (!message) {
        alert('Please tell me why you\'re feeling this way, my love! 💕');
        return;
    }
    
    // Show loading state
    const sendButton = document.querySelector('.send-mood-btn');
    const originalText = sendButton.textContent;
    sendButton.textContent = 'Sending... 💕';
    sendButton.disabled = true;
    
    try {
        console.log('Sending mood message:', { mood: selectedMood, message: message });
        console.log('API URL:', '/api/send-mood-email');
        
        const response = await fetch('/api/send-mood-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mood: selectedMood,
                message: message
            })
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (response.ok) {
            const result = await response.json();
            console.log('Response result:', result);
            
            if (result.success) {
                // Show success message and move to advice section
                console.log('💕 Message sent successfully! I love you! 💕');
                currentMoodStep = 'advice';
                showMoodAdvice();
            } else {
                console.log('Failed to send message, but showing advice anyway 💕');
                currentMoodStep = 'advice';
                showMoodAdvice();
            }
        } else {
            // If server is not available, still show the advice (offline mode)
            console.log('Server not available, showing advice in offline mode');
            const errorResult = await response.json();
            console.log('Error details:', errorResult);
            currentMoodStep = 'advice';
            showMoodAdvice();
        }
    } catch (error) {
        console.error('Error sending mood message:', error);
        console.error('Error details:', error.message);
        // If there's an error, still show the advice (offline mode)
        console.log('Showing advice in offline mode due to error 💕');
        currentMoodStep = 'advice';
        showMoodAdvice();
    } finally {
        // Reset button state
        sendButton.textContent = originalText;
        sendButton.disabled = false;
    }
}

window.showMoodAdvice = function() {
    // Hide message section and show advice section
    document.getElementById('moodMessageSection').style.display = 'none';
    document.getElementById('moodAdviceSection').style.display = 'block';
    
    // Generate advice based on mood
    const advice = generateMoodAdvice(selectedMood);
    document.getElementById('moodAdvice').innerHTML = advice;
    
    // Add transition animation
    const adviceSection = document.getElementById('moodAdviceSection');
    adviceSection.style.opacity = '0';
    adviceSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        adviceSection.style.transition = 'all 0.5s ease';
        adviceSection.style.opacity = '1';
        adviceSection.style.transform = 'translateY(0)';
    }, 100);
}

function generateMoodAdvice(mood) {
    const adviceMap = {
        'Happy': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> Your happiness makes my heart sing! Let's celebrate together! 🎉</p>
            <p>• Share your joy with me - I want to hear every detail!</p>
            <p>• Let's do something fun together - maybe watch a movie or go for a walk</p>
            <p>• Your smile is the most beautiful thing in the world 💕</p>
        `,
        'Sad': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> I'm here for you, my love. Let me hold you close! 🤗</p>
            <p>• Tell me what's bothering you - I want to help</p>
            <p>• Let's cuddle and watch something comforting together</p>
            <p>• Remember, you're not alone - I love you so much 💕</p>
        `,
        'Excited': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> Your excitement is contagious! Let's channel this energy! ⚡</p>
            <p>• Tell me what you're excited about - I want to share in your joy!</p>
            <p>• Let's plan something amazing together</p>
            <p>• Your enthusiasm makes everything better 💕</p>
        `,
        'Horny': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> Oh my! 😏 Let's make this interesting, shall we? 💋</p>
            <p>• I love when you're in this mood - you're so sexy!</p>
            <p>• Let's have some fun together - I'm all yours</p>
            <p>• You drive me crazy with desire 💕</p>
        `,
        'Angry': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> Let me help you calm down, my love. Take deep breaths! 😤</p>
            <p>• Tell me what happened - I want to understand</p>
            <p>• Let's talk it out together - I'm here to listen</p>
            <p>• Your anger will pass, but my love for you never will 💕</p>
        `,
        'Tired': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> Come rest in my arms, my love. You deserve to relax! 😴</p>
            <p>• Let me take care of you - just rest</p>
            <p>• We can cuddle and watch something relaxing</p>
            <p>• You work so hard - let me pamper you 💕</p>
        `,
        'Romantic': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> My heart beats for you! Let's make this moment magical! 💕</p>
            <p>• I love when you're feeling romantic - you're so beautiful</p>
            <p>• Let's create some beautiful memories together</p>
            <p>• You make every day feel like Valentine's Day 💕</p>
        `,
        'Playful': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> You're so adorable when you're playful! Let's have fun! 😋</p>
            <p>• I love your playful side - you're so cute!</p>
            <p>• Let's play together - I'm ready for anything</p>
            <p>• Your playfulness makes me fall in love with you more 💕</p>
        `,
        'Stressed': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> Let me help you relax, my love. Everything will be okay! 😰</p>
            <p>• Take deep breaths - I'm here with you</p>
            <p>• Let's do something calming together</p>
            <p>• You don't have to handle everything alone - I'm here 💕</p>
        `,
        'Confident': `
            <p><strong>Step 1:</strong> Run to me ❤️</p>
            <p><strong>Step 2:</strong> You're absolutely stunning when you're confident! 😎</p>
            <p>• Your confidence is so attractive - I love it!</p>
            <p>• Let's celebrate your amazing self together</p>
            <p>• You're capable of anything - I believe in you 💕</p>
        `
    };
    
    return adviceMap[mood] || `
        <p><strong>Step 1:</strong> Run to me ❤️</p>
        <p><strong>Step 2:</strong> Whatever you're feeling, I'm here for you! 💕</p>
        <p>• You're perfect just the way you are</p>
        <p>• I love you no matter what mood you're in</p>
        <p>• Let's face everything together 💕</p>
    `;
}

window.showDarlingAdvice = function() {
    // This function can be expanded to show more specific advice or actions
    alert('💕 I love you so much, my darling! You\'re the most beautiful person in the world! 💕');
    
    // Close the page after showing the message
    setTimeout(() => {
        hideMoodTracker();
    }, 2000);
}

// Remove old modal click handler since we're using page-based approach now

// Initialize love background with performance check
document.addEventListener('DOMContentLoaded', () => {
    // Enable ultra performance mode for mobile
    enableUltraPerformanceMode();
    
    // COMPLETELY DISABLE ALL ANIMATIONS FOR MOBILE
    const isMobile = window.innerWidth <= 480;
    
    if (isMobile) {
        // Remove all animated elements from DOM for mobile
        const animatedElements = [
            '.animated-bg',
            '.petals-container',
            '.floating-hearts',
            '.love-background'
        ];
        
        animatedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });
        
        console.log('Mobile detected - removed all animated elements for performance');
    } else {
        // Only create animations for desktop
        setTimeout(createLoveBackground, 1000);
    }
});



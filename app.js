// Main Application Logic

// State management
let currentSection = 'home';
let completedLessons = new Set();
let quizScore = 0;
let currentQuizQuestion = 0;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeVocabulary();
    updateProgress();
    loadProgress();
    
    // Initialize speech rate display
    const speechRateInput = document.getElementById('speechRate');
    if (speechRateInput) {
        speechRateInput.addEventListener('input', function() {
            document.getElementById('rateValue').textContent = this.value + 'x';
        });
    }
});

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
}

function navigateToSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active');
        }
    });
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');
    
    currentSection = sectionName;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Lesson Functions
function openLesson(lessonNumber) {
    const lesson = lessonData[lessonNumber];
    if (!lesson) return;
    
    const modal = document.getElementById('lessonModal');
    const lessonContent = document.getElementById('lessonContent');
    
    let phrasesHTML = lesson.phrases.map(phrase => `
        <div class="phrase-item">
            <div class="phrase-header">
                <span class="phrase-baseldytsch">${phrase.baseldytsch}</span>
                <button class="speak-btn" onclick="speakPhrase('${escapeQuotes(phrase.baseldytsch)}')">
                    🔊 Listen
                </button>
            </div>
            <div class="phrase-german">High German: ${phrase.german}</div>
            <div class="phrase-english">English: ${phrase.english}</div>
            ${phrase.note ? `<div class="phrase-note">💡 ${phrase.note}</div>` : ''}
        </div>
    `).join('');
    
    lessonContent.innerHTML = `
        <h2>${lesson.title}</h2>
        <p class="section-intro">${lesson.description}</p>
        <div style="margin-top: 2rem;">
            ${phrasesHTML}
        </div>
        <button class="btn btn-primary" onclick="markLessonComplete(${lessonNumber})" style="margin-top: 2rem;">
            Mark as Complete
        </button>
    `;
    
    modal.style.display = 'block';
}

function closeLessonModal() {
    document.getElementById('lessonModal').style.display = 'none';
}

function markLessonComplete(lessonNumber) {
    completedLessons.add(lessonNumber);
    saveProgress();
    updateProgress();
    closeLessonModal();
    
    // Update lesson card status
    const lessonCard = document.querySelector(`[data-lesson="${lessonNumber}"] .lesson-status`);
    if (lessonCard) {
        lessonCard.textContent = '✓';
    }
}

// Vocabulary Functions
function initializeVocabulary() {
    const vocabTabs = document.querySelectorAll('.vocab-tab');
    vocabTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showVocabularyCategory(category);
            
            // Update active tab
            vocabTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Show first category by default
    showVocabularyCategory('essentials');
}

function showVocabularyCategory(category) {
    const vocabList = document.getElementById('vocabList');
    const words = vocabularyData[category];
    
    if (!words) return;
    
    let html = words.map(item => `
        <div class="vocab-card">
            <div class="vocab-text">
                <div class="vocab-word">${item.word}</div>
                <div class="vocab-translation">${item.translation}</div>
                ${item.german ? `<div style="font-size: 0.8rem; color: #9CA3AF; margin-top: 0.25rem;">High German: ${item.german}</div>` : ''}
            </div>
            <button class="speak-btn" onclick="speakPhrase('${escapeQuotes(item.word)}')">
                🔊
            </button>
        </div>
    `).join('');
    
    vocabList.innerHTML = html;
}

// Scenario Functions
function openScenario(scenarioName) {
    const scenario = scenariosData[scenarioName];
    if (!scenario) return;
    
    const scenarioDialog = document.getElementById('scenarioDialog');
    
    let conversationHTML = scenario.conversation.map((msg, index) => `
        <div class="dialog-message ${msg.speaker === 'You' ? 'user' : 'other'}">
            <div>
                <div class="speaker">${msg.speaker}:</div>
                <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">${msg.text}</div>
                <div style="color: #6B7280; font-style: italic;">${msg.translation}</div>
            </div>
            <button class="speak-btn" onclick="speakPhrase('${escapeQuotes(msg.text)}')">
                🔊
            </button>
        </div>
    `).join('');
    
    scenarioDialog.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3>${scenario.icon} ${scenario.title}</h3>
            <button class="btn btn-secondary" onclick="closeScenario()">Close</button>
        </div>
        ${conversationHTML}
    `;
    
    scenarioDialog.classList.add('active');
    scenarioDialog.scrollIntoView({ behavior: 'smooth' });
}

function closeScenario() {
    const scenarioDialog = document.getElementById('scenarioDialog');
    scenarioDialog.classList.remove('active');
}

// Text-to-Speech Functions
function speakPhrase(text) {
    stopSpeaking(); // Stop any ongoing speech
    
    if (!speechSynthesis) {
        alert('Text-to-speech is not supported in your browser.');
        return;
    }
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'de-DE'; // German
    currentUtterance.rate = 0.85; // Slightly slower for learning
    currentUtterance.pitch = 1.0;
    
    speechSynthesis.speak(currentUtterance);
}

function speakText() {
    const text = document.getElementById('pronunciationInput').value;
    if (!text.trim()) {
        alert('Please enter some text first.');
        return;
    }
    
    stopSpeaking();
    
    const rate = parseFloat(document.getElementById('speechRate').value);
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'de-DE';
    currentUtterance.rate = rate;
    currentUtterance.pitch = 1.0;
    
    speechSynthesis.speak(currentUtterance);
}

function stopSpeaking() {
    if (speechSynthesis && speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
}

function speakQuickPhrase(button) {
    const phrase = button.textContent;
    speakPhrase(phrase);
    
    // Visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Quiz Functions
function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    const question = quizQuestions[currentQuizQuestion];
    
    if (!question) {
        showQuizResults();
        return;
    }
    
    const optionsHTML = question.options.map((option, index) => `
        <button class="option-btn" onclick="selectAnswer(${index})" data-index="${index}">
            ${option}
        </button>
    `).join('');
    
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <div class="question-number">Question ${currentQuizQuestion + 1} of ${quizQuestions.length}</div>
            <div class="question-text">${question.question}</div>
            <div class="options">
                ${optionsHTML}
            </div>
        </div>
    `;
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuizQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        }
        if (index === selectedIndex && selectedIndex !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    // Check if answer is correct
    if (selectedIndex === question.correct) {
        quizScore++;
    }
    
    // Show explanation
    const quizContainer = document.querySelector('.quiz-question');
    const explanationDiv = document.createElement('div');
    explanationDiv.style.cssText = 'margin-top: 1.5rem; padding: 1rem; background: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B;';
    explanationDiv.innerHTML = `<strong>💡 Explanation:</strong> ${question.explanation}`;
    quizContainer.appendChild(explanationDiv);
    
    // Add next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = currentQuizQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results';
    nextBtn.style.marginTop = '1.5rem';
    nextBtn.onclick = () => {
        currentQuizQuestion++;
        showQuizQuestion();
    };
    quizContainer.appendChild(nextBtn);
}

function showQuizResults() {
    const quizContainer = document.getElementById('quizContainer');
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Excellent! You\'re well on your way to mastering Baseldytsch!';
        emoji = '🎉';
    } else if (percentage >= 70) {
        message = 'Great job! Keep practicing and you\'ll be fluent in no time!';
        emoji = '👏';
    } else if (percentage >= 50) {
        message = 'Good effort! Review the lessons and try again to improve.';
        emoji = '💪';
    } else {
        message = 'Keep learning! Go through the lessons again to strengthen your knowledge.';
        emoji = '📚';
    }
    
    quizContainer.innerHTML = `
        <div class="quiz-result">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
            <h3>Quiz Complete!</h3>
            <div class="quiz-score">${quizScore}/${quizQuestions.length}</div>
            <div style="font-size: 1.25rem; margin: 1rem 0;">${percentage}% Correct</div>
            <p style="color: #6B7280; margin-bottom: 2rem;">${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="startQuiz()">Try Again</button>
                <button class="btn btn-secondary" onclick="navigateToSection('lessons')">Back to Lessons</button>
            </div>
        </div>
    `;
}

// Progress Management
function updateProgress() {
    const totalLessons = Object.keys(lessonData).length;
    const completed = completedLessons.size;
    const percentage = Math.round((completed / totalLessons) * 100);
    
    const progressFill = document.getElementById('overallProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${percentage}% Complete (${completed}/${totalLessons} lessons)`;
    }
}

function saveProgress() {
    localStorage.setItem('baseldytsch_progress', JSON.stringify({
        completedLessons: Array.from(completedLessons)
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('baseldytsch_progress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            completedLessons = new Set(data.completedLessons || []);
            updateProgress();
            
            // Update lesson card statuses
            completedLessons.forEach(lessonNum => {
                const lessonCard = document.querySelector(`[data-lesson="${lessonNum}"] .lesson-status`);
                if (lessonCard) {
                    lessonCard.textContent = '✓';
                }
            });
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
}

// Utility Functions
function escapeQuotes(text) {
    return text.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('lessonModal');
    if (event.target === modal) {
        closeLessonModal();
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC to close modal
    if (event.key === 'Escape') {
        closeLessonModal();
    }
});

// Stop speech when navigating away
window.addEventListener('beforeunload', function() {
    stopSpeaking();
});


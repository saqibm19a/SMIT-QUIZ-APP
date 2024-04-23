const loadData = () => {
    return JSON.parse(localStorage.getItem('quizData')) || {
        student: {},
        answers: [],
        correctAnswers: ['2', 'Paris', 'Mars', 'Whale', 'H2O'],
        score: 0
    };
};

// Save data to local storage
const saveData = (data) => {
    localStorage.setItem('quizData', JSON.stringify(data));
};

window.onload = function() {
    const studentForm = document.getElementById('studentForm');
    const quizForm = document.getElementById('quiz-form');
    const resultsSection = document.getElementById('results');

    if (studentForm) {
        studentForm.onsubmit = function(event) {
            event.preventDefault();
            const quizData = loadData();
            quizData.student.rollNumber = document.getElementById('rollNumber').value;
            quizData.student.name = document.getElementById('name').value;
            quizData.student.batch = document.getElementById('batch').value;
            quizData.student.section = document.getElementById('section').value;
            saveData(quizData);
            window.location.href = "quiz.html";
        };
    }

    if (quizForm) {
        quizForm.onsubmit = function(event) {
            event.preventDefault();
            const quizData = loadData();
            const formData = new FormData(quizForm);
            formData.forEach((value, key) => {
                quizData.answers.push(value);
                if (value === quizData.correctAnswers[quizData.answers.length - 1]) {
                    quizData.score++;
                }
            });
            saveData(quizData);
            window.location.href = "results.html";
        };
    }

    if (resultsSection) {
        const quizData = loadData();
        displayResults(quizData);
    }
};

function displayResults(quizData) {
    document.getElementById('studentDetails').innerText = `Name: ${quizData.student.name}, Roll: ${quizData.student.rollNumber}, Batch: ${quizData.student.batch}, Section: ${quizData.student.section}`;
    document.getElementById('quizTopic').innerText = 'JavaScript Basics';
    document.getElementById('selectedAnswers').innerText = 'Answers Selected: ' + quizData.answers.join(', ');
    document.getElementById('correctAnswers').innerText = 'Correct Answers: ' + quizData.correctAnswers.join(', ');
    document.getElementById('totalMarks').innerText = `Score: ${quizData.score} out of ${quizData.correctAnswers.length}`;
}

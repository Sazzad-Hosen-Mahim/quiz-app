const questionsContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result-container");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Rome", "Berlin"],
    correct: "Paris",
    isMultiple: false,
  },

  {
    question: "Which languages are used for web development?",
    choices: ["Python", "HTML", "Java", "CSS"],
    correct: ["HTML", "CSS"],
    isMultiple: true,
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Jupiter",
    isMultiple: false,
  },
  {
    question: "Which of the following are programming languages?",
    choices: ["HTML", "Python", "C++", "SQL"],
    correct: ["Python", "SQL", "C++"],
    isMultiple: true,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    choices: ["Harper Lee", "Jane Austen", "Mark Twain", "Ernest Hemingway"],
    correct: "Harper Lee",
    isMultiple: false,
  },
  {
    question: "Which elements are noble gases?",
    choices: ["Helium", "Oxygen", "Nitrogen", "Argon"],
    correct: ["Helium", "Argon"],
    isMultiple: true,
  },
  {
    question: "What is the square root of 64?",
    choices: ["6", "7", "8", "9"],
    correct: "8",
    isMultiple: false,
  },
  {
    question: "Which countries are in the United Kingdom?",
    choices: ["Scotland", "Ireland", "Wales", "England"],
    correct: ["Scotland", "Wales", "England"],
    isMultiple: true,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mercury", "Venus", "Earth", "Mars"],
    correct: "Mars",
    isMultiple: false,
  },
  {
    question: "Who is known as the father of computer science?",
    choices: ["Albert Einstein", "Isaac Newton", "Alan Turing", "Nikola Tesla"],
    correct: "Alan Turing",
    isMultiple: false,
  },
];

questions.forEach((ques, index) => {
  const questionElement = document.createElement("div");

  const inputType = ques.isMultiple ? "checkbox" : "radio";
  questionElement.innerHTML = `
        <h2>${index + 1}: ${ques.question}</h2>
        <ol>
            ${ques.choices
              .map(
                (choice, i) => `
                <li>
                    <input type="${inputType}" name="question-${index}" value="${choice}">
                    <label>${choice}</label>
                </li>
            `
              )
              .join("")}
        </ol>
    `;
  questionsContainer.appendChild(questionElement);
});

document.getElementById("quiz-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const userName = document.getElementById("name").value;
  const userId = document.getElementById("id").value;

  const userAnswers = {};
  questions.forEach((question, index) => {
    const selectedElements = document.querySelectorAll(
      `input[name="question-${index}"]:checked`
    );
    const selectedAnswers = Array.from(selectedElements).map((el) => el.value);
    userAnswers[`question-${index}`] = selectedAnswers;
  });

  let score = 0;
  questions.forEach((question, index) => {
    if (question.isMultiple) {
      const correctAnswersSorted = question.correct.sort().join(",");
      const userAnswersSorted = userAnswers[`question-${index}`]
        .sort()
        .join(",");
      if (correctAnswersSorted === userAnswersSorted) {
        score++;
      }
    } else {
      if (userAnswers[`question-${index}`][0] === question.correct) {
        score++;
      }
    }
  });

  resultContainer.innerHTML = `
  <h3>Results: </h3>
        <p>Name: ${userName}</p>
        <p>ID: ${userId}</p>
        <p>Score: ${score} / ${questions.length}</p>
    `;
});

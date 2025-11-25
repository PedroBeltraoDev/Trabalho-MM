// Banco de Perguntas do Quiz (15 perguntas)
const questionBank = [
  {
    id: 1,
    question: "Qual é a taxa de amostragem padrão utilizada em CDs de áudio?",
    options: ["22.050 Hz", "44.100 Hz", "48.000 Hz", "96.000 Hz"],
    correct: 1,
  },
  {
    id: 2,
    question: "O que significa a profundidade de bits (bit depth) no áudio digital?",
    options: [
      "A velocidade de reprodução do áudio",
      "A quantidade de níveis de amplitude possíveis",
      "O tamanho físico do arquivo",
      "A frequência máxima captável",
    ],
    correct: 1,
  },
  {
    id: 3,
    question: "Qual formato de áudio oferece compressão sem perda de qualidade?",
    options: ["MP3", "AAC", "FLAC", "OGG"],
    correct: 2,
  },
  {
    id: 4,
    question:
      "Segundo o Teorema de Nyquist-Shannon, qual deve ser a taxa de amostragem mínima para capturar adequadamente uma frequência?",
    options: [
      "Igual à frequência máxima",
      "Metade da frequência máxima",
      "O dobro da frequência máxima",
      "Quatro vezes a frequência máxima",
    ],
    correct: 2,
  },
  {
    id: 5,
    question: "O que é PCM (Pulse Code Modulation)?",
    options: [
      "Um formato de compressão com perda",
      "Uma técnica de síntese de áudio",
      "Um método de representação digital de sinais analógicos",
      "Um tipo de conexão de áudio",
    ],
    correct: 2,
  },
  {
    id: 6,
    question: "Qual é a faixa de frequências audíveis pelo ouvido humano médio?",
    options: ["10 Hz a 10.000 Hz", "20 Hz a 20.000 Hz", "50 Hz a 15.000 Hz", "100 Hz a 25.000 Hz"],
    correct: 1,
  },
  {
    id: 7,
    question: "O que acontece quando a taxa de amostragem é muito baixa?",
    options: [
      "O arquivo fica muito grande",
      "Ocorre o fenômeno de aliasing",
      "O áudio fica muito alto",
      "A profundidade de bits aumenta",
    ],
    correct: 1,
  },
  {
    id: 8,
    question: "Qual é a vantagem principal do formato MP3?",
    options: [
      "Qualidade superior ao áudio analógico",
      "Compressão eficiente reduzindo tamanho do arquivo",
      "Suporte nativo para multicanal 7.1",
      "Impossibilidade de cópia",
    ],
    correct: 1,
  },
  {
    id: 9,
    question: "O que significa uma profundidade de 16 bits?",
    options: [
      "16 frequências diferentes",
      "16 canais de áudio",
      "65.536 níveis de amplitude possíveis",
      "16 segundos de duração",
    ],
    correct: 2,
  },
  {
    id: 10,
    question: "Qual destes NÃO é um formato de áudio digital?",
    options: ["WAV", "AIFF", "JPEG", "OGG"],
    correct: 2,
  },
  {
    id: 11,
    question: "O que é dithering no contexto de áudio digital?",
    options: [
      "Uma técnica de reverberação",
      "Um processo de adicionar ruído controlado para reduzir distorção de quantização",
      "Um formato de compressão",
      "Um tipo de equalização",
    ],
    correct: 1,
  },
  {
    id: 12,
    question: "Qual taxa de amostragem é comumente usada em vídeo digital profissional?",
    options: ["44.100 Hz", "48.000 Hz", "96.000 Hz", "192.000 Hz"],
    correct: 1,
  },
  {
    id: 13,
    question: "O que é um arquivo MIDI?",
    options: [
      "Um áudio comprimido",
      "Uma sequência de instruções musicais",
      "Um formato de vídeo",
      "Um tipo de imagem sonora",
    ],
    correct: 1,
  },
  {
    id: 14,
    question: "Qual é a desvantagem de aumentar muito a profundidade de bits?",
    options: [
      "Piora a qualidade do áudio",
      "Aumenta significativamente o tamanho do arquivo",
      "Reduz a taxa de amostragem",
      "Causa distorção harmônica",
    ],
    correct: 1,
  },
  {
    id: 15,
    question: "O que é latência no áudio digital?",
    options: [
      "A duração total do arquivo",
      "O atraso entre entrada e saída do sinal",
      "A frequência mais baixa captada",
      "O volume máximo possível",
    ],
    correct: 1,
  },
]

// Estado Global
let currentQuestions = []
let currentQuestionIndex = 0
let correctAnswers = 0
let selectedAnswer = null

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Remove tela de loading após 3 segundos
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none"
  }, 3000)

  // Event listeners do menu
  setupMenuNavigation()
  setupSidebarToggle()
})

// Configuração da navegação do menu
function setupMenuNavigation() {
  const menuItems = document.querySelectorAll(".menu-item")

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const sectionId = this.getAttribute("data-section")
      navigateToSection(sectionId)

      // Atualiza menu ativo
      menuItems.forEach((mi) => mi.classList.remove("active"))
      this.classList.add("active")

      // Fecha sidebar em mobile
      if (window.innerWidth <= 1024) {
        document.getElementById("sidebar").classList.remove("active")
      }
    })
  })
}

// Configuração do toggle da sidebar
function setupSidebarToggle() {
  const menuToggle = document.getElementById("menu-toggle")
  const closeSidebar = document.getElementById("close-sidebar")
  const sidebar = document.getElementById("sidebar")

  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("active")
  })

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active")
  })
}

// Navegação entre seções
function navigateToSection(sectionId) {
  // Esconde todas as seções
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => section.classList.remove("active"))

  // Mostra a seção desejada
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")

    // Atualiza título e progresso
    updateHeaderInfo(sectionId)

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

// Atualiza informações do header
function updateHeaderInfo(sectionId) {
  const titles = {
    intro: "Introdução ao Áudio Digital",
    sampling: "Amostragem e Digitalização",
    formats: "Formatos de Áudio",
    quality: "Qualidade do Áudio",
    applications: "Aplicações Práticas",
    quiz: "Quiz Final",
  }

  const progress = {
    intro: "1/6",
    sampling: "2/6",
    formats: "3/6",
    quality: "4/6",
    applications: "5/6",
    quiz: "6/6",
  }

  document.getElementById("page-title").textContent = titles[sectionId] || "AudioLearn"
  document.getElementById("progress-text").textContent = `Módulo ${progress[sectionId]}`
}

// Demo de qualidade de áudio
function playQualityDemo(quality) {
  console.log("[v0] Playing quality demo:", quality)
  const player = document.getElementById("quality-demo-player")
  const source = document.getElementById("quality-demo-source")

  // URLs de exemplo para diferentes qualidades
  const urls = {
    low: "/placeholder.mp3?query=low+quality+8bit+11khz",
    medium: "/placeholder.mp3?query=medium+quality+16bit+22khz",
    high: "/placeholder.mp3?query=high+quality+16bit+44khz",
    ultra: "/placeholder.mp3?query=ultra+quality+24bit+96khz",
  }

  source.src = urls[quality]
  player.load()
  player.play()
}

// ===== FUNÇÕES DO QUIZ =====

// Iniciar Quiz
function startQuiz() {
  console.log("[v0] Starting quiz")

  // Seleciona 5 perguntas aleatórias
  currentQuestions = selectRandomQuestions(5)
  currentQuestionIndex = 0
  correctAnswers = 0

  // Esconde intro e mostra container do quiz
  document.getElementById("quiz-intro").style.display = "none"
  document.getElementById("quiz-container").style.display = "block"

  // Mostra primeira pergunta
  displayQuestion()
}

// Seleciona perguntas aleatórias
function selectRandomQuestions(count) {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Exibe a pergunta atual
function displayQuestion() {
  const question = currentQuestions[currentQuestionIndex]
  selectedAnswer = null

  // Atualiza barra de progresso
  const progressPercent = ((currentQuestionIndex + 1) / 5) * 100
  document.getElementById("progress-fill").style.width = `${progressPercent}%`
  document.getElementById("current-question").textContent = currentQuestionIndex + 1

  // Cria HTML da pergunta
  const questionHTML = `
        <div class="question-card">
            <p class="question-text">${question.question}</p>
            <ul class="options-list">
                ${question.options
                  .map(
                    (option, index) => `
                    <li class="option-item">
                        <button class="option-btn" onclick="selectAnswer(${index})">
                            ${String.fromCharCode(97 + index)}) ${option}
                        </button>
                    </li>
                `,
                  )
                  .join("")}
            </ul>
            <div id="feedback-area"></div>
        </div>
    `

  document.getElementById("question-container").innerHTML = questionHTML
}

// Seleciona uma resposta
function selectAnswer(answerIndex) {
  if (selectedAnswer !== null) return // Já respondeu

  selectedAnswer = answerIndex
  const question = currentQuestions[currentQuestionIndex]
  const isCorrect = answerIndex === question.correct

  if (isCorrect) {
    correctAnswers++
  }

  console.log("[v0] Answer selected:", answerIndex, "Correct:", isCorrect)

  // Atualiza visual das opções
  const buttons = document.querySelectorAll(".option-btn")
  buttons.forEach((btn, index) => {
    btn.disabled = true
    if (index === question.correct) {
      btn.classList.add("correct")
    } else if (index === answerIndex && !isCorrect) {
      btn.classList.add("incorrect")
    }
  })

  // Mostra feedback
  const feedbackArea = document.getElementById("feedback-area")
  feedbackArea.innerHTML = `
        <div class="feedback-message ${isCorrect ? "correct" : "incorrect"}">
            ${isCorrect ? "✓ Correto! Excelente!" : "✗ Incorreto. A resposta correta é: " + question.options[question.correct]}
        </div>
        <button class="btn-next-question" onclick="nextQuestion()">
            ${currentQuestionIndex < 4 ? "Próxima Pergunta →" : "Ver Resultado"}
        </button>
    `
}

// Próxima pergunta
function nextQuestion() {
  currentQuestionIndex++

  if (currentQuestionIndex < 5) {
    displayQuestion()
  } else {
    showResult()
  }
}

// Mostra resultado final
function showResult() {
  const percentage = (correctAnswers / 5) * 100

  console.log("[v0] Quiz completed. Score:", correctAnswers, "/", 5, "=", percentage + "%")

  // Esconde perguntas e mostra resultado
  document.getElementById("question-container").style.display = "none"
  document.getElementById("quiz-result").style.display = "block"

  // Define mensagem baseada na performance
  let title, message
  if (percentage === 100) {
    title = "🏆 Perfeito!"
    message = "Você dominou completamente os fundamentos do áudio digital!"
  } else if (percentage >= 80) {
    title = "🌟 Excelente!"
    message = "Você tem um ótimo conhecimento sobre áudio digital!"
  } else if (percentage >= 60) {
    title = "👍 Muito Bom!"
    message = "Você está no caminho certo. Continue estudando!"
  } else {
    title = "📚 Continue Praticando"
    message = "Revise o conteúdo e tente novamente!"
  }

  // Atualiza elementos do resultado
  document.getElementById("result-percentage").textContent = Math.round(percentage) + "%"
  document.getElementById("result-title").textContent = title
  document.getElementById("result-message").textContent = message
  document.getElementById("correct-answers").textContent = correctAnswers
  document.getElementById("final-percentage").textContent = Math.round(percentage) + "%"
}

// Reinicia o quiz
function restartQuiz() {
  console.log("[v0] Restarting quiz")

  // Reset do estado
  document.getElementById("quiz-result").style.display = "none"
  document.getElementById("question-container").style.display = "block"
  document.getElementById("progress-fill").style.width = "0%"

  // Inicia novo quiz
  startQuiz()
}

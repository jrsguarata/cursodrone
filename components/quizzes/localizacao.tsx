"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Navigation, RotateCcw, ArrowLeft } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface AnsweredQuestion {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}

const questions: Question[] = [

  {
    id: 1,
      question: "Qual instrumento foi historicamente usado para medir o tempo antes dos relógios mecânicos??",
      options: [
        "Telescópio",
        "Barômetro",
        "Ampulheta",
        "Bússola",
      ],
      correctAnswer: 2,
      explanation: "A ampulheta foi usada para medir intervalos de tempo antes dos relógios mecânicos. "
  },
  {
    id: 2,
    question: "Qual é a linha de referência horizontal no sistema de coordenadas geográficas?",
    options: ["Meridiano de Greenwich", "Equador", "Trópico de Câncer", "Círculo Polar Ártico"],
    correctAnswer: 1,
    explanation:
      "O Equador é a linha de referência horizontal (latitude 0°) que divide a Terra em hemisférios Norte e Sul.",
  },
  {
    id: 3,
    question: "O que significa GNSS?",
    options: [
      "Global Network Satellite System",
      "General Navigation Support System",
      "Global Navigation Satellite System",
      "Geographic National Security System",
    ],
    correctAnswer: 2,
    explanation:
      "GNSS significa Global Navigation Satellite System (Sistema Global de Navegação por Satélite), um termo genérico que engloba todos os sistemas de posicionamento por satélite.",
  },
  {
    id: 4,
    question: "Quantos satélites GNSS são necessários para determinar uma posição tridimensional?",
    options: ["2 satélites", "3 satélites", "4 satélites", "5 satélites"],
    correctAnswer: 2,
    explanation:
      "São necessários no mínimo 4 satélites: 3 para determinar latitude, longitude e altitude, e 1 adicional para sincronização do relógio do receptor.",
  },
  {
    id: 5,
    question: "Qual é o sistema de posicionamento por satélite desenvolvido pela Rússia?",
    options: ["GPS", "Galileo", "GLONASS", "BeiDou"],
    correctAnswer: 2,
    explanation:
      "GLONASS (Global Navigation Satellite System) é o sistema de navegação por satélite desenvolvido pela Rússia, equivalente ao GPS americano.",
  },
  {
    id: 6,
    question: "O que é latitude?",
    options: [
      "Distância angular leste-oeste do Meridiano de Greenwich",
      "Distância angular norte-sul do Equador",
      "Altitude em relação ao nível do mar",
      "Ângulo em relação ao polo magnético",],
    correctAnswer: 1,
    explanation:
      "Latitude é a distância angular medida em graus ao norte ou sul do Equador, variando de 0° (no Equador) até 90° (nos polos).",
  },
  {
    id: 7,
   question: "Por que foi mais difícil descobrir como medir a longitude do que a latitude?",
      options: [
        "Porque a longitude depende do tempo preciso e não havia relógios adequados",
        "Porque não existiam mapas",
        "Porque a Terra é redonda",
        "Porque não havia matemáticos competentes"
      ],
      correctAnswer: 0,
      explanation: "Para calcular longitude, era necessário comparar o horário local com um horário de referência. Sem relógios precisos no mar, isso era impossível até o século XVIII."
  },
  {
    id: 8,
    question: "O que é longitude?",
    options: [
      "Distância angular norte-sul do Equador",
      "Distância angular leste-oeste do Meridiano de Greenwich",
      "Comprimento de um meridiano",
      "Distância entre dois paralelos",
    ],
    correctAnswer: 1,
    explanation:
      "Longitude é a distância angular medida em graus a leste ou oeste do Meridiano de Greenwich (0°), variando de 0° a 180° para leste e oeste.",
  },
  {
    id: 9,
    question: "Qual instrumento mede a altura em relação ao nível do mar ?",
    options: ["Teodolito", "Cronômetro", "Barômetro", "Altímetro"],
    correctAnswer: 3,
    explanation:
      "GO Altímetro mede altitude em relação ao nível do mar.",
  },
  {
    id: 10,
    question: "Qual invenção do século XVIII revolucionou a navegação ao permitir calcular a longitude?",
      options: [
        "O telescópio",
        "O cronômetro marítimo preciso",
        "O sextante",
        "O barômetro"
      ],
      correctAnswer: 1,
      explanation: "John Harrison inventou o cronômetro marítimo (relógio de precisão) que mantinha a hora exata mesmo no mar, permitindo calcular a longitude com precisão."
  },
  {
    id: 11,
    question: "Quantos graus tem um círculo completo de longitude?",
    options: ["90 graus", "180 graus", "270 graus", "360 graus"],
    correctAnswer: 3,
    explanation:
      "Um círculo completo de longitude tem 360 graus: 180° para leste e 180° para oeste do Meridiano de Greenwich.",
  },
  {
    id: 12,
    question: "O que é o Meridiano de Greenwich?",
    options: [
      "Linha que divide os hemisférios Norte e Sul",
      "Linha de referência para a longitude (0°)",
      "Linha que passa pelos polos magnéticos",
      "Linha do Equador",
    ],
    correctAnswer: 1,
    explanation:
      "O Meridiano de Greenwich é a linha de referência (longitude 0°) que passa pelo Observatório Real de Greenwich, Londres, dividindo a Terra em hemisférios Oriental e Ocidental.",
  },
  {
    id: 13,
    question: "Qual é o sistema GNSS chinês?",
    options: ["GPS", "BeiDou", "IRNSS", "QZSS"],
    correctAnswer: 1,
    explanation:
      "BeiDou (ou BDS - BeiDou Navigation Satellite System) é o sistema de navegação por satélite desenvolvido pela China, oferecendo cobertura global.",
  },
  {
    id: 14,
    question: "O que é um marco geodésico?",
      options: [
        "Um tipo de pedra preciosa",
        "Um ponto físico fixo na superfície terrestre com coordenadas conhecidas com precisão",
        "Uma estrela usada para navegação",
        "Um aplicativo de celular"
      ],
      correctAnswer: 1,
      explanation: "Marcos geodésicos são pontos materializados no terreno (geralmente com uma placa ou estrutura) cujas coordenadas foram medidas com alta precisão, servindo de referência para levantamentos."
  },
  {
    id: 15,
    question: "Qual é a diferença entre GPS e GNSS?",
      options: [
        "Não há diferença, são sinônimos",
        "GPS é o sistema americano, GNSS é o termo geral para todos os sistemas de satélite",
        "GPS é mais antigo que GNSS",
        "GNSS só funciona na Europa"
      ],
      correctAnswer: 1,
      explanation: "GPS (Global Positioning System) é o sistema americano específico. GNSS é o termo abrangente que inclui GPS, GLONASS, Galileo, BeiDou e outros sistemas."
  },
  {
    id: 16,
    question: "O que é WGS84?",
    options: [
      "Um tipo de satélite GPS",
      "Um sistema de datum geodésico global",
      "Uma frequência de rádio",
      "Um protocolo de comunicação",
    ],
    correctAnswer: 1,
    explanation:
      "WGS84 (World Geodetic System 1984) é o sistema de referência geodésico global usado pelo GPS, definindo o formato e dimensões da Terra.",
  },
  {
    id: 17,
    question: "Quantos satélites GPS estão normalmente em operação?",
    options: ["Aproximadamente 12", "Aproximadamente 18", "Aproximadamente 24", "Aproximadamente 30"],
    correctAnswer: 3,
    explanation:
      "A constelação GPS mantém tipicamente 30 ou mais satélites operacionais, embora o sistema tenha sido projetado para funcionar com um mínimo de 24.",
  },
  {
    id: 18,
    question: "Qual a principal função de um cronômetro marítimo?",
    options: [
      "Medir latitude",
      "Medir velocidade do navio",
      "Medir profundidade",
      "Calcular longitude",],
    correctAnswer: 3,
    explanation:
      "O cronômetro marítimo permite calclar a longitude com precisão.",
  },
  {
    id: 19,
    question: "Qual é a velocidade de propagação dos sinais GPS no vácuo?",
    options: [
      "Velocidade do som",
      "Velocidade da luz",
      "Metade da velocidade da luz",
      "Duas vezes a velocidade da luz",
    ],
    correctAnswer: 1,
    explanation:
      "Os sinais GPS propagam-se à velocidade da luz (aproximadamente 300.000 km/s no vácuo), permitindo calcular distâncias com base no tempo de viagem do sinal.",
  },
  {
    id: 20,
    question: 'Qual linha imaginária divide a terra em leste e oeste?',
    options: [
      "Linha do Ártico",
      "Meridiano de Greenwich",
      "Trópico de Capricórnio",
      "Equador",
    ],
    correctAnswer: 1,
    explanation:
      "O Meridiano de Greenwich divide a Terra nos hemisférios Leste e Oeste..",
  },
]
/* const questions: Question[] = [
  {
    id: 1,
      question: "Como os primeiros navegadores se localizavam antes da invenção de instrumentos modernos?",
      options: [
        "Usando GPS",
        "Observando estrelas, sol e pontos de referência naturais",
        "Usando mapas digitais",
        "Com bússolas eletrônicas"
      ],
      correctAnswer: 1,
      explanation: "Antigos navegadores usavam a posição do sol durante o dia, as estrelas à noite e pontos de referência como montanhas e ilhas para se orientar."
  },
  {
    id: 2,
    question: "Qual é a linha de referência horizontal no sistema de coordenadas geográficas?",
    options: ["Meridiano de Greenwich", "Equador", "Trópico de Câncer", "Círculo Polar Ártico"],
    correctAnswer: 1,
    explanation:
      "O Equador é a linha de referência horizontal (latitude 0°) que divide a Terra em hemisférios Norte e Sul.",
  },
  {
    id: 3,
    question: "O que significa GNSS?",
    options: [
      "Global Network Satellite System",
      "General Navigation Support System",
      "Global Navigation Satellite System",
      "Geographic National Security System",
    ],
    correctAnswer: 2,
    explanation:
      "GNSS significa Global Navigation Satellite System (Sistema Global de Navegação por Satélite), um termo genérico que engloba todos os sistemas de posicionamento por satélite.",
  },
  {
    id: 4,
    question: "Quantos satélites GPS são necessários para determinar uma posição tridimensional?",
    options: ["2 satélites", "3 satélites", "4 satélites", "5 satélites"],
    correctAnswer: 2,
    explanation:
      "São necessários no mínimo 4 satélites: 3 para determinar latitude, longitude e altitude, e 1 adicional para sincronização do relógio do receptor.",
  },
  {
    id: 5,
    question: "Qual é o sistema de posicionamento por satélite desenvolvido pela Rússia?",
    options: ["GPS", "Galileo", "GLONASS", "BeiDou"],
    correctAnswer: 2,
    explanation:
      "GLONASS (Global Navigation Satellite System) é o sistema de navegação por satélite desenvolvido pela Rússia, equivalente ao GPS americano.",
  },
  {
    id: 6,
    question: "O que é latitude?",
    options: [
      "Distância angular leste-oeste do Meridiano de Greenwich",
      "Distância angular norte-sul do Equador",
      "Altitude em relação ao nível do mar",
      "Ângulo em relação ao polo magnético",
    ],
    correctAnswer: 1,
    explanation:
      "Latitude é a distância angular medida em graus ao norte ou sul do Equador, variando de 0° (no Equador) até 90° (nos polos).",
  },
  {
    id: 7,
   question: "Por que foi mais difícil descobrir como medir a longitude do que a latitude?",
      options: [
        "Porque a longitude depende do tempo preciso e não havia relógios adequados",
        "Porque não existiam mapas",
        "Porque a Terra é redonda",
        "Porque não havia matemáticos competentes"
      ],
      correctAnswer: 0,
      explanation: "Para calcular longitude, era necessário comparar o horário local com um horário de referência. Sem relógios precisos no mar, isso era impossível até o século XVIII."
  },
  {
    id: 8,
    question: "O que é longitude?",
    options: [
      "Distância angular norte-sul do Equador",
      "Distância angular leste-oeste do Meridiano de Greenwich",
      "Comprimento de um meridiano",
      "Distância entre dois paralelos",
    ],
    correctAnswer: 1,
    explanation:
      "Longitude é a distância angular medida em graus a leste ou oeste do Meridiano de Greenwich (0°), variando de 0° a 180° para leste e oeste.",
  },
  {
    id: 9,
    question: "Qual sistema GNSS é desenvolvido pela União Europeia?",
    options: ["GPS", "GLONASS", "Galileo", "QZSS"],
    correctAnswer: 2,
    explanation:
      "Galileo é o sistema de navegação por satélite desenvolvido pela União Europeia, projetado para ser independente e interoperável com outros sistemas GNSS.",
  },
  {
    id: 10,
    question: "Qual invenção do século XVIII revolucionou a navegação ao permitir calcular a longitude?",
      options: [
        "O telescópio",
        "O cronômetro marítimo preciso",
        "O GPS",
        "A câmera fotográfica"
      ],
      correctAnswer: 1,
      explanation: "John Harrison inventou o cronômetro marítimo (relógio de precisão) que mantinha a hora exata mesmo no mar, permitindo calcular a longitude com precisão."
  },
  {
    id: 11,
    question: "Quantos graus tem um círculo completo de longitude?",
    options: ["90 graus", "180 graus", "270 graus", "360 graus"],
    correctAnswer: 3,
    explanation:
      "Um círculo completo de longitude tem 360 graus: 180° para leste e 180° para oeste do Meridiano de Greenwich.",
  },
  {
    id: 12,
    question: "O que é o Meridiano de Greenwich?",
    options: [
      "Linha que divide os hemisférios Norte e Sul",
      "Linha de referência para a longitude (0°)",
      "Linha que passa pelos polos magnéticos",
      "Linha do Equador",
    ],
    correctAnswer: 1,
    explanation:
      "O Meridiano de Greenwich é a linha de referência (longitude 0°) que passa pelo Observatório Real de Greenwich, Londres, dividindo a Terra em hemisférios Oriental e Ocidental.",
  },
  {
    id: 13,
    question: "Qual é o sistema GNSS chinês?",
    options: ["GPS", "BeiDou", "IRNSS", "QZSS"],
    correctAnswer: 1,
    explanation:
      "BeiDou (ou BDS - BeiDou Navigation Satellite System) é o sistema de navegação por satélite desenvolvido pela China, oferecendo cobertura global.",
  },
  {
    id: 14,
    question: "O que é um marco geodésico?",
      options: [
        "Um tipo de pedra preciosa",
        "Um ponto físico fixo na superfície terrestre com coordenadas conhecidas com precisão",
        "Uma estrela usada para navegação",
        "Um aplicativo de celular"
      ],
      correctAnswer: 1,
      explanation: "Marcos geodésicos são pontos materializados no terreno (geralmente com uma placa ou estrutura) cujas coordenadas foram medidas com alta precisão, servindo de referência para levantamentos."
  },
  {
    id: 15,
    question: "Qual é a diferença entre GPS e GNSS?",
      options: [
        "Não há diferença, são sinônimos",
        "GPS é o sistema americano, GNSS é o termo geral para todos os sistemas de satélite",
        "GPS é mais antigo que GNSS",
        "GNSS só funciona na Europa"
      ],
      correctAnswer: 1,
      explanation: "GPS (Global Positioning System) é o sistema americano específico. GNSS é o termo abrangente que inclui GPS, GLONASS, Galileo, BeiDou e outros sistemas."
  },
  {
    id: 16,
    question: "O que é WGS84?",
    options: [
      "Um tipo de satélite GPS",
      "Um sistema de datum geodésico global",
      "Uma frequência de rádio",
      "Um protocolo de comunicação",
    ],
    correctAnswer: 1,
    explanation:
      "WGS84 (World Geodetic System 1984) é o sistema de referência geodésico global usado pelo GPS, definindo o formato e dimensões da Terra.",
  },
  {
    id: 17,
    question: "Quantos satélites GPS estão normalmente em operação?",
    options: ["Aproximadamente 12", "Aproximadamente 18", "Aproximadamente 24", "Aproximadamente 30"],
    correctAnswer: 3,
    explanation:
      "A constelação GPS mantém tipicamente 30 ou mais satélites operacionais, embora o sistema tenha sido projetado para funcionar com um mínimo de 24.",
  },
  {
    id: 18,
    question: "O que é WAAS?",
    options: [
      "Wide Area Augmentation System",
      "World Aviation Accuracy System",
      "Wireless Aerial Access System",
      "Western Atlantic Aviation Service",
    ],
    correctAnswer: 0,
    explanation:
      "WAAS (Wide Area Augmentation System) é um sistema de correção diferencial do GPS desenvolvido pela FAA para melhorar a precisão na América do Norte.",
  },
  {
    id: 19,
    question: "Qual é a velocidade de propagação dos sinais GPS no vácuo?",
    options: [
      "Velocidade do som",
      "Velocidade da luz",
      "Metade da velocidade da luz",
      "Duas vezes a velocidade da luz",
    ],
    correctAnswer: 1,
    explanation:
      "Os sinais GPS propagam-se à velocidade da luz (aproximadamente 300.000 km/s no vácuo), permitindo calcular distâncias com base no tempo de viagem do sinal.",
  },
  {
    id: 20,
    question: 'O que significa "dilution of precision" (DOP)?',
    options: [
      "Perda de sinal do satélite",
      "Métrica da geometria dos satélites que afeta a precisão",
      "Interferência atmosférica",
      "Erro de calibração do receptor",
    ],
    correctAnswer: 1,
    explanation:
      "DOP (Dilution of Precision) é uma métrica que indica como a geometria dos satélites visíveis afeta a precisão do posicionamento. Quanto menor o DOP, melhor a precisão.",
  },
] */

interface QuizProps {
  onBack: () => void
}

export default function Localizacao({ onBack }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isQuizComplete, setIsQuizComplete] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const score = answeredQuestions.filter((q) => q.isCorrect).length
  const progress = (answeredQuestions.length / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    setAnsweredQuestions([
      ...answeredQuestions,
      {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect,
      },
    ])
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsQuizComplete(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnsweredQuestions([])
    setSelectedAnswer(null)
    setShowExplanation(false)
    setIsQuizComplete(false)
  }

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "Perfeito! Você domina o assunto!"
    if (percentage >= 80) return "Excelente! Ótimo conhecimento!"
    if (percentage >= 60) return "Bom trabalho! Continue estudando!"
    if (percentage >= 40) return "Razoável. Revise os conceitos!"
    return "Continue praticando e estudando!"
  }

  if (isQuizComplete) {
    const percentage = (score / questions.length) * 100

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-2 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Avaliação Concluída!</h1>

              <div className="space-y-4">
                <div className="text-6xl md:text-7xl font-bold text-primary">{percentage.toFixed(0)}%</div>

                <p className="text-xl md:text-2xl font-medium text-foreground">
                  {score} de {questions.length} questões corretas
                </p>

                <p className="text-lg text-muted-foreground">{getResultMessage()}</p>
              </div>

              <div className="pt-6">
                <Progress value={percentage} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">Aproveitamento geral</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Button
                  onClick={handleRestartQuiz}
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base bg-transparent"
                >
                  <RotateCcw className="w-5 h-5" />
                  Refazer Avaliação
                </Button>
                <Button onClick={onBack} size="lg" className="gap-2 text-base">
                  <ArrowLeft className="w-5 h-5" />
                  Voltar ao Índice de Avaliação
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Índice de Avaliação
          </Button>
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Navigation className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Módulo 1: Localização na Superfície Terrestre</h1>
          <p className="text-muted-foreground text-lg">
            Distâncias, Direções e Tempo - Sistemas de Coordenadas - GNSS
          </p>
        </div>

        {/* Question Card */}
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Pergunta {currentQuestion.id}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed text-pretty">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === currentQuestion.correctAnswer
                const showCorrect = showExplanation && isCorrect
                const showIncorrect = showExplanation && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                      ${!showExplanation && !isSelected && "hover:border-primary hover:bg-primary/5"}
                      ${!showExplanation && isSelected && "border-primary bg-primary/10"}
                      ${showCorrect && "border-success bg-success/10"}
                      ${showIncorrect && "border-destructive bg-destructive/10"}
                      ${showExplanation && !isSelected && !isCorrect && "opacity-50"}
                      ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        flex items-center justify-center w-8 h-8 rounded-full border-2 flex-shrink-0
                        ${!showExplanation && !isSelected && "border-border bg-background"}
                        ${!showExplanation && isSelected && "border-primary bg-primary text-primary-foreground"}
                        ${showCorrect && "border-success bg-success text-success-foreground"}
                        ${showIncorrect && "border-destructive bg-destructive text-destructive-foreground"}
                      `}
                      >
                        {showCorrect && <CheckCircle2 className="w-5 h-5" />}
                        {showIncorrect && <XCircle className="w-5 h-5" />}
                        {!showExplanation && (
                          <span className="text-sm font-semibold">{String.fromCharCode(65 + index)}</span>
                        )}
                      </div>
                      <span className="text-base leading-relaxed flex-1">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="p-4 rounded-lg bg-muted border-2 border-border animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm font-semibold text-foreground mb-2">Explicação:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4">
              {!showExplanation ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  size="lg"
                  className="w-full text-base"
                >
                  Confirmar Resposta
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} size="lg" className="w-full text-base">
                  {currentQuestionIndex < questions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-muted-foreground">Progresso</span>
                <span className="text-foreground">
                  Questão {currentQuestionIndex + 1} de {questions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{answeredQuestions.length} respondidas</span>
                <span className="font-semibold text-foreground">
                  Pontuação: {score}/{answeredQuestions.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

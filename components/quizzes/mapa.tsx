"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Layers, RotateCcw, ArrowLeft } from "lucide-react"

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
    question: "O que caracteriza um mapa temático?",
    options: [
      "Representa fenômenos qualitativos ou quantitativos sobre um tema específico",
      "Mostra apenas relevo e hidrografia",
      "É usado exclusivamente para navegação",
      "Apresenta somente divisões políticas"
    ],
    correctAnswer: 0,
    explanation: "Mapas temáticos representam a distribuição espacial de fenômenos específicos (população, clima, vegetação, etc.) sobre uma base geográfica, podendo ser qualitativos ou quantitativos."
  },
  {
    id: 2,
    question: "Qual é a principal característica de um mapa topográfico?",
    options: [
      "Representa temas socioeconômicos",
      "Mostra o relevo através de curvas de nível e elementos naturais/artificiais da superfície",
      "É usado apenas para navegação marítima",
      "Apresenta somente dados climáticos"
    ],
    correctAnswer: 1,
    explanation: "Mapas topográficos representam o relevo através de curvas de nível, além de mostrar hidrografia, vegetação, construções e outros elementos da superfície terrestre em grande escala."
  },
  {
    id: 3,
    question: "O que são mapas sistemáticos ou de referência?",
    options: [
      "Mapas que mostram apenas um tema específico",
      "Mapas de base que representam elementos gerais da superfície (relevo, hidrografia, limites)",
      "Mapas usados exclusivamente em navegação aérea",
      "Mapas que mostram apenas dados estatísticos"
    ],
    correctAnswer: 1,
    explanation: "Mapas sistemáticos (ou de referência) são mapas de base que representam elementos gerais como relevo, hidrografia, divisões político-administrativas, servindo de base para mapas temáticos."
  },
  {
    id: 4,
    question: "O que é uma projeção cartográfica?",
    options: [
      "O processo de ampliar um mapa",
      "Um sistema de transformação da superfície esférica da Terra em uma superfície plana",
      "Uma técnica de colorir mapas",
      "Um método de medição de distâncias"
    ],
    correctAnswer: 1,
    explanation: "Projeção cartográfica é o sistema matemático de transformação das coordenadas geográficas (latitude e longitude) da superfície curva da Terra em coordenadas planas de um mapa."
  },
  {
    id: 5,
    question: "Qual é a principal desvantagem das projeções cartográficas?",
    options: [
      "São muito caras de produzir",
      "Impossível representar a superfície esférica no plano sem deformações",
      "Não podem ser digitalizadas",
      "Só funcionam para pequenas áreas"
    ],
    correctAnswer: 1,
    explanation: "É matematicamente impossível representar uma superfície curva (esfera) em um plano sem deformações. Toda projeção distorce áreas, ângulos, distâncias ou formas em algum grau."
  },
  {
    id: 6,
    question: "O que caracteriza uma projeção conforme?",
    options: [
      "Preserva as áreas corretamente",
      "Preserva os ângulos e as formas locais",
      "Preserva todas as distâncias",
      "Não apresenta nenhuma deformação"
    ],
    correctAnswer: 1,
    explanation: "Projeções conformes preservam os ângulos e as formas locais, mantendo a conformidade angular. Porém, distorcem as áreas, especialmente em latitudes altas."
  },
  {
    id: 7,
    question: "Qual é um exemplo clássico de projeção conforme?",
    options: [
      "Projeção de Mollweide",
      "Projeção de Peters",
      "Projeção de Mercator",
      "Projeção de Albers"
    ],
    correctAnswer: 2,
    explanation: "A Projeção de Mercator é a mais conhecida projeção conforme, preservando ângulos e formas, muito usada em navegação. Porém, exagera áreas nas altas latitudes."
  },
  {
    id: 8,
    question: "O que caracteriza uma projeção equivalente?",
    options: [
      "Preserva os ângulos",
      "Preserva as áreas em proporção verdadeira",
      "Preserva todas as distâncias",
      "Não tem deformações"
    ],
    correctAnswer: 1,
    explanation: "Projeções equivalentes (ou equiáreas) preservam as áreas em proporção verdadeira, úteis para mapas temáticos comparativos. Porém, distorcem ângulos e formas."
  },
  {
    id: 9,
    question: "Qual projeção é um exemplo de projeção equivalente?",
    options: [
      "Mercator",
      "UTM",
      "Peters (ou Gall-Peters)",
      "Estereográfica Polar"
    ],
    correctAnswer: 2,
    explanation: "A Projeção de Peters (Gall-Peters) é uma projeção equivalente que preserva as áreas, mostrando os continentes em suas proporções corretas, mas com distorção de formas."
  },
  {
    id: 10,
    question: "O que é a projeção UTM (Universal Transversa de Mercator)?",
    options: [
      "Uma projeção cilíndrica conforme dividida em fusos de 6°",
      "Uma projeção cônica equivalente",
      "Uma projeção azimutal usada nos polos",
      "Uma projeção sem nenhuma deformação"
    ],
    correctAnswer: 0,
    explanation: "A UTM é uma projeção cilíndrica conforme, dividida em 60 fusos de 6° de longitude cada, muito usada em mapeamento sistemático e topográfico, minimizando distorções localmente."
  },
  {
    id: 11,
    question: "Quantos fusos UTM cobrem todo o globo terrestre?",
    options: [
      "24 fusos",
      "30 fusos",
      "60 fusos",
      "180 fusos"
    ],
    correctAnswer: 2,
    explanation: "A projeção UTM divide a Terra em 60 fusos de 6° de longitude cada (360° ÷ 6° = 60), numerados de 1 a 60, do antemeridiano de Greenwich para leste."
  },
  {
    id: 12,
    question: "Qual é a vantagem das projeções cilíndricas?",
    options: [
      "Não apresentam deformações",
      "São simples de construir e boas para áreas equatoriais",
      "Preservam perfeitamente todas as áreas",
      "São usadas apenas para os polos"
    ],
    correctAnswer: 1,
    explanation: "Projeções cilíndricas são geometricamente simples e apresentam menores deformações próximo ao equador, sendo adequadas para mapas de regiões tropicais e navegação."
  },
  {
    id: 13,
    question: "Para que tipo de área as projeções cônicas são mais adequadas?",
    options: [
      "Regiões polares",
      "Regiões equatoriais",
      "Latitudes médias com orientação leste-oeste",
      "Áreas oceânicas"
    ],
    correctAnswer: 2,
    explanation: "Projeções cônicas são adequadas para latitudes médias com extensão predominante leste-oeste, pois o cone tangencia ou secciona a Terra nessas latitudes, minimizando deformações."
  },
  {
    id: 14,
    question: "Qual tipo de projeção é mais adequado para mapas polares?",
    options: [
      "Cilíndrica",
      "Cônica",
      "Azimutal (ou plana)",
      "Mercator"
    ],
    correctAnswer: 2,
    explanation: "Projeções azimutais (ou planas) são ideais para regiões polares, pois o plano de projeção tangencia a Terra no polo, minimizando deformações nessas áreas."
  },
  {
    id: 15,
    question: "O que é escala cartográfica?",
    options: [
      "A cor usada no mapa",
      "A relação entre distâncias no mapa e na realidade",
      "O tipo de projeção utilizada",
      "O tamanho do papel do mapa"
    ],
    correctAnswer: 1,
    explanation: "Escala é a relação matemática entre as distâncias no mapa e as distâncias correspondentes na superfície real. Ex: 1:50.000 significa que 1 cm no mapa = 50.000 cm (500 m) no terreno."
  },
  {
    id: 16,
    question: "O que significa uma escala 1:25.000?",
    options: [
      "1 cm no mapa representa 25 km na realidade",
      "1 cm no mapa representa 250 m na realidade",
      "1 cm no mapa representa 25.000 cm (250 m) na realidade",
      "O mapa tem 25.000 cm de comprimento"
    ],
    correctAnswer: 2,
    explanation: "Escala 1:25.000 significa que cada 1 cm no mapa corresponde a 25.000 cm no terreno, ou seja, 250 metros. É uma escala grande, com muito detalhe."
  },
  {
    id: 17,
    question: "Qual escala apresenta maior detalhamento?",
    options: [
      "1:1.000.000",
      "1:250.000",
      "1:50.000",
      "1:10.000"
    ],
    correctAnswer: 3,
    explanation: "Quanto menor o denominador da escala, maior é a escala e maior o nível de detalhe. 1:10.000 mostra mais detalhes que 1:1.000.000, pois representa uma área menor."
  },
  {
    id: 18,
    question: "O que são curvas de nível em um mapa topográfico?",
    options: [
      "Linhas que ligam pontos de mesma altitude",
      "Limites entre países",
      "Rotas de navegação",
      "Linhas de coordenadas"
    ],
    correctAnswer: 0,
    explanation: "Curvas de nível (ou isoípsas) são linhas que conectam pontos de mesma altitude, permitindo representar o relevo tridimensional em um mapa plano. Quanto mais próximas, mais íngreme o terreno."
  },
  {
    id: 19,
    question: "Qual órgão é responsável pelo mapeamento sistemático oficial do Brasil?",
    options: [
      "INPE",
      "IBGE",
      "INMET",
      "ANA"
    ],
    correctAnswer: 1,
    explanation: "O IBGE (Instituto Brasileiro de Geografia e Estatística) é responsável pelo mapeamento sistemático oficial do Brasil, produzindo as cartas topográficas nas diversas escalas."
  },
  {
    id: 20,
    question: "O que é um datum geodésico?",
    options: [
      "Um tipo de mapa temático",
      "Um sistema de referência que define a forma e posição da Terra para o mapeamento",
      "Uma escala cartográfica",
      "Um instrumento de medição topográfica"
    ],
    correctAnswer: 1,
    explanation: "Datum geodésico é um sistema de referência que define o modelo matemático da Terra (elipsoide) e sua posição, essencial para o mapeamento. Exemplos: SAD69, SIRGAS2000, WGS84."
  },
]

interface QuizProps {
  onBack: () => void
}

export default function Mapa({ onBack }: QuizProps) {
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
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Módulo 2: Mapas e Projeções Cartográficas</h1>
          <p className="text-muted-foreground text-lg">
            Tipos de Mapas - Projeções Cartgráficas - Métodos de Levantamento
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

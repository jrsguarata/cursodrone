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
    question: "Qual é a principal vantagem do uso de drones na inspeção de linhas de transmissão de energia?",
    options: [
      "Reduz custos e riscos, permitindo inspeções sem desligar a linha e sem expor pessoal a alturas",
      "Substitui completamente a manutenção humana",
      "Elimina a necessidade de qualquer planejamento",
      "Funciona apenas em dias ensolarados"
    ],
    correctAnswer: 0,
    explanation: "Drones reduzem significativamente custos operacionais e riscos à segurança, permitindo inspeções de linhas energizadas sem necessidade de desligamento e sem expor técnicos a trabalhos em altura perigosos."
  },
  {
    id: 2,
    question: "O que é uma câmera nadir em drones?",
    options: [
      "Câmera voltada para os lados",
      "Câmera apontada verticalmente para baixo (perpendicular ao solo)",
      "Câmera que filma em 360 graus",
      "Câmera infravermelha"
    ],
    correctAnswer: 1,
    explanation: "Câmera nadir aponta verticalmente para baixo (90° em relação ao solo), capturando imagens ortogonais ideais para mapeamento, ortomosaicos e medições precisas de áreas."
  },
  {
    id: 3,
    question: "O que é uma câmera oblíqua em drones?",
    options: [
      "Câmera vertical",
      "Câmera inclinada em relação à vertical (geralmente 30° a 60°)",
      "Câmera que gira automaticamente",
      "Câmera exclusiva para vídeos"
    ],
    correctAnswer: 1,
    explanation: "Câmera oblíqua é posicionada em ângulo inclinado (30° a 60°) em relação à vertical, capturando laterais de estruturas como torres, fachadas de edifícios e detalhes não visíveis em tomadas nadirais."
  },
  {
    id: 4,
    question: "Qual sensor é usado para detectar pontos quentes (hotspots) em equipamentos elétricos através de drones?",
    options: [
      "Câmera RGB convencional",
      "Câmera térmica (infravermelha)",
      "LiDAR",
      "Radar"
    ],
    correctAnswer: 1,
    explanation: "Câmera térmica (infravermelha) detecta radiação térmica, identificando pontos quentes causados por conexões defeituosas, sobrecarga ou componentes danificados em linhas de transmissão e subestações."
  },
  {
    id: 5,
    question: "Quais tipos de anomalias podem ser detectadas em torres de transmissão com câmeras RGB de alta resolução?",
    options: [
      "Apenas temperatura elevada",
      "Corrosão, trincas, parafusos soltos, ninhos de pássaros, vegetação invasora",
      "Somente campos magnéticos",
      "Apenas umidade"
    ],
    correctAnswer: 1,
    explanation: "Câmeras RGB de alta resolução capturam detalhes visuais que permitem identificar corrosão, trincas estruturais, parafusos frouxos ou faltantes, ninhos de aves, vegetação próxima aos cabos, entre outros."
  },
  {
    id: 6,
    question: "O que é visão computacional aplicada à inspeção de linhas de transmissão?",
    options: [
      "Apenas gravação de vídeos",
      "Uso de algoritmos de IA para detectar automaticamente anomalias em imagens capturadas",
      "Visualização manual de todas as imagens",
      "Transmissão ao vivo das imagens"
    ],
    correctAnswer: 1,
    explanation: "Visão computacional usa algoritmos de inteligência artificial (deep learning, redes neurais) para analisar automaticamente milhares de imagens, detectando e classificando anomalias como isoladores danificados, cabos rompidos, corrosão."
  },
  {
    id: 7,
    question: "Qual é a vantagem da inspeção termográfica com drones em linhas energizadas?",
    options: [
      "Identifica aquecimento anormal sem necessidade de desligamento da linha",
      "Funciona apenas com linhas desligadas",
      "Substitui inspeção visual completamente",
      "Não detecta problemas elétricos"
    ],
    correctAnswer: 0,
    explanation: "Inspeção termográfica detecta aquecimento anormal (conexões defeituosas, sobrecarga) em equipamentos energizados sem necessidade de desligamento, permitindo manutenção preditiva e evitando falhas."
  },
  {
    id: 8,
    question: "O que é efeito corona e como pode ser detectado em inspeções com drones?",
    options: [
      "Aquecimento normal dos cabos",
      "Descarga elétrica parcial que pode ser detectada com câmeras UV ou acústicas",
      "Corrosão de torres metálicas",
      "Movimento dos cabos pelo vento"
    ],
    correctAnswer: 1,
    explanation: "Efeito corona é uma descarga elétrica parcial que ocorre em alta tensão, detectável por câmeras UV (ultravioleta) ou sensores acústicos em drones, indicando problemas de isolamento ou conexões."
  },
  {
    id: 9,
    question: "Qual tipo de drone é mais adequado para inspeção detalhada de torres de transmissão?",
    options: [
      "Drone de asa fixa",
      "Multirrotor (quadricóptero ou hexacóptero) com capacidade de voo estacionário",
      "Drone submarino",
      "Balão dirigível"
    ],
    correctAnswer: 1,
    explanation: "Multirrotores (quadricópteros, hexacópteros) permitem voo estacionário (hover), aproximação controlada e manobras precisas necessárias para capturar detalhes de torres, isoladores e conexões."
  },
  {
    id: 10,
    question: "O que é ortomosaico gerado por drones e sua utilidade na inspeção de faixas de servidão?",
    options: [
      "Um vídeo em alta velocidade",
      "Uma imagem única ortorretificada criada pela junção de múltiplas fotos aéreas",
      "Uma foto isolada",
      "Um mapa desenhado manualmente"
    ],
    correctAnswer: 1,
    explanation: "Ortomosaico é uma imagem contínua georreferenciada criada pela união de centenas de fotos aéreas, permitindo visualizar toda a faixa de servidão, medir distâncias, detectar invasões e vegetação."
  },
  {
    id: 11,
    question: "Qual é a importância do planejamento de voo automatizado (waypoints) em inspeções de linhas de transmissão?",
    options: [
      "Não é importante, voo manual é sempre melhor",
      "Garante cobertura completa, repetibilidade e segurança, seguindo trajetória predefinida",
      "Serve apenas para economizar bateria",
      "É obrigatório por lei em todos os países"
    ],
    correctAnswer: 1,
    explanation: "Planejamento de voo com waypoints garante cobertura sistemática de toda a linha, permite repetir inspeções para comparação temporal, mantém distância segura e otimiza uso de bateria."
  },
  {
    id: 12,
    question: "Quais informações podem ser extraídas de uma nuvem de pontos 3D gerada por fotogrametria com drone?",
    options: [
      "Apenas cores das estruturas",
      "Geometria 3D precisa, dimensões, deformações estruturais, proximidade vegetação-cabos",
      "Somente temperatura",
      "Apenas localização GPS"
    ],
    correctAnswer: 1,
    explanation: "Nuvem de pontos 3D permite medições precisas de geometria, identificação de deformações estruturais, cálculo de distâncias entre vegetação e cabos, modelagem 3D de torres e linhas."
  },
  {
    id: 13,
    question: "O que é machine learning aplicado à detecção de anomalias em inspeções?",
    options: [
      "Edição manual de fotos",
      "Treinamento de algoritmos com imagens rotuladas para reconhecer padrões de defeitos automaticamente",
      "Impressão de relatórios",
      "Armazenamento de dados"
    ],
    correctAnswer: 1,
    explanation: "Machine learning treina modelos com milhares de imagens rotuladas (normais e com defeitos), permitindo que algoritmos aprendam a identificar automaticamente isoladores quebrados, corrosão, cabos frouxos, etc."
  },
  {
    id: 14,
    question: "Qual é a vantagem de usar LiDAR embarcado em drones para inspeção de linhas de transmissão?",
    options: [
      "Captura apenas cores",
      "Mede distâncias precisas com laser, criando modelos 3D mesmo sob vegetação densa",
      "Funciona apenas em ambientes fechados",
      "Detecta apenas temperatura"
    ],
    correctAnswer: 1,
    explanation: "LiDAR usa pulsos laser para medir distâncias precisas, criando nuvens de pontos 3D detalhadas que penetram vegetação, permitindo modelar terreno, cabos e identificar proximidade de árvores."
  },
  {
    id: 15,
    question: "Quais são os principais desafios na operação de drones próximos a linhas energizadas?",
    options: [
      "Não há desafios específicos",
      "Interferência eletromagnética, risco de colisão, rajadas de vento, necessidade de pilotos qualificados",
      "Apenas custo dos equipamentos",
      "Falta de luz solar"
    ],
    correctAnswer: 1,
    explanation: "Linhas de alta tensão geram campos eletromagnéticos que podem afetar navegação do drone, além de riscos de colisão, turbulência de vento, exigindo pilotos treinados e protocolos de segurança rigorosos."
  },
  {
    id: 16,
    question: "O que são isoladores em torres de transmissão e como drones auxiliam na sua inspeção?",
    options: [
      "Peças decorativas, drones não ajudam",
      "Componentes que isolam eletricamente os cabos da torre; drones capturam imagens detalhadas para detectar trincas, poluição, quebras",
      "Cabos de aço",
      "Fundações das torres"
    ],
    correctAnswer: 1,
    explanation: "Isoladores são componentes cerâmicos ou poliméricos que isolam eletricamente cabos energizados da estrutura metálica. Drones permitem inspeção visual detalhada sem escalada, identificando rachaduras, poluição, quebras."
  },
  {
    id: 17,
    question: "Como a inteligência artificial pode classificar a severidade de defeitos detectados em inspeções?",
    options: [
      "IA não pode classificar severidade",
      "Algoritmos treinados classificam defeitos em categorias (leve, moderado, crítico) baseado em padrões aprendidos",
      "Apenas técnicos humanos podem classificar",
      "Por cores aleatórias"
    ],
    correctAnswer: 1,
    explanation: "Modelos de IA podem ser treinados para classificar automaticamente a severidade de defeitos (ex: corrosão leve vs avançada, trinca superficial vs profunda), priorizando manutenções críticas."
  },
  {
    id: 18,
    question: "Qual é o papel da redundância de sensores em drones de inspeção profissional?",
    options: [
      "Não há necessidade de redundância",
      "Aumenta segurança e confiabilidade, permitindo operação mesmo com falha de um componente",
      "Serve apenas para aumentar peso",
      "É proibido por regulamentação"
    ],
    correctAnswer: 1,
    explanation: "Drones profissionais usam redundância (múltiplos GPS, IMUs, baterias) para garantir segurança e confiabilidade em operações críticas, permitindo retorno seguro mesmo com falha de componentes."
  },
  {
    id: 19,
    question: "O que é GSD (Ground Sample Distance) e sua importância em inspeções com drone?",
    options: [
      "Velocidade do drone",
      "Resolução espacial: tamanho real representado por cada pixel da imagem",
      "Altitude máxima de voo",
      "Distância entre torres"
    ],
    correctAnswer: 1,
    explanation: "GSD (Ground Sample Distance) é a resolução espacial: tamanho real no terreno representado por cada pixel. GSD menor (ex: 1cm/pixel) captura mais detalhes, essencial para detectar pequenas trincas e anomalias."
  },
  {
    id: 20,
    question: "Como algoritmos de detecção de objetos (object detection) auxiliam na análise automática de imagens de torres?",
    options: [
      "Apenas comprimem as imagens",
      "Identificam e localizam automaticamente componentes específicos (isoladores, conectores, cabos) nas imagens",
      "Deletam imagens ruins",
      "Convertem para preto e branco"
    ],
    correctAnswer: 1,
    explanation: "Algoritmos de object detection (YOLO, Faster R-CNN) identificam e localizam automaticamente componentes específicos nas imagens (isoladores, conectores, espaçadores), facilitando inspeção automatizada e inventário."
  },
]

interface QuizProps {
  onBack: () => void
}

export default function Drone({ onBack }: QuizProps) {
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Módulo 5: Drones na Inspeção de Infraestrutura Elétrica</h1>
          <p className="text-muted-foreground text-lg">
            Sensores Embarcados - Câmeras Nadir e Oblíquas - Visão Computacional - Detecção de Anomalias
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

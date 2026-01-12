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
    question: "Qual é a principal diferença entre dados vetoriais e dados raster?",
    options: [
      "Vetoriais são para mapas impressos, raster para digitais",
      "Vetoriais representam feições por pontos, linhas e polígonos; raster por matriz de células (pixels)",
      "Vetoriais são mais antigos que raster",
      "Não há diferença significativa"
    ],
    correctAnswer: 1,
    explanation: "Dados vetoriais representam feições geográficas através de geometrias (pontos, linhas, polígonos) com coordenadas precisas. Dados raster representam o espaço como uma grade regular de células (pixels), cada uma com um valor."
  },
  {
    id: 2,
    question: "O que é resolução espacial em imagens raster?",
    options: [
      "A quantidade de cores na imagem",
      "O tamanho do pixel no terreno (área representada por cada célula)",
      "A velocidade de processamento",
      "O formato do arquivo"
    ],
    correctAnswer: 1,
    explanation: "Resolução espacial refere-se ao tamanho do pixel no terreno. Por exemplo, uma imagem com resolução de 30m significa que cada pixel representa uma área de 30m x 30m no solo."
  },
  {
    id: 3,
    question: "O que é a operação de buffer em SIG?",
    options: [
      "Criar uma zona de influência ao redor de feições geográficas",
      "Apagar dados desnecessários",
      "Aumentar o brilho da imagem",
      "Comprimir arquivos vetoriais"
    ],
    correctAnswer: 0,
    explanation: "Buffer cria uma zona (ou área de influência) ao redor de uma feição geográfica a uma distância especificada. É útil para análises de proximidade, áreas de proteção, zonas de segurança, etc."
  },
  {
    id: 4,
    question: "O que faz a operação de união (union) entre camadas vetoriais?",
    options: [
      "Combina duas camadas mantendo todas as feições e seus atributos",
      "Apaga feições duplicadas",
      "Mescla pixels de imagens",
      "Converte vetores em raster"
    ],
    correctAnswer: 0,
    explanation: "A operação de união combina duas ou mais camadas vetoriais, preservando todas as geometrias e criando novas feições onde há sobreposição, mantendo os atributos de ambas as camadas."
  },
  {
    id: 5,
    question: "O que é classificação supervisionada de imagens?",
    options: [
      "Classificação automática sem intervenção humana",
      "Classificação baseada em amostras de treinamento fornecidas pelo analista",
      "Classificação feita por satélites",
      "Organização de arquivos em pastas"
    ],
    correctAnswer: 1,
    explanation: "Classificação supervisionada usa amostras de treinamento (áreas conhecidas) fornecidas pelo analista para treinar algoritmos que classificam toda a imagem em categorias predefinidas (água, floresta, urbano, etc.)."
  },
  {
    id: 6,
    question: "O que caracteriza a classificação não supervisionada?",
    options: [
      "O analista define todas as classes antes",
      "O algoritmo agrupa pixels por similaridade espectral sem amostras prévias",
      "Não é possível classificar imagens desse modo",
      "É feita manualmente pixel por pixel"
    ],
    correctAnswer: 1,
    explanation: "Classificação não supervisionada agrupa automaticamente pixels em classes baseando-se em similaridade espectral, sem amostras de treinamento. O analista interpreta as classes resultantes posteriormente."
  },
  {
    id: 7,
    question: "O que é retificação geométrica (ou georreferenciamento) de imagens?",
    options: [
      "Melhorar o contraste da imagem",
      "Corrigir distorções geométricas e atribuir coordenadas geográficas precisas",
      "Converter imagem colorida em preto e branco",
      "Reduzir o tamanho do arquivo"
    ],
    correctAnswer: 1,
    explanation: "Retificação ou georreferenciamento corrige distorções geométricas da imagem e atribui coordenadas geográficas precisas usando pontos de controle, permitindo integração com outros dados espaciais."
  },
  {
    id: 8,
    question: "O que são pontos de controle no georreferenciamento?",
    options: [
      "Pixels mais brilhantes da imagem",
      "Pontos identificáveis na imagem com coordenadas conhecidas no terreno",
      "Centros urbanos",
      "Satélites de referência"
    ],
    correctAnswer: 1,
    explanation: "Pontos de controle são feições facilmente identificáveis tanto na imagem quanto no terreno (cruzamentos, edificações, etc.) cujas coordenadas precisas são conhecidas, usados para georreferenciar a imagem."
  },
  {
    id: 9,
    question: "O que faz a operação de interseção (intersect) entre camadas vetoriais?",
    options: [
      "Mantém apenas as áreas comuns a ambas as camadas",
      "Remove todas as sobreposições",
      "Cria cópias das camadas",
      "Converte polígonos em pontos"
    ],
    correctAnswer: 0,
    explanation: "Interseção cria uma nova camada contendo apenas as áreas que são comuns (sobrepostas) entre as camadas de entrada, preservando atributos de ambas nas áreas de interseção."
  },
  {
    id: 10,
    question: "O que é a operação de diferença (difference) em análise vetorial?",
    options: [
      "Calcula a distância entre feições",
      "Remove da primeira camada as áreas que se sobrepõem à segunda",
      "Subtrai valores de atributos",
      "Compara resoluções de imagens"
    ],
    correctAnswer: 1,
    explanation: "A operação de diferença remove da primeira camada as áreas que se sobrepõem à segunda camada, mantendo apenas as partes da primeira que não coincidem com a segunda."
  },
  {
    id: 11,
    question: "O que é resolução espectral de sensores remotos?",
    options: [
      "O tamanho do pixel",
      "O número e largura de bandas espectrais que o sensor capta",
      "A altitude do satélite",
      "A velocidade de captura"
    ],
    correctAnswer: 1,
    explanation: "Resolução espectral refere-se ao número de bandas espectrais (regiões do espectro eletromagnético) e suas larguras que o sensor consegue capturar. Mais bandas permitem melhor discriminação de alvos."
  },
  {
    id: 12,
    question: "O que é uma composição colorida RGB em sensoriamento remoto?",
    options: [
      "Combinação de três bandas espectrais exibidas como vermelho, verde e azul",
      "Uma foto tirada com câmera colorida normal",
      "Um mapa temático com três cores",
      "Um tipo de classificação"
    ],
    correctAnswer: 0,
    explanation: "Composição RGB combina três bandas espectrais (que podem ser de qualquer região do espectro) nos canais vermelho (R), verde (G) e azul (B) da tela, criando imagens coloridas para interpretação."
  },
  {
    id: 13,
    question: "O que é o NDVI (Índice de Vegetação por Diferença Normalizada)?",
    options: [
      "Um tipo de sensor",
      "Um índice calculado por bandas infravermelho e vermelho para avaliar vigor vegetativo",
      "Uma técnica de classificação",
      "Um formato de arquivo"
    ],
    correctAnswer: 1,
    explanation: "NDVI é calculado pela diferença entre reflectância no infravermelho próximo e vermelho, normalizado pela soma. Varia de -1 a +1, sendo valores altos indicativos de vegetação densa e saudável."
  },
  {
    id: 14,
    question: "O que é reamostragem (resampling) de imagens raster?",
    options: [
      "Tirar novas fotos da mesma área",
      "Alterar o tamanho do pixel da imagem para uma nova resolução",
      "Classificar a imagem novamente",
      "Corrigir cores"
    ],
    correctAnswer: 1,
    explanation: "Reamostragem altera o tamanho e número de pixels da imagem, criando uma nova grade. Métodos incluem vizinho mais próximo, bilinear e cúbica, cada um preservando diferentes características."
  },
  {
    id: 15,
    question: "O que faz a operação de clip (recorte) em SIG?",
    options: [
      "Extrai uma porção dos dados usando os limites de outra camada",
      "Remove dados duplicados",
      "Comprime arquivos",
      "Converte formatos"
    ],
    correctAnswer: 0,
    explanation: "Clip extrai uma porção dos dados (raster ou vetor) usando os limites de uma camada de polígono como 'máscara de corte', mantendo apenas os dados dentro da área especificada."
  },
  {
    id: 16,
    question: "O que é dissolve (dissolução) em análise vetorial?",
    options: [
      "Apagar feições",
      "Agregar feições adjacentes com mesmo atributo em uma única feição",
      "Separar polígonos complexos",
      "Converter para raster"
    ],
    correctAnswer: 1,
    explanation: "Dissolve agrega (mescla) feições adjacentes ou sobrepostas que compartilham o mesmo valor de atributo, criando uma feição única e eliminando fronteiras internas entre elas."
  },
  {
    id: 17,
    question: "O que é correção atmosférica em processamento de imagens?",
    options: [
      "Ajustar brilho e contraste",
      "Remover efeitos da atmosfera nos valores de reflectância registrados pelo sensor",
      "Prever condições climáticas",
      "Eliminar nuvens"
    ],
    correctAnswer: 1,
    explanation: "Correção atmosférica remove os efeitos de espalhamento e absorção atmosférica, convertendo valores registrados pelo sensor em reflectância de superfície, permitindo comparações multitemporais."
  },
  {
    id: 18,
    question: "O que é merge (mesclar) de camadas vetoriais?",
    options: [
      "Combinar múltiplas camadas do mesmo tipo de geometria em uma única camada",
      "Sobrepor camadas sem modificá-las",
      "Criar buffer",
      "Classificar dados"
    ],
    correctAnswer: 0,
    explanation: "Merge combina duas ou mais camadas com o mesmo tipo de geometria (pontos, linhas ou polígonos) e estrutura de atributos similar em uma única camada, mantendo todas as feições."
  },
  {
    id: 19,
    question: "O que é mosaico (mosaic) de imagens raster?",
    options: [
      "Uma técnica de classificação",
      "Juntar múltiplas imagens adjacentes em uma única imagem contínua",
      "Dividir uma imagem grande",
      "Aplicar filtros artísticos"
    ],
    correctAnswer: 1,
    explanation: "Mosaico combina múltiplas imagens raster adjacentes ou sobrepostas em uma única imagem contínua, ajustando bordas e valores para criar transições suaves entre as cenas."
  },
  {
    id: 20,
    question: "O que são filtros espaciais em processamento de imagens raster?",
    options: [
      "Ferramentas para comprimir imagens",
      "Operações que modificam valores de pixels baseando-se em vizinhança (suavização, realce, detecção de bordas)",
      "Métodos de classificação",
      "Técnicas de georreferenciamento"
    ],
    correctAnswer: 1,
    explanation: "Filtros espaciais aplicam operações matemáticas em cada pixel considerando seus vizinhos, usando janelas móveis (kernels). Exemplos: suavização (média), realce (high-pass), detecção de bordas (Sobel)."
  },
]

interface QuizProps {
  onBack: () => void
}

export default function Tratamento({ onBack }: QuizProps) {
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Módulo 3: Tratamento de Dados Espaciais</h1>
          <p className="text-muted-foreground text-lg">
            Dados Vetoriais e Raster - Classificação de Imagens - Operações de Análise Espacial
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

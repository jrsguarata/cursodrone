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
    question: "O que significa CAD?",
    options: [
      "Computer Aided Drafting",
      "Computer Assisted Design",
      "Computer Aided Design (Desenho Assistido por Computador)",
      "Computer Automated Drawing"
    ],
    correctAnswer: 2,
    explanation: "CAD significa Computer Aided Design (Desenho Assistido por Computador), tecnologia que permite criar, modificar, analisar e documentar designs e desenhos técnicos de forma digital."
  },
  {
    id: 2,
    question: "Qual é o software CAD mais utilizado mundialmente?",
    options: [
      "SketchUp",
      "AutoCAD",
      "QGIS",
      "Revit"
    ],
    correctAnswer: 1,
    explanation: "AutoCAD, da Autodesk, é o software CAD mais utilizado mundialmente desde seu lançamento em 1982, sendo referência em desenho técnico 2D e modelagem 3D."
  },
  {
    id: 3,
    question: "O que significa GIS (ou SIG em português)?",
    options: [
      "Global Information System",
      "Geographic Information System (Sistema de Informação Geográfica)",
      "Geological Integrated System",
      "General Investigation Software"
    ],
    correctAnswer: 1,
    explanation: "GIS (Geographic Information System) ou SIG (Sistema de Informação Geográfica) é um sistema que captura, armazena, analisa, gerencia e apresenta dados espacialmente referenciados."
  },
  {
    id: 4,
    question: "Qual software GIS de código aberto é mais popular?",
    options: [
      "ArcGIS",
      "MapInfo",
      "QGIS",
      "AutoCAD Map 3D"
    ],
    correctAnswer: 2,
    explanation: "QGIS (Quantum GIS) é o software GIS de código aberto (open source) mais popular, oferecendo funcionalidades completas de SIG gratuitamente e com desenvolvimento comunitário ativo."
  },
  {
    id: 5,
    question: "Qual empresa desenvolve o ArcGIS?",
    options: [
      "Autodesk",
      "Esri",
      "Bentley Systems",
      "Trimble"
    ],
    correctAnswer: 1,
    explanation: "Esri (Environmental Systems Research Institute) desenvolve o ArcGIS, uma das plataformas GIS comerciais mais completas e utilizadas no mundo para análise espacial."
  },
  {
    id: 6,
    question: "O que significa BIM?",
    options: [
      "Building Information Modeling (Modelagem da Informação da Construção)",
      "Basic Infrastructure Management",
      "Building Integrated Management",
      "Built Information Method"
    ],
    correctAnswer: 0,
    explanation: "BIM significa Building Information Modeling, metodologia que integra informações 3D da edificação com dados de projeto, construção, custos, cronograma e manutenção em um modelo digital único."
  },
  {
    id: 7,
    question: "Qual software é líder em BIM para arquitetura?",
    options: [
      "AutoCAD",
      "SketchUp",
      "Revit",
      "ArchiCAD"
    ],
    correctAnswer: 2,
    explanation: "Revit, da Autodesk, é líder de mercado em BIM para arquitetura, oferecendo modelagem paramétrica integrada para arquitetura, estrutura e instalações (MEP)."
  },
  {
    id: 8,
    question: "Qual software é específico para processamento de imagens de sensoriamento remoto?",
    options: [
      "AutoCAD",
      "ArcGIS Pro",
      "ENVI (ou ERDAS Imagine)",
      "Revit"
    ],
    correctAnswer: 2,
    explanation: "ENVI e ERDAS Imagine são softwares especializados em processamento de imagens de sensoriamento remoto, oferecendo ferramentas avançadas para classificação, correção e análise de imagens orbitais."
  },
  {
    id: 9,
    question: "O que é um shapefile?",
    options: [
      "Um formato de arquivo 3D para BIM",
      "Um formato vetorial de dados geoespaciais da Esri",
      "Um tipo de imagem de satélite",
      "Um formato de desenho CAD"
    ],
    correctAnswer: 1,
    explanation: "Shapefile (.shp) é um formato vetorial de dados geoespaciais desenvolvido pela Esri, amplamente utilizado em GIS para armazenar geometrias (pontos, linhas, polígonos) e atributos."
  },
  {
    id: 10,
    question: "Qual formato de arquivo é nativo do AutoCAD?",
    options: [
      ".shp",
      ".dwg",
      ".rvt",
      ".tif"
    ],
    correctAnswer: 1,
    explanation: "DWG (Drawing) é o formato nativo do AutoCAD para armazenar desenhos 2D e modelos 3D, sendo um padrão da indústria para troca de dados CAD."
  },
  {
    id: 11,
    question: "Qual formato de arquivo é nativo do Revit?",
    options: [
      ".dwg",
      ".rvt",
      ".ifc",
      ".skp"
    ],
    correctAnswer: 1,
    explanation: "RVT é o formato de arquivo nativo do Revit, armazenando todos os dados BIM do projeto incluindo geometria 3D, informações de componentes, fases e vistas."
  },
  {
    id: 12,
    question: "O que é o formato IFC em BIM?",
    options: [
      "Um formato proprietário da Autodesk",
      "Um padrão aberto de interoperabilidade entre softwares BIM",
      "Um tipo de imagem raster",
      "Um formato específico para CAD 2D"
    ],
    correctAnswer: 1,
    explanation: "IFC (Industry Foundation Classes) é um padrão aberto e neutro para troca de dados BIM entre diferentes softwares, garantindo interoperabilidade no processo BIM."
  },
  {
    id: 13,
    question: "Qual software é popular para modelagem 3D arquitetônica simplificada?",
    options: [
      "ENVI",
      "QGIS",
      "SketchUp",
      "ERDAS"
    ],
    correctAnswer: 2,
    explanation: "SketchUp é popular por sua interface intuitiva para modelagem 3D arquitetônica, sendo usado para estudos preliminares, visualizações e projetos conceituais."
  },
  {
    id: 14,
    question: "O que é o Google Earth Engine?",
    options: [
      "Um software CAD da Google",
      "Uma plataforma em nuvem para processamento de dados geoespaciais e imagens de satélite",
      "Um aplicativo de navegação",
      "Um formato de arquivo raster"
    ],
    correctAnswer: 1,
    explanation: "Google Earth Engine é uma plataforma em nuvem que permite processamento e análise de grandes volumes de dados geoespaciais e imagens de satélite usando programação (JavaScript ou Python)."
  },
  {
    id: 15,
    question: "Qual linguagem de programação é mais usada em automação e análise em GIS?",
    options: [
      "Java",
      "C++",
      "Python",
      "PHP"
    ],
    correctAnswer: 2,
    explanation: "Python é a linguagem mais utilizada em GIS, com bibliotecas como ArcPy (ArcGIS), PyQGIS (QGIS), GDAL, Geopandas e Rasterio para automação e análise espacial."
  },
  {
    id: 16,
    question: "O que é o formato GeoTIFF?",
    options: [
      "Um formato vetorial para CAD",
      "Um formato raster que inclui metadados de georreferenciamento",
      "Um formato exclusivo do AutoCAD",
      "Um tipo de arquivo BIM"
    ],
    correctAnswer: 1,
    explanation: "GeoTIFF é um formato de imagem raster (baseado em TIFF) que inclui metadados de georreferenciamento (coordenadas, projeção, datum), amplamente usado em GIS e sensoriamento remoto."
  },
  {
    id: 17,
    question: "Qual software da Bentley Systems é usado para projetos de infraestrutura?",
    options: [
      "Revit",
      "MicroStation",
      "SketchUp",
      "QGIS"
    ],
    correctAnswer: 1,
    explanation: "MicroStation, da Bentley Systems, é usado para projetos de infraestrutura (rodovias, ferrovias, pontes), oferecendo ferramentas CAD e BIM para engenharia civil."
  },
  {
    id: 18,
    question: "O que é o ArcGIS Online?",
    options: [
      "Uma versão offline do ArcGIS",
      "Uma plataforma em nuvem para criar e compartilhar mapas e aplicações GIS",
      "Um software para processamento de imagens",
      "Um formato de arquivo vetorial"
    ],
    correctAnswer: 1,
    explanation: "ArcGIS Online é uma plataforma SaaS (Software as a Service) baseada em nuvem da Esri para criar, compartilhar e publicar mapas web, aplicações e análises GIS."
  },
  {
    id: 19,
    question: "Qual software é usado para processamento fotogramétrico e criação de ortomosaicos?",
    options: [
      "AutoCAD",
      "Revit",
      "Pix4D ou Agisoft Metashape",
      "QGIS"
    ],
    correctAnswer: 2,
    explanation: "Pix4D e Agisoft Metashape são softwares especializados em fotogrametria, processando imagens de drones ou aéreas para gerar ortomosaicos, nuvens de pontos e modelos 3D."
  },
  {
    id: 20,
    question: "O que é um geodatabase?",
    options: [
      "Um tipo de arquivo CAD",
      "Um banco de dados espacial para armazenar e gerenciar dados GIS",
      "Um software de modelagem 3D",
      "Um formato de imagem de satélite"
    ],
    correctAnswer: 1,
    explanation: "Geodatabase é um banco de dados espacial (da Esri) que armazena, gerencia e organiza dados GIS (vetoriais, raster, atributos) com suporte a topologia, relacionamentos e regras de validação."
  },
]

interface QuizProps {
  onBack: () => void
}

export default function Software({ onBack }: QuizProps) {
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Módulo 4: Softwares para Geotecnologias</h1>
          <p className="text-muted-foreground text-lg">
            CAD - GIS - Sensoriamento Remoto - BIM - Formatos de Arquivo
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

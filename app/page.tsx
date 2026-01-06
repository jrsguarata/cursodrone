"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation, Book, Layers, ComputerIcon, CameraIcon } from "lucide-react"
import Localizacao from "@/components/quizzes/localizacao"
import Mapa from "@/components/quizzes/mapa"
import Tratamento from "@/components/quizzes/tratamento"
import Software from "@/components/quizzes/software"
import Drone from "@/components/quizzes/drone"

interface QuizInfo {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  questionCount: number
  difficulty: "Planejado" | "Realizado" 
}

const availableQuizzes: QuizInfo[] = [
  {
    id: "localizacao",
    title: "Módulo 1: Localização na Superfície Terrestre",
    description: "Distâncias, Direções e Tempo - Sistemas de Coordenadas - GNSS",
    icon: <Navigation className="w-8 h-8" />,
    questionCount: 20,
    difficulty: "Realizado",
  },
  {
    id: "mapa",
    title: "Módulo 2: Mapas e Projeções Cartográficas",
    description: "Tipos de Mapas - Projeções Cartgráficas - Métodos de Levantamento",
    icon: <Layers className="w-8 h-8" />,
    questionCount: 20,
    difficulty: "Realizado",
  },
  {
    id: "tratamento",
    title: "Módulo 3: Tratamento de Imagens para Mapeamento",
    description: "Tipos de Imagens - Correção Radiométrica e Geométrica - Classificação de Imagens",
    icon: <Book className="w-8 h-8" />,
    questionCount: 20,
    difficulty: "Realizado",
  },  
  {
    id: "software",
    title: "Módulo 4: CAD, GIS, SSR e BIM",
    description: "Fundamentos e Usos",
    icon: <ComputerIcon className="w-8 h-8" />,
    questionCount: 20,
    difficulty: "Realizado",
  },
  {
    id: "drone",
    title: "Módulo 5: Drones na Inspeção de Linhas de Transmissão",
    description: "Tipos de Drones e Sensores - Planejamento de Voo - Processamento de Dados",
    icon: <CameraIcon className="w-8 h-8" />,
    questionCount: 20,
    difficulty: "Realizado",
  },  
]

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)

  if (selectedQuiz === "localizacao") {
    return <Localizacao onBack={() => setSelectedQuiz(null)} />
  }

  if (selectedQuiz === "mapa") {
    return <Mapa onBack={() => setSelectedQuiz(null)} />
  }

  if (selectedQuiz === "tratamento") {
    return <Tratamento onBack={() => setSelectedQuiz(null)} />
  }

  if (selectedQuiz === "software") {
    return <Software onBack={() => setSelectedQuiz(null)} />
  }

  if (selectedQuiz === "drone") {
    return <Drone onBack={() => setSelectedQuiz(null)} />
  }

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Treinamento em Geotecnologia aplicada a Torres de Transmissão de Energia Elétrica</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-balance">
            Avaliação de Conhecimentos Adquiridos
          </p>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableQuizzes.map((quiz) => {
            // const isComingSoon = quiz.id.startsWith("coming-soon")
            const isComingSoon = quiz.difficulty === "Planejado"
            const difficultyColors = {
              Planejado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
              Realizado: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
            }

            return (
              <Card
                key={quiz.id}
                className={`border-2 shadow-lg transition-all duration-300 ${
                  isComingSoon
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-xl hover:scale-[1.02] hover:border-primary"
                }`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                      {quiz.icon}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[quiz.difficulty]}`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{quiz.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isComingSoon && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{quiz.questionCount} questões</span>
                    </div>
                  )}
                  <Button onClick={() => setSelectedQuiz(quiz.id)} disabled={isComingSoon} className="w-full" size="lg">
                    {isComingSoon ? "Em Breve" : "Iniciar Avaliação"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

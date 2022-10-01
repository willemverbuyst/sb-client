export interface Answer {
  id: number
  text: string
}

export interface Rule {
  id: number
  question: string
  answers: Answer[]
}

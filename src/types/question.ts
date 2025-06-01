export type Question = {
  category: string
  question: string
  correct_answer: string
  answers: string[]
  incorrect_answers: string[]
  createdAt?: Date
  updatedAt?: Date
}

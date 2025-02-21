import { type model } from '../../../../Foobara/Ai/AnswerBot/Types/model'

export default interface Inputs {
  question: string
  service?: 'open-ai' | 'anthropic'
  model?: model
}

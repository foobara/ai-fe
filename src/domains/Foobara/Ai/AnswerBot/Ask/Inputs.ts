import { type model } from '../../../../Foobara/Ai/AnswerBot/Types/model'

import { type service } from '../../../../Foobara/Ai/AnswerBot/Types/service'

export default interface Inputs {
  question: string
  service?: service
  model?: model
}

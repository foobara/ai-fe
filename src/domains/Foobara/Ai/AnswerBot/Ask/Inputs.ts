import { type model_enum } from '../../../../Foobara/Ai/AnswerBot/Types/model_enum'

import { type service_enum } from '../../../../Foobara/Ai/AnswerBot/Types/service_enum'

export default interface Inputs {
  question: string
  service?: service_enum
  model?: model_enum
}

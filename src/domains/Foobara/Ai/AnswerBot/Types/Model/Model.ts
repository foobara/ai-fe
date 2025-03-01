import { Model } from '../../../../../base/Model'

import { type model_enum } from '../../../../../Foobara/Ai/AnswerBot/Types/model_enum'

import { type service_enum } from '../../../../../Foobara/Ai/AnswerBot/Types/service_enum'

export interface ModelAttributesType {
  id: model_enum
  service: service_enum
}

export class Model<
  AttributesType extends ModelAttributesType = ModelAttributesType
> extends Model<AttributesType> {
  static readonly modelName: string = 'Model'

  get id (): AttributesType['id'] {
    return this.readAttribute('id')
  }

  get service (): AttributesType['service'] {
    return this.readAttribute('service')
  }
}

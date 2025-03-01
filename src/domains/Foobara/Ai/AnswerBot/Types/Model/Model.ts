import { Model as ModelBase } from '../../../../../base/Model'

import { type model } from '../../../../../Foobara/Ai/AnswerBot/Types/model'

import { type service } from '../../../../../Foobara/Ai/AnswerBot/Types/service'

export interface ModelAttributesType {
  id: model
  service: service
}

export class Model<
  AttributesType extends ModelAttributesType = ModelAttributesType
> extends ModelBase<AttributesType> {
  static readonly modelName: string = 'Model'

  get id (): AttributesType['id'] {
    return this.readAttribute('id')
  }

  get service (): AttributesType['service'] {
    return this.readAttribute('service')
  }
}

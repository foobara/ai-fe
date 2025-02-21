import { type CannotCastError } from '../../../../base/processors/Foobara/Value/Processor/CannotCastError'

import { type UnexpectedAttributesError } from '../../../../base/processors/attributes/SupportedProcessors/UnexpectedAttributesError'

import { type MissingRequiredAttributeError } from '../../../../base/processors/attributes/SupportedValidators/MissingRequiredAttributeError'

import { type ValueNotValidError } from '../../../../base/processors/duck/SupportedValidators/ValueNotValidError'

export interface PossibleErrors {

  'data.cannot_cast': CannotCastError

  'data.missing_required_attribute': MissingRequiredAttributeError

  'data.model.cannot_cast': CannotCastError

  'data.model.value_not_valid': ValueNotValidError

  'data.question.cannot_cast': CannotCastError

  'data.question.missing_required_attribute': MissingRequiredAttributeError

  'data.service.cannot_cast': CannotCastError

  'data.service.value_not_valid': ValueNotValidError

  'data.unexpected_attributes': UnexpectedAttributesError

}

export type Error = CannotCastError |
MissingRequiredAttributeError |
UnexpectedAttributesError |
ValueNotValidError

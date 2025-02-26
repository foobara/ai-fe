import { type CannotCastError } from '../../../../base/processors/Foobara/Value/Processor/CannotCastError'

import { type UnexpectedAttributesError } from '../../../../base/processors/attributes/SupportedProcessors/UnexpectedAttributesError'

import { type MaxExceededError } from '../../../../base/processors/number/SupportedValidators/MaxExceededError'

import { type BelowMinimumError } from '../../../../base/processors/number/SupportedValidators/BelowMinimumError'

export interface PossibleErrors {

  'foobara::ai::anthropic_api::list_models>data.api_token.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>data.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>data.page_size.below_minimum': BelowMinimumError

  'foobara::ai::anthropic_api::list_models>data.page_size.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>data.page_size.max_exceeded': MaxExceededError

  'foobara::ai::anthropic_api::list_models>data.unexpected_attributes': UnexpectedAttributesError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.after_id.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.anthropic_version.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.api_token.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.before_id.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.limit.below_minimum': BelowMinimumError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.limit.cannot_cast': CannotCastError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.limit.max_exceeded': MaxExceededError

  'foobara::ai::anthropic_api::list_models>foobara::ai::anthropic_api::get_page_of_models>data.unexpected_attributes': UnexpectedAttributesError

  'foobara::ai::open_ai_api::list_models>data.api_token.cannot_cast': CannotCastError

  'foobara::ai::open_ai_api::list_models>data.cannot_cast': CannotCastError

  'foobara::ai::open_ai_api::list_models>data.unexpected_attributes': UnexpectedAttributesError

}

export type Error = BelowMinimumError |
CannotCastError |
MaxExceededError |
UnexpectedAttributesError

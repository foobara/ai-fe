import RemoteCommand from '../../../../base/RemoteCommand'

import type Inputs from './Inputs'
import type Result from './Result'
import { type Error } from './Errors'

export class ListModels extends RemoteCommand<Inputs, Result, Error> {
  static readonly organizationName = 'Foobara::Ai'
  static readonly domainName = 'AnswerBot'
  static readonly commandName = 'ListModels'
}

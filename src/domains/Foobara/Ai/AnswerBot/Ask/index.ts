import RemoteCommand from '../../../../base/RemoteCommand'

import type Inputs from './Inputs'
import type Result from './Result'
import { type Error } from './Errors'

export class Ask extends RemoteCommand<Inputs, Result, Error> {
  static readonly organizationName = 'Ai'
  static readonly domainName = 'AnswerBot'
  static readonly commandName = 'Ask'
}

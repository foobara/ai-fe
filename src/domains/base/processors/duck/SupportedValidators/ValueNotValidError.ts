import { DataError } from '../../../../base/Error'

export class ValueNotValidError extends DataError<{
  value?: any
  valid_values?: any[]
}> {
}

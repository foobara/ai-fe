import { DataError } from '../../../../base/Error'

export class MaxExceededError extends DataError<{
  value?: number
  max?: number
}> {
}

import { DataError } from '../../../../base/Error'

export class BelowMinimumError extends DataError<{
  value?: number
  min?: number
}> {
}

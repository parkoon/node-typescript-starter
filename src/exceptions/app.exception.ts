import HttpException from './http.exception'

class AppException extends HttpException {
  public isOperational: boolean

  constructor(status: number, message: string) {
    super(status, message)
    this.isOperational = true
  }
}

export default AppException

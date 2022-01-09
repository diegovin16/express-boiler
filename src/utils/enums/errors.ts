export enum AuthError {
  AUTH_WRONG = 'User or password wrong',
  USER_OR_PASSWORD_NOT_FOUND = 'User or password not found',
  TOKEN_MISSING = 'Authentication token is missing',
  INVALID_TOKEN = 'Invalid token',
  EMAIL_ALREADY_EXISTS = 'Error to create person with this email, person already exists',
}

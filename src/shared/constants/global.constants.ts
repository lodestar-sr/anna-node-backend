export enum ResponseStatus {
  SUCCESS = 'Success',
  FAILED = 'Failed',
  INVALID_EMAIL_PASSWORD = 'InvalidEmailOrPassword',
  EXPIRED_JWT = 'ExpiredJwt',
}

export enum UserRole {
  ADMIN = 'admin',
  STANDARD = 'standard'
}
export const error = {
  Unauthorized: 'Unauthorized!',
  NotFound: (objectName: string) => `${objectName} not found!`,
  Existed: (objectName: string) => `${objectName} already existsted!`,
  NotAllow: 'Action not allowed!',
  Incorrect: (objectName: string) => `${objectName} is incorrect!`,
  SystemError: 'System Error!'
}
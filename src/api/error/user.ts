export class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
  }
}
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exists");
  }
}

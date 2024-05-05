export const passwordValidator = (password: string) => {
  let error = "";

  if (password.length < 6)
    error += "Мінімальна довжина 6 символів\n";

  if (!/[A-Za-z]/.test(password))
    error += "Має містити букви\n";

  if (!/\d/.test(password))
    error += "Має містити цифри\n";

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
    error += "Має містити спеціальні символи\n";

  return {error: error, valid: error === ""};
}
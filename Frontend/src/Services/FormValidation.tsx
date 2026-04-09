const SignupValidation = (name: string, value: string) => {
  const trimmedValue =
    name === "password" || name === "confirmPassword" ? value : value.trim();

  switch (name) {
    case "name":
      if (trimmedValue.length === 0) return "Name is required";
      return "";

    case "email":
      if (trimmedValue.length === 0) return "Email is required";
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue)
      )
        return "Email is invalid";
      return "";

    case "password":
      if (trimmedValue.length === 0) return "Password is required";
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,}$/.test(
          trimmedValue,
        )
      )
        return "Password must contain: at least 8 characters, one lowercase, one uppercase, one number, one symbol";
      return "";

    default:
      return "";
  }
};

const LoginValidation = (name: string, value: string) => {
  switch (name) {
    case "email":
      if (value.length === 0) return "Email is required";
      return "";
    case "password":
      if (value.length === 0) return "Password is required";
      return "";
    default:
      return "";
  }
};

export { SignupValidation, LoginValidation };

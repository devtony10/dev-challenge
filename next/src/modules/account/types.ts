export interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
}

export interface FormData {
  rsaPin: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

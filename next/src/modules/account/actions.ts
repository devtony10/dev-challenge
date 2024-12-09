"use server";

import { createUser, getToken, User, getUser } from "@lib/data";
import { error } from "console";

export async function signUp(_currentState: unknown, formData: FormData) {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  } as User

  try {
    await createUser(user);
    await getToken({ email: user.email, password: user.password});
  } catch (err: any) {
    return err.toString()
  }  
}

export async function logUserIn(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await getToken({ email, password });
  } catch (error: any) {
    return error.toString()
  }
}

export async function getActiveUser() {
  try {
    return await getUser();
  } catch (error: any) {
    throw new Error(error.toString());
  }
}
import axios from "axios";
import { cookies } from "next/headers";

// Define the User type and response interfaces
export interface User {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
}

const NEST_BACKEND_URL = "http://localhost:3000";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function createUser(data: User): Promise<void> {
  try {
    const response = await axios.post(
      `${NEST_BACKEND_URL}/authentication/sign-up`,
      data
    );
    console.log(response.data);
  } catch (error: unknown) {
    if (isError(error)) {
      throw new Error(`Error creating user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating user.");
    }
  }
}

export async function authenticate(): Promise<AuthResponse> {
  const cookieStore = await cookies(); // Await the cookies() promise
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("You are not logged in.");
  }

  try {
    const response = await axios.post<AuthResponse>(
      `${NEST_BACKEND_URL}/authentication/refresh-tokens`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // if (accessToken) cookieStore.set("accessToken", accessToken, {});
    // if (newRefreshToken) cookieStore.set("refreshToken", newRefreshToken, {});

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error: unknown) {
    if (isError(error)) {
      throw new Error(`Error during authentication: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during authentication.");
    }
  }
}

export async function getToken(credentials: User): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>(
      `${NEST_BACKEND_URL}/authentication/sign-in`,
      credentials
    );

    const { accessToken, refreshToken } = response.data;

    const cookieStore = await cookies(); // Await the cookies() promise
    if (accessToken) cookieStore.set("accessToken", accessToken, {});
    if (refreshToken) cookieStore.set("refreshToken", refreshToken, {});

    return { accessToken, refreshToken };
  } catch (error: unknown) {
    if (isError(error)) {
      throw new Error(`Error signing in: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during sign-in.");
    }
  }
}

export async function getUser(): Promise<UserResponse> {
  try {
    const authData = await authenticate();
    if (!authData.refreshToken) {
      throw new Error("Failed to authenticate user.");
    }

    const { refreshToken } = authData;
    const response = await axios.get<UserResponse>(
      `${NEST_BACKEND_URL}/authentication/active-user`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // const cookieStore = await cookies(); // Await the cookies() promise
    // if (refreshToken) cookieStore.set("refreshToken", refreshToken, {});

    console.log({ refreshToken });
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (isError(error)) {
      throw new Error(`Error fetching user data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching user data.");
    }
  }
}

import axios, { AxiosResponse } from "axios";
import { LOGIN_URL, REGISTER_URL } from "../constants/Api";
import { User, UserForRegister } from "../constants/Interfaces";

export type LoginResponse = { user: User; token: string };

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const {
      data,
    }: AxiosResponse<{
      user: User;
      token: string;
    }> = await axios.post(LOGIN_URL, {
      email,
      password,
    });
    const { user, token } = data;
    return { user, token };
  } catch (error) {
    throw `${error}`;
  }
};

export const postRegistration = async (
  userForRegister: UserForRegister
): Promise<LoginResponse> => {
  try {
    const {
      data,
    }: AxiosResponse<{
      user: User;
      token: string;
    }> = await axios.post(REGISTER_URL, userForRegister);
    const { user, token } = data;
    return { user, token };
  } catch (error) {
    throw `${error}`;
  }
};

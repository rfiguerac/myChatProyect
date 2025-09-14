import { usersRepo } from "@/api/firebase/repository/usersRepository";
import type { User } from "firebase/auth";

export const usersService = (userRepo = usersRepo) => {
  const getUserByEmail = async (email: string) => {
    return userRepo.getUserByEmail(email);
  };

  const upsertUser = async (user: User) => {
    return userRepo.upsertUser(user);
  };

  return {
    getUserByEmail,
    upsertUser,
  };
};

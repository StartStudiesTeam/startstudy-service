import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string, hashNumber: number) => {
  const hashedPassword = await bcrypt.hash(password, hashNumber);
  return hashedPassword;
};


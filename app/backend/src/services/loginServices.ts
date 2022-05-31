import Users from '../database/models/Users';

const emailUser = async (email: string) => {
  const result = await Users.findOne({
    where: {
      email,
    },
  });

  return result;
};

const login = async (email: string) => {
  const users = await emailUser(email);

  if (!users) return false;

  const user = {
    id: users.id,
    username: users.username,
    role: users.role,
    email: users.email,
  };

  return user;
};

export { emailUser, login };

import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  const users = req.users?.getUsers();

  res.send({
    number: users?.length,
    users: users?.map((user) => user.id),
  });
};

export { getUsers };

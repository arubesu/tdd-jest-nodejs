import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const exists = await User.findOne({
      where: {
        email,
      },
    });

    if (exists) {
      return res
        .status(400)
        .json({ error: 'This email is already registered' });
    }

    const user = await User.create(req.body);

    return res.status(201).json(user);
  }
}

export default new UserController();

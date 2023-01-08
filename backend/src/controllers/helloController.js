import { helloService } from '../services';

export const helloController = {
  async get(req, res) {
    const data = await helloService.getHelloWorld();

    res.status(200).json(data);
  },
};

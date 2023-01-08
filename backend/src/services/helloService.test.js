import { helloService } from './helloService';

test('getHelloWorld', async () => {
  const result = await helloService.getHelloWorld();

  expect(result.message).toEqual('Hello World!');
});

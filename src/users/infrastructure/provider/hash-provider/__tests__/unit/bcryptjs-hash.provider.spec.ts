import { BcryptjsHashProvider } from "../../bcryptjs-hash.provider"

describe('BcrypthashProvider unit test', () => {

  let sut: BcryptjsHashProvider;

  beforeEach(() => {
    sut = new BcryptjsHashProvider();
  })

  it('should return a encrypted hash', async () => {
    const password = 'Pass123'
    const hash = await sut.generateHash(password);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
  })

  it('should return false with invalid password', async () => {
    const password = 'Pass123'
    const hash = await sut.generateHash(password);
    const isValid = await sut.compareHash('hash', hash);
    expect(isValid).toBe(false);
  })

  it('should return true with valid password', async () => {
    const password = 'Pass123'
    const hash = await sut.generateHash(password);
    const isValid = await sut.compareHash('Pass123', hash);
    expect(isValid).toBe(true);
  })
})

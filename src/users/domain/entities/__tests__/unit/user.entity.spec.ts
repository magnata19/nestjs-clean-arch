import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity unit test', () => {

  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    UserEntity.validate = jest.fn();
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  })
  it('Constructor Method', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  })

  it('Setter name field', () => {
    sut['name'] = 'Davidson'
    expect(sut.props.name).toEqual("Davidson")
    expect(typeof sut.props.name).toBe("string");
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string')
  })

  it("Getter of password field", () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  })

  it("Setter of password field", () => {
    sut['setPassword'] = 'novasenha'
    expect(sut.props.password).toEqual("novasenha")
    expect(typeof sut.props.password).toBe("string")
  })

  it("Getter of createdAt field", () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it("Should update the name field", () => {
    sut.updateName("Davidson");
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.name).toEqual("Davidson")
  })

  it("Should update the password field", () => {
    sut.updatePassword("outrasenha")
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.password).toEqual("outrasenha")
  })

})

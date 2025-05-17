import exp from "node:constants";
import { UserDataBuilder } from "../../testing/helpers/user-data-builder";
import { UserRoles, UserValidator, UserValidatorFactory } from "../user-validator"
import { UserProps } from "../../entities/user.entity";

let sut: UserValidator;
let props: UserProps;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  it('Valid case for user validator class', () => {
    props = UserDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRoles(props))
  })

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters'
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), name: '' as any })
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

      isValid = sut.validate({ ...UserDataBuilder({}), name: 12 as any })
      expect(sut.errors['name']).toStrictEqual(['name must be a string', 'name must be shorter than or equal to 255 characters']);

      isValid = sut.validate({ ...UserDataBuilder({}), name: 'a'.repeat(256) })
      expect(sut.errors['name']).toStrictEqual(['name must be shorter than or equal to 255 characters'])
    })

    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null)
      console.log(sut.errors['email']);
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        'email must be shorter than or equal to 255 characters'
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), email: '' as any })
      expect(sut.errors['email']).toStrictEqual(['email must be an email', 'email should not be empty']);

      isValid = sut.validate({ ...UserDataBuilder({}), email: 12 as any })
      expect(sut.errors['email']).toStrictEqual(['email must be an email', 'email must be a string', 'email must be shorter than or equal to 255 characters']);

      isValid = sut.validate({ ...UserDataBuilder({}), email: 'a'.repeat(256) })
      expect(sut.errors['email']).toStrictEqual(['email must be an email', 'email must be shorter than or equal to 255 characters'])
    })

    it('Invalidation cases for password field', () => {
      let isValid = sut.validate(null);
      console.log(sut.errors['password'])
      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters'
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), password: '' });
      expect(sut.errors['password']).toStrictEqual(['password should not be empty'])

      isValid = sut.validate({ ...UserDataBuilder({}), password: 10 as any });
      expect(sut.errors['password']).toStrictEqual([
        'password must be a string',
        'password must be shorter than or equal to 100 characters'
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), password: 'a'.repeat(110) });
      expect(sut.errors['password']).toStrictEqual([
        'password must be shorter than or equal to 100 characters'
      ])
    })

    it('Invalidation cases for createdAt field', () => {
      let isValid = sut.validate({ ...props, createdAt: 10 as any });
      expect(isValid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual(['createdAt must be a Date instance']);

      isValid = sut.validate({ ...props, createdAt: '2023' as any });
      expect(isValid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual(['createdAt must be a Date instance']);
    })
  })
})

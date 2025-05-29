import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/shared/errors/validation-error"

describe('UserEntity integration test', () => {
  describe('Contructor method', () => {
    it('should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: ''
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256)
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 10 as any
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: ''
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256)
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: ''
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101)
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('should throw an error when creating a user with invalid createdAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2025' as any
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('should a valid user', () => {
      expect.assertions(0); // com 1 falha por que nao gera nenhum erro
      let props: UserProps = {
        ...UserDataBuilder({})
      }
      new UserEntity(props);
    })
  })

  describe('Update name method', () => {
    it('should throw an error when update a user with invalid name', () => {
      let entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.updateName(null)).toThrow(EntityValidationError)
      expect(() => entity.updateName('')).toThrow(EntityValidationError)
      expect(() => entity.updateName('a'.repeat(256))).toThrow(EntityValidationError)
      expect(() => entity.updateName(25 as any)).toThrow(EntityValidationError)
    })

    it('should a valid user', () => {
      expect.assertions(0);
      const entity = new UserEntity(UserDataBuilder({}));
      entity.updateName('Davidson');
    })
  })

  describe('Update password method', () => {
    it('should invalid a user using password field', () => {
      let entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.updatePassword(null)).toThrow(EntityValidationError)
      expect(() => entity.updatePassword('')).toThrow(EntityValidationError)
      expect(() => entity.updatePassword('a'.repeat(101))).toThrow(EntityValidationError)
      expect(() => entity.updatePassword(25 as any)).toThrow(EntityValidationError)
    })

    it('should a valid user', () => {
      expect.assertions(0);
      const entity = new UserEntity(UserDataBuilder({}));
      entity.updatePassword('Davidson');
    })
  })
})

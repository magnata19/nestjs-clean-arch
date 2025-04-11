import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubType = {
  prop1: string,
  prop2: number
}

class StubEntity extends Entity<StubType> {

}

describe('Entity unit tests', () => {
  let props;
  let entity;
  let id;

  beforeEach(() => {
    props = {
      prop1: 'value',
      prop2: 8
    }
    id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    entity = new StubEntity(props, id);
  })

  it('Should set props and id', () => {
    expect(entity.props).toStrictEqual(props);
    expect(entity.getId).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  })

  it("Should accept uuid", () => {
    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id);
  })


  it("Should convert a entity to Json", () => {
    expect(entity.toJSON()).toStrictEqual({
      id, ...props
    })
  })
})

export type FieldsErrors = {
  [field: string]: string[] // nome / 'nao pode ser nulo', 'precisa ter no minimo 5 caractere'
}

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}

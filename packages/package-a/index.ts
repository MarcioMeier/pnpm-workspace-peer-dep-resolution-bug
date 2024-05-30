import z from 'zod';

export const schemaValidatorBuilder = (schema: z.ZodSchema) => (data: any) => {
  return schema.parse(data);
};

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const user: any = {
  name: 'John',
  age: 30,
};

const result = schemaValidatorBuilder(schema)(user);
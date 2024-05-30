
import z from 'zod';
import { schemaValidatorBuilder } from 'package-a';

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const user: any = {
  name: 'John',
  age: 30,
};

const result = schemaValidatorBuilder(schema)(user);
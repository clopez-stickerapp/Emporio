import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type, type Static } from '@sinclair/typebox';

const EnvSchema = Type.Object({
  API_URL: Type.Optional(Type.String({ default: 'http://localhost:5012' })),
});

type Env = Static<typeof EnvSchema>;

const validate = TypeCompiler.Compile(EnvSchema);

let _target: Env;

export const env = new Proxy({} as Env, {
  get(_, prop: keyof Env) {
    if (!_target) {
      _target = Object.entries(EnvSchema.properties).reduce((res, [key, val]) => {
        return { ...res, [key]: process.env[key] || val?.default };
      }, {} as Env);
    }

    const value = _target[prop] || EnvSchema.properties[prop]?.default;
    if (!value) {
      throw new Error(`Missing environment variable: ${String(prop)}`);
    }

    if (!validate.Check(_target)) {
      console.log([...validate.Errors(_target)]);
      throw new Error(`Invalid environment variable: ${String(prop)}`);
    }
    return value;
  },
});

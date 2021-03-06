import * as t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import { HttpError } from '../types/Directus';
import { formatValidationErrors } from 'io-ts-reporters';
import { pipe } from 'fp-ts/lib/pipeable';

export const toAuthError = (
  error: Error | { message: string, code: number, success: boolean }
) => error instanceof Error
  ? Promise.reject({
    message: error.message,
    code: 0,
    success: false,
  })
  : Promise.reject(error);

export const setHttpError = (errors: t.ValidationError[]) => new HttpError(failure(errors).join(', '));

//function to decode an unknown into an A
export const decodeWith = <A>(decoder: t.Decoder<unknown, A>) => (data: unknown) => pipe(
  decoder.decode(data),
  E.mapLeft(formatValidationErrors),
  E.mapLeft(errors => new HttpError(errors.join(', '))),
  TE.fromEither
);
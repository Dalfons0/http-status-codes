import {
  statusCodeToReasonPhrase,
  reasonPhraseToStatusCode,
} from './utils';

const checkResult = <T>(result: T, message: string): T => {
  if (!result) {
    throw new Error(message);
  }

  return result;
}

/**
 * Returns the reason phrase for the given status code.
 * If the given status code does not exist, an error is thrown if the flag throwWhenMissing is set up to true,
 * otherwise return undefined.
 *
 * @param {number|string} statusCode The HTTP status code
 * @param {boolean} [throwWhenMissing=true] Flag to indicate that an error should be thrown if the status code provided is missing 
 * @returns {string} The associated reason phrase (e.g. "Bad Request", "OK")
 * */
export function getReasonPhrase(statusCode: (number | string), throwWhenMissing = true): (string) {
  const result = statusCodeToReasonPhrase[statusCode.toString()];

  return throwWhenMissing ? checkResult(result, `Status code does not exist: ${statusCode}`) : result;
}

/**
 * Returns the status code for the given reason phrase.
 * If the given reason phrase does not exist, an error is thrown if the flag throwWhenMissing is set up to true,
 * otherwise return undefined.
 *
 * @param {string} reasonPhrase The HTTP reason phrase (e.g. "Bad Request", "OK")
 * @param {boolean} [throwWhenMissing=true] Flag to indicate that an error should be thrown if the reason phrase is missing
 * @returns {string} The associated status code
 * */
export function getStatusCode(reasonPhrase: string, throwWhenMissing = true): (number) {
  const result = reasonPhraseToStatusCode[reasonPhrase];

  return throwWhenMissing ? checkResult(result, `Reason phrase does not exist: ${reasonPhrase}`) : result;
}

/**
 * @deprecated
 *
 * Returns the reason phrase for the given status code.
 * If the given status code does not exist, undefined is returned.
 *
 * Deprecated in favor of getReasonPhrase
 *
 * @param {number|string} statusCode The HTTP status code
 * @returns {string|undefined} The associated reason phrase (e.g. "Bad Request", "OK")
 * */
export const getStatusText = getReasonPhrase;

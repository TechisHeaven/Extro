import { ResultError } from "@/types/types/types.error";

export function CreateError(status: number, message: string): ResultError {
  throw {
    message: message,
    status: status,
    ok: false,
  };
}

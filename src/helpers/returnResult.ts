interface resultReturn<T> {
  message: string;
  result?: T;
  status: number;
  ok: boolean;
}
export function ReturnResultProps<T>(
  status: number,
  message: string
): resultReturn<T> {
  return {
    message: message,
    status: status,
    ok: true,
  };
}

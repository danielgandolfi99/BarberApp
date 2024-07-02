interface FormatPhoneProps {
  phone: string;
}

function formatPhone({ phone }: FormatPhoneProps): string {
  if (phone) {
    if (phone?.length === 8) {
      return `${phone.slice(0, 4)}-${phone.slice(4, 8)}`;
    }
    if (phone?.length === 9) {
      return `${phone.slice(0, 1)} ${phone.slice(1, 5)}-${phone.slice(5, 9)}`;
    }
    if (phone?.length > 9) {
      if (phone.length === 10) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(
          6,
          10
        )}`;
      }
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(
        3,
        7
      )}-${phone.slice(7, 11)}`;
    }
    return phone;
  }
  return phone;
}

export { formatPhone };

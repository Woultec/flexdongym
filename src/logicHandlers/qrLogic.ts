export type QrResult = {
  error?: string;
  value?: string;
};

export function generateQrValue(
  firstName: string,
  lastName: string,
  age: string
): QrResult {
  if (!firstName || !lastName || Number(age) <= 0) {
    return { error: "Complete All Fields" };
  }

  if (
    !firstName.trim() ||
    !lastName.trim() ||
    firstName.includes(" ") ||
    lastName.includes(" ")
  ) {
    return { error: "Invalid input, try again" };
  }

  return {
    value: `000001DonGym${firstName}${lastName}${age}`,
  };
}

// your existing logic here

export {};

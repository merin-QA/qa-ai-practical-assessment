export function replaceTimestamp(template: string): string {
  return template.replace('{{timestamp}}', String(Date.now()));
}

/** Maps test-data field labels to text shown on the registration form. */
export function resolveRegistrationFieldLabel(field: string): string {
  const aliases: Record<string, string> = {
    DOB: 'Date of Birth',
    Email: 'Email address',
  };
  return aliases[field] ?? field;
}

/** Maps test-data country labels to option text on the registration form. */
export function resolveCountryOptionLabel(country: string): string {
  if (country === 'United States') {
    return 'United States of America (the)';
  }
  return country;
}

/** Generates a unique password that satisfies registration rules and avoids leak detection. */
export function uniqueRegistrationPassword(): string {
  return `QaTest@${Date.now()}!`;
}

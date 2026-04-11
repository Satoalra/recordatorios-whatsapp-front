/**
 * Builds a URL query string from an object of parameters
 * @param params - Object with parameter key-value pairs
 * @returns URLSearchParams string
 */
export const buildQueryParams = (
  params: Record<string, string | number | boolean | string[] | undefined>,
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(","));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};

export function parseDate(value) {

  if (!value) return null;

  const isoPattern =
    /^\d{4}-\d{2}-\d{2}$/;

  const euPattern =
    /^\d{2}\/\d{2}\/\d{4}$/;

  let date;

  if (isoPattern.test(value)) {

    date = new Date(value);

  } else if (euPattern.test(value)) {

    const [day, month, year] =
      value.split("/");

    date = new Date(
      `${year}-${month}-${day}`
    );

  } else {

    return null;
  }

  return Number.isNaN(date.getTime())
    ? null
    : date;
}
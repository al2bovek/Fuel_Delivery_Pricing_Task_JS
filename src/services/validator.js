import { ERROR_CODES }
  from "../constants/errorCodes.js";

import { parseDate }
  from "../utils/dateUtils.js";

const TYPES = [
  "GASOLINE",
  "DIESEL",
  "LPG",
];

const CLIENTS = [
  "PRIVATE",
  "EXEMPT",
];

export function validateShipment(
  shipment,
  seenIds
) {

  const requiredFields = [
    "id",
    "type",
    "client",
    "date",
    "volume",
    "distance",
    "basePrice",
  ];

  for (const field of requiredFields) {

    if (
      shipment[field] === undefined ||
      shipment[field] === null
    ) {
      return ERROR_CODES.MISSING_FIELD;
    }
  }

  if (
    seenIds.has(shipment.id)
  ) {
    return ERROR_CODES.DUPLICATE_ID;
  }

  const type =
    shipment.type
      .trim()
      .toUpperCase();

  if (!TYPES.includes(type)) {

    return ERROR_CODES.UNKNOWN_TYPE;
  }

  const client =
    shipment.client
      .trim()
      .toUpperCase();

  if (
    !CLIENTS.includes(client)
  ) {
    return ERROR_CODES.UNKNOWN_CLIENT;
  }

  if (
    !parseDate(shipment.date)
  ) {
    return ERROR_CODES.INVALID_DATE;
  }

  if (
    shipment.volume <= 0 ||
    shipment.distance < 0 ||
    shipment.basePrice < 0
  ) {
    return ERROR_CODES.INVALID_VALUE;
  }

  return null;
}
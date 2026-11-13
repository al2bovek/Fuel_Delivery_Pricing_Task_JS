import Decimal from "decimal.js";

Decimal.set({
  rounding: Decimal.ROUND_HALF_UP,
});

export function money(value) {
  return new Decimal(value)
    .toDecimalPlaces(2);
}

export default Decimal;
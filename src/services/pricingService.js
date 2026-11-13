import Decimal,
{
  money,
}
from "../utils/decimalUtils.js";

import { parseDate }
  from "../utils/dateUtils.js";

import { RATES }
  from "../config/rates.js";

export function calculateShipment(
  shipment,
  options = {}
) {

  const volume =
    new Decimal(
      shipment.volume
    );

  const basePrice =
    new Decimal(
      shipment.basePrice
    );

  const distance =
    new Decimal(
      shipment.distance
    );

  let discount = 0;

  if (
    volume.gt(
      RATES.DISCOUNT_10_LIMIT
    )
  ) {

    discount =
      RATES.DISCOUNT_10;

  } else if (
    volume.gt(
      RATES.DISCOUNT_5_LIMIT
    )
  ) {

    discount =
      RATES.DISCOUNT_5;
  }

  const netFuelPrice =
    money(
      volume
        .mul(basePrice)
        .mul(1 - discount)
    );

  let logisticsCost =
    money(
      distance.mul(
        RATES.DELIVERY_PRICE_PER_KM
      )
    );

  if (
    volume.lt(
      RATES.SMALL_LOAD_LIMIT
    )
  ) {

    logisticsCost =
      money(
        logisticsCost.plus(
          RATES.SMALL_LOAD_FEE
        )
      );
  }

  const fuelType =
    shipment.type
      .trim()
      .toUpperCase();

  let exciseRate =
    RATES.EXCISE[fuelType];

  if (
    fuelType === "GASOLINE" &&
    options.customGasolineExcise !== undefined
  ) {

    exciseRate =
      options.customGasolineExcise;
  }

  const excise =
    money(
      volume.mul(exciseRate)
    );

  const date =
    parseDate(
      shipment.date
    );

  let vatRate = 0;

  const client =
    shipment.client
      .trim()
      .toUpperCase();

  if (
    client === "PRIVATE"
  ) {

    if (
      options.customVatRate !== undefined
    ) {

      vatRate =
        options.customVatRate / 100;

    } else {

      vatRate =
        date <
        new Date("2024-01-01")
          ? RATES.VAT_PRIVATE_BEFORE_2024
          : RATES.VAT_PRIVATE_AFTER_2024;
    }
  }

  const vat =
    money(
      netFuelPrice
        .plus(logisticsCost)
        .plus(excise)
        .mul(vatRate)
    );

  const totalTax =
    money(
      excise.plus(vat)
    );

  const grandTotal =
    money(
      netFuelPrice
        .plus(logisticsCost)
        .plus(totalTax)
    );

  return {
    id: shipment.id,
    netFuelPrice,
    logisticsCost,
    vat,
    totalTax,
    grandTotal,
  };
}
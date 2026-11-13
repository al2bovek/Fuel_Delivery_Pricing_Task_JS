import { writeCsv }
  from "./csvWriter.js";

import { APP_CONFIG }
  from "../config/appConfig.js";

const PRICE_HEADER =
  "ShipmentID,NetFuelPrice,LogisticsCost,TotalTax,GrandTotal";

export async function writePriceReport(
  fileName,
  results
) {

  const rows = results.map(
    result =>
      [
        result.id,
        result.netFuelPrice,
        result.logisticsCost,
        result.totalTax,
        result.grandTotal,
      ].join(",")
  );

  await writeCsv(
    `output/${fileName}`,
    APP_CONFIG.AUTHOR,
    PRICE_HEADER,
    rows
  );
}

export async function writeErrorsReport(
  errors
) {

  await writeCsv(
    "output/errors.csv",
    APP_CONFIG.AUTHOR,
    "ShipmentID,ErrorCode",
    errors
  );
}
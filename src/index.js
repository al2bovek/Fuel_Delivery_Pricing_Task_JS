import fs from "fs/promises";

import { readJson }
  from "./readers/jsonReader.js";

import { validateShipment }
  from "./services/validator.js";

import { calculateShipment }
  from "./services/pricingService.js";

import {
  writePriceReport,
  writeErrorsReport,
}
from "./utils/reportWriter.js";

import {
  readPositiveNumber,
  closeInput,
}
from "./utils/inputReader.js";

async function runTask1(
  shipments
) {

  const seenIds =
    new Set();

  const validShipments = [];

  const results = [];

  const errors = [];

  for (const shipment of shipments) {

    const error =
      validateShipment(
        shipment,
        seenIds
      );

    seenIds.add(
      shipment.id
    );

    if (error) {

      errors.push(
        `${shipment.id ?? ""},${error}`
      );

      continue;
    }

    validShipments.push(
      shipment
    );

    results.push(
      calculateShipment(
        shipment
      )
    );
  }

  await writePriceReport(
    "task1.csv",
    results
  );

  await writeErrorsReport(
    errors
  );

  return {
    validShipments,
    task1Results: results,
  };
}

async function runTask2(
  validShipments
) {

  const customVatRate =
    await readPositiveNumber(
      "Enter custom VAT rate for Private clients (%): "
    );

  const customGasolineExcise =
    await readPositiveNumber(
      "Enter custom Excise rate for Gasoline: "
    );

  const results =
    validShipments.map(
      shipment =>
        calculateShipment(
          shipment,
          {
            customVatRate,
            customGasolineExcise,
          }
        )
    );

  await writePriceReport(
    "task2.csv",
    results
  );

  return results;
}

async function main() {

  await fs.mkdir(
    "output",
    { recursive: true }
  );

  const shipments =
    await readJson(
      "shipments.json"
    );

  const {
    validShipments,
  } = await runTask1(
    shipments
  );

  await runTask2(
    validShipments
  );

  closeInput();

  console.log(
    "Completed."
  );
}

main().catch(error => {

  console.error(error);

  process.exit(1);
});
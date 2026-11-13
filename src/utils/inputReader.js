import readline from "readline";

const rl =
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

function ask(question) {

  return new Promise(resolve =>
    rl.question(question, resolve)
  );
}

export async function readPositiveNumber(
  question
) {
  while (true) {

    const answer =
      await ask(question);

    const value =
      Number(answer);

    if (
      !Number.isNaN(value) &&
      value >= 0
    ) {
      return value;
    }

    console.log(
      "Invalid value. Try again."
    );
  }
}

export function closeInput() {
  rl.close();
}
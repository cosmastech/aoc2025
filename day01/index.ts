const FILE_PATH: string = "puzzle_input.txt";
const USE_SAMPLE = false;
const SAMPLE_TEXT = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

async function getInput(): Promise<number[]> {
  let str: string = "";
  if (USE_SAMPLE) {
    str = SAMPLE_TEXT;
  } else {
    str = await Bun.file(FILE_PATH).text();
  }

  str = str.replaceAll("L", "-").replaceAll("R", "+");

  const lines: string[] = str.split("\n");
  return lines.map((value) => parseInt(value, 10));
}

function processInput(input: number[]): number {
  console.log(input);
  let timesAtZero = 0;
  let currentPosition = 50;

  input.forEach(function (toMove: number) {
    toMove = toMove % 100;
    currentPosition += toMove;
    if (currentPosition >= 100) {
      currentPosition -= 100;
    } else if (currentPosition < 0) {
      currentPosition = 100 + currentPosition;
    }
    if (currentPosition === 0) {
      timesAtZero++;
    }
  });

  return timesAtZero;
}

const input = await getInput();
console.log("times at zero: " + processInput(input));

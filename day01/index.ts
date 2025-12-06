const FILE_PATH: string = "puzzle_input.txt";
const USE_SAMPLE = true;
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
  return lines
    .filter((value) => value !== "")
    .map((value) => parseInt(value, 10));
}

function processInputPart1(input: number[]): number {
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
function processInputPart2(input: number[]): number {
  let timesPassingZero: number = 0;
  let currentPosition = 50;

  input.forEach(function (toMove: number) {
    let temp = Math.floor(Math.abs(toMove) / 100);
    console.log(`toMove: ${toMove} temp: ${temp}`);
    timesPassingZero += temp;
    toMove = toMove % 100;
    currentPosition += toMove;
    if (currentPosition >= 100) {
      timesPassingZero++;
      currentPosition -= 100;
    } else if (currentPosition < 0) {
      currentPosition = 100 + currentPosition;
      timesPassingZero++;
    }
    if (currentPosition === 0) {
      //timesPassingZero++;
    }
  });

  console.log("Final position: " + currentPosition);
  return timesPassingZero;
}

const input = await getInput();
//console.log("times at zero part1: " + processInputPart1(input));
console.log("times passing zero: " + processInputPart2(input));

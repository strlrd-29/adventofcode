function isSortedAsc(arr: number[]) {
  return Array.from({ length: arr.length - 1 }, (_, i) => i).every(
    (i) => arr[i] < arr[i + 1],
  );
}

function isSortedDesc(arr: number[]) {
  return Array.from({ length: arr.length - 1 }, (_, i) => i).every(
    (i) => arr[i + 1] < arr[i],
  );
}

function isSafe(arr: number[]) {
  if (isSortedAsc(arr) || isSortedDesc(arr)) {
    return arr.every((el, idx) => {
      if (idx === 0) return true;
      const diff = Math.abs(el - arr[idx - 1]);

      return diff >= 1 && diff <= 3;
    });
  }
  return false;
}

function aocd02p02(text: string) {
  const reports = text
    .trim()
    .split("\n")
    .map((v) => v.split(/\s+/).map((e) => parseInt(e)));

  let safeReports = 0;

  reports.forEach((report) => {
    const possibleArrays: number[][] = [];
    report.forEach((_, idx) => {
      possibleArrays.push(report.toSpliced(idx, 1));
    });
    if (!possibleArrays.every((arr) => !isSafe(arr))) safeReports++;
  });

  return safeReports;
}

const file = Bun.file("./2024/02/input.txt");
const text = await file.text();

const safeReports = aocd02p02(text);

console.info(safeReports);

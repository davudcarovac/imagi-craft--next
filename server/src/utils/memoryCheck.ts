export function logMemory() {
  const used = process.memoryUsage();
  console.log("Memory usage:");
  for (let key in used) {
    console.log(
      `${key}: ${(used[key as keyof typeof used] / 1024 / 1024).toFixed(2)} MB`
    );
  }
}

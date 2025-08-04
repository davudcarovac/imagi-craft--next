export function logMemory(label) {
    const used = process.memoryUsage();
    console.log(`--- ${label} ---`);
    for (const key in used) {
        const val = used[key];
        console.log(`${key}: ${(val / 1024 / 1024).toFixed(2)} MB`);
    }
}

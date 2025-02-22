export function calculateCpuUsage(startTime: number, endTime: number, startUsage: NodeJS.CpuUsage, endUsage: NodeJS.CpuUsage): number {
    const totalTime = endTime - startTime;
    const totalUsage = (endUsage.user + endUsage.system) - (startUsage.user + startUsage.system);
    return (totalUsage / totalTime) * 100; // Returns CPU usage as a percentage
}

export function calculateMemoryUsage(initialMemory: NodeJS.MemoryUsage, finalMemory: NodeJS.MemoryUsage): number {
    const usedMemory = finalMemory.heapUsed - initialMemory.heapUsed;
    return usedMemory / 1024 / 1024; // Returns memory usage in MB
}

export function performComplexOperation(data: any[]): any {
    // Simulate a complex operation that incurs CPU and RAM usage
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        result += data[i].value; // Assuming data has a 'value' property
    }
    return result;
}
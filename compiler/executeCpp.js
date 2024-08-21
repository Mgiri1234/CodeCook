import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split('.')[0];
  const outPath = path.join(outputPath, `${jobId}.o`);

  return new Promise((resolve, reject) => {
    const startTime = process.hrtime.bigint(); // Start time
    exec(
      `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && ./"${jobId}.o" < "${inputPath}"`,
      (error, stdout, stderr) => {
        
        if (error) {
          resolve({stderr });
        } else {
          const endTime = process.hrtime.bigint(); // End time
          const timeUsed = Number(endTime - startTime) / 1e6; // Convert to milliseconds
          const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to megabytes
          resolve({ stdout, timeUsed, memoryUsed });
        }
      }
    );
  });
};

export default executeCpp;
import {
  downAll,
  logs,
  ps,
  upAll,
  type IDockerComposeOptions,
} from "docker-compose";
import path from "path";
import { execSync } from "child_process";

const composeFilePath = path.resolve(__dirname, "container");

// Check if docker is available in PATH or at the specified path
function checkDockerAvailability(customDockerPath?: string): string | null {
  try {
    if (customDockerPath) {
      // Test if the provided custom path works
      execSync(`"${customDockerPath}" --version`, { stdio: "ignore" });
      return customDockerPath;
    } else {
      // Try to find docker in PATH
      const dockerPath = execSync("which docker", {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim();
      return dockerPath || null;
    }
  } catch (error) {
    // If the command fails, it means docker is not available
    console.error(
      "Docker executable not found in PATH or at the specified path.",
    );
    console.error(
      "Please ensure Docker is installed and in your PATH, or provide the full path to the Docker executable.",
    );
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

export const LOCAL_TESTNET_API: string = "http://localhost:8380/v1";

export async function testnetUp(dockerPath?: string): Promise<boolean> {
  const foundDockerPath = checkDockerAvailability(dockerPath);

  if (!foundDockerPath) {
    throw new Error(
      "Docker executable not found. Please ensure Docker is installed and in your PATH, " +
        "or provide the full path to the Docker executable as a parameter.",
    );
  }

  const options: IDockerComposeOptions = {
    cwd: composeFilePath,
    executable: {
      executablePath: foundDockerPath,
    },
    // NOTE: enable to debug all docker compose output and container logs
    // log: true,
  };

  try {
    await upAll(options);

    const targetString = "QCReady";
    console.log("waiting for logs");
    while (true) {
      const logOutput = await logs("alice", options);

      if (logOutput.out.includes(targetString)) {
        console.log("testnet started, proceeding...");
        break; // Exit the loop when the message is found
      }

      if (logOutput.out.includes("exited with code")) {
        console.log(`last logs: ${logOutput.out}`);
        throw new Error("containers exited with non zero code!");
      }

      const runs = await isComposeRunning(composeFilePath, foundDockerPath);
      if (!runs) {
        console.log(`last logs: ${logOutput.out}`);

        throw new Error("containers are not running!");
      }
      // check logs every second
      await new Promise((resolve) => setTimeout(resolve, 1_000));
    }
    return true;
  } catch (error) {
    console.error("Failed to start testnet:", error);
    throw error;
  }
}

export async function testnetDown(dockerPath?: string) {
  const foundDockerPath = checkDockerAvailability(dockerPath);

  if (!foundDockerPath) {
    console.warn(
      "Docker executable not found. Unable to shut down testnet containers.",
    );
    return;
  }

  const options: IDockerComposeOptions = {
    cwd: composeFilePath,
    executable: {
      executablePath: foundDockerPath,
    },
  };

  await downAll(options);
}

async function isComposeRunning(
  composePath: string,
  dockerPath: string,
): Promise<boolean> {
  try {
    const result = await ps({
      cwd: composePath,
      commandOptions: [["--format", "json"]],
      executable: {
        executablePath: dockerPath,
      },
    });
    if (!result || result.data.services.length == 0) {
      console.error("[ERROR] no containers running");
      return false;
    }
    for (const service of result.data.services) {
      if (service.state != "running") {
        console.error(`[ERROR] service ${service.name} is not running`);
        return false;
      }
    }
  } catch (error) {
    console.error("[ERROR] could not run docker-compose ps:", error);
    return false;
  }
  return true;
}

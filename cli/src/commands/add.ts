import axios from "axios";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora, { Ora } from "ora";
import { execSync } from "child_process";
import {
  extractDependenciesFromFiles,
  getDependencySummary,
} from "../utils/dependency-extractor";

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

function detectPackageManager(): PackageManager {
  // Check for lock files in order of preference
  if (fs.existsSync("bun.lockb")) return "bun";
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  if (fs.existsSync("package-lock.json")) return "npm";

  // Fallback: check which package manager is available
  const managers: PackageManager[] = ["bun", "pnpm", "yarn", "npm"];
  for (const manager of managers) {
    try {
      execSync(`${manager} --version`, { stdio: "pipe" });
      return manager;
    } catch {
      continue;
    }
  }

  // Default fallback
  return "npm";
}

function getInstallCommand(packageManager: PackageManager): string {
  const commands = {
    npm: "npm install",
    yarn: "yarn add",
    pnpm: "pnpm add",
    bun: "bun add",
  };
  return commands[packageManager];
}

function getShadcnCommand(packageManager: PackageManager): string {
  const commands = {
    npm: "npx shadcn@latest add",
    yarn: "yarn dlx shadcn@latest add",
    pnpm: "pnpm dlx shadcn@latest add",
    bun: "bunx shadcn@latest add",
  };
  return commands[packageManager];
}

interface ComponentRegistry {
  name: string;
  description: string;
  dependencies?: string[];
  files: {
    path: string;
    content: string;
    type: string;
    target: string;
  }[];
  type: string;
  registryDependencies?: string[];
}

async function installShadcnDependencies(
  dependencies: string[],
  packageManager: PackageManager,
  spinner: Ora
): Promise<void> {
  if (dependencies.length === 0) return;

  const shadcnCommand = getShadcnCommand(packageManager);

  for (const dep of dependencies) {
    try {
      spinner.text = `Installing shadcn dependency: ${dep}...`;
      execSync(`${shadcnCommand} ${dep}`, { stdio: "pipe" });
      console.log(chalk.green(`✓ Installed shadcn component: ${dep}`));
    } catch {
      console.log(
        chalk.yellow(`⚠ Warning: Failed to install ${dep} automatically`)
      );
      console.log(chalk.dim(`  You may need to run: ${shadcnCommand} ${dep}`));
    }
  }
}

async function installNpmDependencies(
  dependencies: string[],
  packageManager: PackageManager,
  spinner: Ora
): Promise<void> {
  if (dependencies.length === 0) return;

  const installCommand = getInstallCommand(packageManager);

  try {
    spinner.text = `Installing dependencies with ${packageManager}...`;
    const depsList = dependencies.join(" ");
    execSync(`${installCommand} ${depsList}`, { stdio: "pipe" });
    console.log(chalk.green(`✓ Installed packages: ${depsList}`));
  } catch {
    console.log(
      chalk.yellow(`⚠ Warning: Failed to install dependencies automatically`)
    );
    console.log(
      chalk.dim(
        `  You may need to run: ${installCommand} ${dependencies.join(" ")}`
      )
    );
  }
}

function transformToFlatStructure(
  files: { path: string; content: string; type: string; target: string }[]
): { path: string; content: string; type: string; target: string }[] {
  return files.map((file) => {
    // Transform nested structure to flat structure
    // e.g., "devvarena-ui/button/halo-button/v1/component.tsx" -> "devvarena-ui/halobutton-v1/component.tsx"
    let targetPath = file.target || file.path;

    // Extract version and component info from path
    const pathParts = targetPath.split("/");
    const devuiIndex = pathParts.findIndex((part) => part === "devvarena-ui");

    if (devuiIndex >= 0 && pathParts.length > devuiIndex + 3) {
      const componentFolder = pathParts[devuiIndex + 2]; // e.g., "halo-button"
      const version = pathParts[devuiIndex + 3]; // e.g., "v1"
      const fileName = pathParts[pathParts.length - 1]; // e.g., "component.tsx"

      // Create flat structure: componentname-version
      const flatName = componentFolder.replace("-", "") + "-" + version;
      targetPath = `devvarena-ui/${flatName}/${fileName}`;
    }

    return {
      ...file,
      target: targetPath,
    };
  });
}

export async function addComponent(
  url: string,
  options: { path?: string; packageManager?: string }
) {
  const spinner = ora("Fetching component...").start();

  try {
    // Detect or use specified package manager
    let packageManager: PackageManager;

    if (options.packageManager) {
      const validManagers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];
      if (validManagers.includes(options.packageManager as PackageManager)) {
        packageManager = options.packageManager as PackageManager;
        console.log(
          chalk.blue(`📦 Using specified package manager: ${packageManager}`)
        );
      } else {
        console.log(
          chalk.yellow(
            `⚠ Invalid package manager "${options.packageManager}". Using auto-detection...`
          )
        );
        packageManager = detectPackageManager();
        console.log(
          chalk.blue(`📦 Detected package manager: ${packageManager}`)
        );
      }
    } else {
      packageManager = detectPackageManager();
      console.log(chalk.blue(`📦 Detected package manager: ${packageManager}`));
    }

    // Fetch component registry data
    const response = await axios.get<ComponentRegistry>(url);
    const componentData = response.data;

    spinner.text = `Analyzing dependencies...`;

    // Extract dependencies from component files automatically
    const extractedDeps = extractDependenciesFromFiles(componentData.files);

    console.log(chalk.blue(`📦 Auto-detected dependencies:`));
    console.log(chalk.dim(getDependencySummary(extractedDeps)));

    // Install npm dependencies (both from registry and auto-detected)
    const allNpmDeps = [
      ...(componentData.dependencies || []),
      ...extractedDeps.npmDependencies,
    ];
    const uniqueNpmDeps = [...new Set(allNpmDeps)];

    if (uniqueNpmDeps.length > 0) {
      await installNpmDependencies(uniqueNpmDeps, packageManager, spinner);
    }

    // Install shadcn dependencies (both from registry and auto-detected)
    const allShadcnDeps = [
      ...(componentData.registryDependencies || []),
      ...extractedDeps.shadcnDependencies,
    ];
    const uniqueShadcnDeps = [...new Set(allShadcnDeps)];

    if (uniqueShadcnDeps.length > 0) {
      await installShadcnDependencies(
        uniqueShadcnDeps,
        packageManager,
        spinner
      );
    }

    const baseInstallPath = options.path || "./src";

    // Transform files to flat structure
    const transformedFiles = transformToFlatStructure(componentData.files);

    // Write component files
    const installedFiles: string[] = [];
    for (const file of transformedFiles) {
      const relativePath = file.target || file.path;
      const fullFilePath = path.join(baseInstallPath, relativePath);

      // Ensure directory exists
      await fs.ensureDir(path.dirname(fullFilePath));

      // Write file
      await fs.writeFile(fullFilePath, file.content);
      installedFiles.push(fullFilePath);
    }

    spinner.succeed(
      chalk.green(`✓ Successfully installed ${componentData.name}`)
    );

    // Show installation info
    console.log(chalk.dim(`\nFiles created:`));
    for (const filePath of installedFiles) {
      console.log(chalk.dim(`  ${filePath}`));
    }

    // Show summary of installed dependencies
    if (uniqueNpmDeps.length > 0) {
      console.log(chalk.green(`\n✓ NPM dependencies installed:`));
      console.log(chalk.dim(`  ${uniqueNpmDeps.join(", ")}`));
    }

    if (uniqueShadcnDeps.length > 0) {
      console.log(chalk.green(`\n✓ Shadcn dependencies installed:`));
      console.log(chalk.dim(`  ${uniqueShadcnDeps.join(", ")}`));
    }
  } catch (error: unknown) {
    spinner.fail(chalk.red("Failed to install component"));

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError.response?.status === 404) {
        console.error(chalk.red("Component not found at the provided URL"));
      }
    } else if (error && typeof error === "object" && "code" in error) {
      const networkError = error as { code: string };
      if (networkError.code === "ENOTFOUND") {
        console.error(chalk.red("Network error: Could not reach the registry"));
      }
    } else {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(chalk.red(`Error: ${errorMessage}`));
    }

    process.exit(1);
  }
}

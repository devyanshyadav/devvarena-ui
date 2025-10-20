#!/usr/bin/env node

import { program } from "commander";
import { addComponent } from "./commands/add";

program
  .name("devvarena-ui")
  .description("CLI for DevUI component library")
  .version("1.0.0");

program
  .command("add")
  .description("Add a component from a registry URL")
  .argument("<url>", "Component registry URL")
  .option("-p, --path <path>", "Installation path", "./src/components/ui")
  .option(
    "-pm, --package-manager <manager>",
    "Package manager to use (npm, yarn, pnpm, bun)"
  )
  .action(addComponent);

program.parse();

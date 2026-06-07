import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("Home page production safety", () => {
  it("does not link public homepage teaser cards to the private draft lab", () => {
    const source = readFileSync(join(__dirname, "Home.tsx"), "utf8");

    expect(source).not.toContain("/draft-lab");
  });
});

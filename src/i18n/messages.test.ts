import { parse, TYPE, type MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";

type Tree = { readonly [key: string]: string | Tree };

function flatten(tree: Tree, prefix = ""): Map<string, string> {
  const entries = new Map<string, string>();
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      entries.set(path, value);
    } else {
      flatten(value, path).forEach((child, childPath) => entries.set(childPath, child));
    }
  }
  return entries;
}

function collectArguments(elements: readonly MessageFormatElement[], names: Set<string>): void {
  for (const element of elements) {
    if (element.type === TYPE.literal || element.type === TYPE.pound) continue;
    names.add(element.value);
    if (element.type === TYPE.plural || element.type === TYPE.select) {
      Object.values(element.options).forEach((option) => collectArguments(option.value, names));
    }
    if (element.type === TYPE.tag) {
      collectArguments(element.children, names);
    }
  }
}

function placeholders(message: string): string[] {
  const names = new Set<string>();
  collectArguments(parse(message), names);
  return [...names].sort();
}

const frMessages = flatten(fr);
const enMessages = flatten(en);

describe("translations", () => {
  it("define the same keys in French and English", () => {
    const missingInEn = [...frMessages.keys()].filter((key) => !enMessages.has(key));
    const missingInFr = [...enMessages.keys()].filter((key) => !frMessages.has(key));
    expect({ missingInEn, missingInFr }).toEqual({ missingInEn: [], missingInFr: [] });
  });

  it("use consistent placeholders", () => {
    const mismatches = [...frMessages].filter(([key, value]) => placeholders(value).join() !== placeholders(enMessages.get(key) ?? "").join());
    expect(mismatches).toEqual([]);
  });

  it("are valid ICU messages", () => {
    const invalid = [...frMessages, ...enMessages].filter(([, value]) => {
      try {
        parse(value);
        return false;
      } catch {
        return true;
      }
    });
    expect(invalid).toEqual([]);
  });

  it("contain no empty messages", () => {
    const empty = [...frMessages, ...enMessages].filter(([, value]) => value.trim().length === 0);
    expect(empty).toEqual([]);
  });
});

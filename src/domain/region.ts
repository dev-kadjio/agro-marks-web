export const regionIds = [
  "adamawa",
  "centre",
  "east",
  "far-north",
  "littoral",
  "north",
  "north-west",
  "south",
  "south-west",
  "west",
] as const;

export type RegionId = (typeof regionIds)[number];

export interface Location {
  readonly city: string;
  readonly regionId: RegionId;
}

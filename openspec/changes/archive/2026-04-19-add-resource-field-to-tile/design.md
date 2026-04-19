## Context

The game currently defines tiles with terrain type (Plains, Forest, Mountains, Desert) but no additional resource data. Future features (tile improvements, resource trading, tech requirements) need to store resource type on individual tiles.

## Goals / Non-Goals

**Goals:**
- Add optional `resource` field to Tile type
- Maintain backward compatibility (tiles without resource default to none)
- Provide extensible enum for resource types

**Non-Goals:**
- Implement resource harvesting mechanics
- Implement tile improvement mechanics
- Add resource-specific yields (future feature)

## Decisions

**1. Resource field as optional string/enum**
Chose: `ResourceType | null` instead of optional string
Rationale: TypeScript enum provides compile-time safety and IDE autocomplete. Null distinguishes "no resource" from undefined.

**2. Resource types defined in types file**
Chose: Define `ResourceType` enum in `src/types/game.ts`
Rationale: Single source of truth for all resource types. Easy to extend.

**3. No resource generation logic yet**
Chose: Don't implement automatic resource assignment during map generation
Rationale: Future map generation will need different algorithms. Keep it simple for now.

## Risks / Trade-offs

- [Risk] Users want resource display in UI → Mitigation: Add basic visual indicator to HexTile component
- [Risk] Type changes require broader updates → Mitigation: Search for all Tile usages during implementation
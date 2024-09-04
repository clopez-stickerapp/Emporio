import { PerPiece } from "./PerPiece";
import { SquareMeter } from "./SquareMeter";
import { SquareMeterWithBleed } from "./SquareMeterWithBleed";
import { UnitType } from "./UnitType";

export enum UnitTypeNames {
	SquareMeter = "square_meter",
	PerPiece = "per_piece",
	SquareMeterWithBleed = "square_meter_with_bleed",
}

export const AllUnitTypes: Record<UnitTypeNames, UnitType> = {
	[UnitTypeNames.SquareMeter]: new SquareMeter(),
	[UnitTypeNames.PerPiece]: new PerPiece(),
	[UnitTypeNames.SquareMeterWithBleed]: new SquareMeterWithBleed(),
};
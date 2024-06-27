import { PerPiece } from "./PerPiece";
import { SquareMeter } from "./SquareMeter";
import { UnitType } from "./UnitType";

export enum UnitTypeNames {
	SquareMeter = "square_meter",
	PerPiece = "per_piece",
}

export const AllUnitTypes: Record<UnitTypeNames, UnitType> = {
	[UnitTypeNames.SquareMeter]: new SquareMeter(),
	[UnitTypeNames.PerPiece]: new PerPiece(),
};
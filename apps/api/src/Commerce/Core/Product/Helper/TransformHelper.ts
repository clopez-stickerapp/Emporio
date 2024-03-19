import { SizeHelper } from "./SizeHelper";

export class TransformHelper
{
	public constructor( protected size: SizeHelper ) {}

	public evaluateScale( scale: number, dimensions: [ number, number ] ): number
	{
		const maxSide = Math.max( ...dimensions );
		const minSide = Math.min( ...dimensions );

		dimensions = dimensions.map( d => d *= scale ) as [ number, number ];

		if ( !this.areDimensionsValid( "min_size_mm", dimensions ) )
		{
			return this.size.minSizeMM / minSide;
		}
		else if ( 
			this.size.hasMaxSizeOtherSide() 
			&& !this.areDimensionsValid( "max_size_other_side_mm", dimensions ) 
			&& maxSide / minSide < this.size.maxSizeMM / this.size.maxSizeOtherSideMM 
		)
		{
			return this.size.maxSizeOtherSideMM / minSide;
		}
		else if ( !this.areDimensionsValid( "max_size_mm", dimensions ) )
		{
			return this.size.maxSizeMM / maxSide;
		}

		return scale;
	}

	public areDimensionsValid( sizeAttrName: string, dimensions: [ number, number ] ): boolean
	{
		switch ( sizeAttrName )
		{
			case "min_size_mm":
				return !dimensions.some( dimension => dimension < this.size.minSizeMM );
			
			case "max_size_other_side_mm":
				return !dimensions.every( dimension => dimension > this.size.maxSizeOtherSideMM );

			case "max_size_mm":
				return !dimensions.some( dimension => dimension > this.size.maxSizeMM );

			default:
				return false;
		}
	}
}

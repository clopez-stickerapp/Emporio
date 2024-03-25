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
			return this.size.minSize.mm / minSide;
		}
		else if ( 
			this.size.hasMaxSizeOtherSide() 
			&& !this.areDimensionsValid( "max_size_other_side_mm", dimensions ) 
			&& maxSide / minSide < this.size.maxSize.mm / this.size.maxSizeOtherSide.mm 
		)
		{
			return this.size.maxSizeOtherSide.mm / minSide;
		}
		else if ( !this.areDimensionsValid( "max_size_mm", dimensions ) )
		{
			return this.size.maxSize.mm / maxSide;
		}

		return scale;
	}

	public areDimensionsValid( sizeAttrName: string, dimensions: [ number, number ] ): boolean
	{
		switch ( sizeAttrName )
		{
			case "min_size_mm":
				return !dimensions.some( dimension => dimension < this.size.minSize.mm );
			
			case "max_size_other_side_mm":
				return !dimensions.every( dimension => dimension > this.size.maxSizeOtherSide.mm );

			case "max_size_mm":
				return !dimensions.some( dimension => dimension > this.size.maxSize.mm );

			default:
				return false;
		}
	}
}

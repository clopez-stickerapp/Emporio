<?php

	namespace StickerApp\Babylon\Helper\Condition;

	use StickerApp\Babylon\Helper\Condition\Exception\ConditionSubGroupAlreadyExistsException;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionSubGroupNotFoundException;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
	use function array_key_exists;
	use function count;
	use function is_null;
	use function var_dump;

	class ConditionBuilder implements ConditionTestableInterface
	{
		public string $relationMode;
		/**
		 * @var Condition[]|ConditionBuilder[]
		 */
		protected array $conditions          = array();
		protected int   $baseComplexityScore = 0;

		public function __construct( string $relationMode = ConditionRelations::AND )
		{
			$this->relationMode = $relationMode;
		}

		public function calculateComplexityScore(): int
		{
			$score = $this->baseComplexityScore;

			if ( $this->relationMode == ConditionRelations::AND && count( $this->conditions ) )
			{
				$score += 5;
			}

			foreach ( $this->conditions as $condition )
			{
				if ( $condition instanceof ConditionBuilder )
				{
					$score += 100;
					$score += $condition->calculateComplexityScore();
				}
				else
				{
					$score += 10;
				}
			}

			return $score;
		}

		public function count(): int
		{
			return count( $this->conditions );
		}

		public function addSubGroup( string $mode = ConditionRelations::AND, ?string $alias = NULL ): ConditionBuilder
		{
			if ( !$alias )
			{
				$alias = "subgroup_" . $this->count();
			}

			if ( array_key_exists( $alias, $this->conditions ) )
			{
				throw new ConditionSubGroupAlreadyExistsException( "Sub group already exists with alias: $alias" );
			}

			$subGroup                   = new ConditionBuilder( $mode );
			$this->conditions[ $alias ] = $subGroup;

			return $subGroup;
		}

		public function removeSubGroup( string $alias ): void
		{
			unset( $this->conditions[ $alias ] );
		}

		public function getSubGroup( string $alias ): ConditionBuilder
		{
			if ( !array_key_exists( $alias, $this->conditions ) )
			{
				throw new ConditionSubGroupNotFoundException( "Sub group doesn't exists with alias: $alias" );
			}

			return $this->conditions[ $alias ];
		}

		public function addCondition( string $columnName, string $operator, $conditionValue = NULL ): self
		{
			$condition = new Condition( $columnName, $operator, $conditionValue );

			if ( !$this->hasCondition( $condition ) )
			{
				$this->conditions[ "$condition" ] = $condition;
			}

			return $this;
		}

		public function hasCondition( Condition $condition ): bool
		{
			return array_key_exists( "$condition", $this->conditions );
		}

		/**
		 * @throws Exception\ConditionTestFailedException
		 * @throws Exception\ConditionTestDataKeyNotFoundException
		 */
		public function test( array $data ): bool
		{
			foreach ( $this->conditions as $condition )
			{
				$result = NULL;
				try
				{
					$result = $condition->test( $data );
				}
				catch( ConditionTestDataKeyNotFoundException $exception )
				{
				}
				if ( !is_null( $result ) )
				{
					switch ( $this->relationMode )
					{
						case ConditionRelations::AND:

							if ( $result === FALSE )
							{
								return FALSE;
							}

							break;
						case ConditionRelations::OR:

							if ( $result === TRUE )
							{
								return TRUE;
							}

							break;
					}
				}
			}

			if ( isset( $exception ) )
			{
				throw $exception;
			}

			if ( $this->relationMode == ConditionRelations::OR && count( $this->conditions ) )
			{
				return FALSE;
			}

			return TRUE;
		}

		/**
		 * @return Condition[]|ConditionBuilder[]
		 */
		public function getConditions(): array
		{
			return $this->conditions;
		}

		public function toArray(): array
		{
			$conditions = [];
			foreach ( $this->conditions as $condition )
			{
				$conditions[] = $condition->toArray();
			}

			return [
				"conditions"   => $conditions,
				"relationMode" => $this->relationMode,
				"score"        => $this->baseComplexityScore
			];
		}

		public function fromArray( array $data ): void
		{
			$this->relationMode = $data[ 'relationMode' ];
			$this->setBaseComplexityScore( $data[ 'score' ] );
			$this->conditions = [];
			foreach ( $data[ 'conditions' ] as $condition )
			{
				if ( array_key_exists( "conditions", $condition ) )
				{
					$group = $this->addSubGroup( $condition[ 'relationMode' ] );
					$group->fromArray( $condition );
				}
				else
				{
					$this->addCondition( $condition[ 'columnName' ], $condition[ 'operator' ], $condition[ 'conditionValue' ] );
				}
			}
		}

		public function __toString()
		{
			$string   = "";
			$relation = "&&";
			if ( $this->relationMode == ConditionRelations::OR )
			{
				$relation = "||";
			}

			$i = 0;
			foreach ( $this->conditions as $key => $condition )
			{
				$conditionAsString = "$condition";
				if ( $condition instanceof ConditionBuilder )
				{
					$conditionAsString = "($conditionAsString)";
				}
				if ( $i > 0 )
				{
					$conditionAsString = " $relation $conditionAsString";
				}

				$string .= $conditionAsString;

				$i ++;
			}

			return $string;
		}

		public function getBaseComplexityScore(): int
		{
			return $this->baseComplexityScore;
		}

		public function setBaseComplexityScore( int $baseComplexityScore ): self
		{
			$this->baseComplexityScore = $baseComplexityScore;

			return $this;
		}
	}

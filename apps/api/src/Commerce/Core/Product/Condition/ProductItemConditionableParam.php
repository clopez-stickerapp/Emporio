<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Condition;

	use ArrayObject;
	use JsonSerializable;

	class ProductItemConditionableParam implements JsonSerializable
	{
		public string $columnName;
		public string $label;
		public bool   $canValueBeDynamic;
		public bool   $isMultiValue;
		public string $expectedValueType;
		public array  $values;

		public function __construct( string $columnName, string $label, bool $canValueBeDynamic, bool $isMultiValue, string $expectedValueType, array $values = [] )
		{
			$this->label             = $label;
			$this->columnName        = $columnName;
			$this->canValueBeDynamic = $canValueBeDynamic;
			$this->isMultiValue      = $isMultiValue;
			$this->expectedValueType = $expectedValueType;
			$this->values            = $values;
		}

		public function jsonSerialize()
		{
			return [
				"columnName"        => $this->columnName,
				"label"             => $this->label,
				"canValueBeDynamic" => $this->canValueBeDynamic,
				"isMultiValue"      => $this->isMultiValue,
				"expectedValueType" => $this->expectedValueType,
				"values"            => $this->values
			];
		}
	}

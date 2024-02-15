<?php

	namespace StickerApp\Babylon\Helper\Condition;

	interface ConditionTestableInterface
	{
		public function test( array $data ): bool;

		public function toArray(): array;

		public function fromArray( array $data ): void;

	}

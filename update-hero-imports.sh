#!/bin/bash

# Update imports from the old Hero component to the new one
find ./src -type f -name "*.ts*" -exec sed -i '' 's|import { Hero } from '"'"'@shared-components/organisms/Hero/Hero'"'"'|import { Hero } from '"'"'@shared-components/organisms/Hero'"'"'|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i '' 's|import { HeroProps } from '"'"'@shared-components/organisms/Hero/Hero.types'"'"'|import { HeroProps } from '"'"'@shared-components/organisms/Hero'"'"'|g' {} \;

# Update imports for HeroSimple to Hero
find ./src -type f -name "*.ts*" -exec sed -i '' 's|import { HeroSimple } from '"'"'@shared-components/organisms/HeroSimple'"'"'|import { Hero } from '"'"'@shared-components/organisms/Hero'"'"'|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i '' 's|import { HeroSimpleProps } from '"'"'@shared-components/organisms/HeroSimple'"'"'|import { HeroProps } from '"'"'@shared-components/organisms/Hero'"'"'|g' {} \;

# Update component references
find ./src -type f -name "*.ts*" -exec sed -i '' 's|<HeroSimple|<Hero|g' {} \;

# Rename enhanceHeroSimpleProps function references to enhanceHeroProps
find ./src -type f -name "*.ts*" -not -path "*/node_modules/*" -exec sed -i '' 's/enhanceHeroSimpleProps/enhanceHeroProps/g' {} \;

echo "Hero component imports and references updated across the codebase."

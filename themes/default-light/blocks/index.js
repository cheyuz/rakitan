/**
 * Rakitan Clean Light Theme Block Overrides Registry
 *
 * This file maps core block types to this theme's custom component designs.
 * Vite auto-discovers this file via import.meta.glob('/themes/* /blocks/index.js').
 */
import HeroBlock from './HeroBlock';
import FeaturesBlock from './FeaturesBlock';
import PricingBlock from './PricingBlock';
import TestimonialsBlock from './TestimonialsBlock';
import CtaBlock from './CtaBlock';

export default {
    hero: HeroBlock,
    features: FeaturesBlock,
    pricing: PricingBlock,
    testimonials: TestimonialsBlock,
    cta: CtaBlock,
};

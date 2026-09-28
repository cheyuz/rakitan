/**
 * Rakitan Light Nabatis Theme Block Overrides Registry
 *
 * Implements fresh botanical modern soft green aesthetic,
 * asymmetric leaf curves, and multi-color strip accents.
 */
import HeroBlock from './HeroBlock';
import FeaturesBlock from './FeaturesBlock';
import PricingBlock from './PricingBlock';
import TestimonialsBlock from './TestimonialsBlock';
import CtaBlock from './CtaBlock';
import FaqBlock from './FaqBlock';
import ContactFormBlock from './ContactFormBlock';
import LatestPostsBlock from './LatestPostsBlock';
import RichTextBlock from './RichTextBlock';
import ContainerBlock from './ContainerBlock';
import GalleryBlock from './GalleryBlock';
import SpacerBlock from './SpacerBlock';

// Subcomponents
import NabatisSubButton from './subcomponents/NabatisSubButton';
import NabatisSubBadge from './subcomponents/NabatisSubBadge';
import NabatisSubAlert from './subcomponents/NabatisSubAlert';
import NabatisSubCard from './subcomponents/NabatisSubCard';
import NabatisSubDivider from './subcomponents/NabatisSubDivider';
import NabatisSubIcon from './subcomponents/NabatisSubIcon';
import NabatisSubText from './subcomponents/NabatisSubText';

export default {
    hero: HeroBlock,
    features: FeaturesBlock,
    pricing: PricingBlock,
    testimonials: TestimonialsBlock,
    cta: CtaBlock,
    faq: FaqBlock,
    contact: ContactFormBlock,
    latest_posts: LatestPostsBlock,
    rich_text: RichTextBlock,
    container: ContainerBlock,
    gallery: GalleryBlock,
    spacer: SpacerBlock,

    subComponents: {
        sub_button: NabatisSubButton,
        sub_badge: NabatisSubBadge,
        sub_alert: NabatisSubAlert,
        sub_card: NabatisSubCard,
        sub_divider: NabatisSubDivider,
        sub_icon: NabatisSubIcon,
        sub_text: NabatisSubText,
    },
};

import { HeroProps } from './Hero.types';
import { AiSkepticToExpertProps } from '@shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.types';
import { defaultContent } from '@shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.constants';

/**
 * Enhances the hero props for Hero with consistent styling and defaults
 */
export const enhanceHeroProps = (heroProps: AiSkepticToExpertProps['heroProps'] = defaultContent.hero): HeroProps => {
    // Format the title with specific line breaks, non-breaking spaces, and styled emphasis
    // All uppercase to ensure consistent styling
    // The \u00A0 is a non-breaking space to keep "AI SKEPTIC" together on mobile
    // Using HTML for the title to add color emphasis to "AI NATIVE"
    const formattedTitle = "FROM AI\u00A0SKEPTIC<br>TO <span style='color:#4dabf7;text-transform:uppercase'>AI\u00A0NATIVE</span>";

    return {
        // Spread the original props first
        ...heroProps,
        // Override with formatted title
        title: formattedTitle.toUpperCase(),
        // Add optional scroll CTA
        scrollCta: {
            text: "Read My Story",
            targetId: "skeptic-reality"
        },
        // Ensure required fields for Hero are set
        background: 'image',
        backgroundImage: heroProps.backgroundImage || '/main-heading-background.png',
        backgroundOverlay: true,
        textColor: 'light',
        overlayOpacity: 0.5,
    };
};

/**
 * Alternative title suggestions for clarity:
 * 
 * "AI IS TO CODING<br>WHAT <span style='color:#4dabf7'>AUTOPILOT</span> IS TO FLYING"
 * 
 * "COMPARING AI TOOLS<br>TO <span style='color:#4dabf7'>FLIGHT AUTOPILOT</span>"
 * 
 * "AI TOOLS:<br>THE <span style='color:#4dabf7'>AUTOPILOT</span> OF DEVELOPMENT"
 * 
 * "WHAT AUTOPILOT TEACHES US<br>ABOUT <span style='color:#4dabf7'>AI IN DEVELOPMENT</span>"
 */ 
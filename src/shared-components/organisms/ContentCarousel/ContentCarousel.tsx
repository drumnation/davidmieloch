import React, { useState, useEffect, useRef } from 'react';
import { Embla, CarouselProps as MantineCarouselProps } from '@mantine/carousel';
import AutoHeight from 'embla-carousel-auto-height';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ContentCarouselProps } from './ContentCarousel.types';
import * as S from './ContentCarousel.styles';

export const ContentCarousel: React.FC<ContentCarouselProps> = ({
    children,
    id,
    className,
    scrollIntoViewOnSelect = true, // Default behavior based on previous usage
    getEmblaApi: parentGetEmblaApi, // Renamed prop to avoid conflict
}) => {
    const [emblaApi, setEmblaApi] = useState<Embla | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Pass Embla instance up if callback provided
    useEffect(() => {
        if (parentGetEmblaApi) {
            parentGetEmblaApi(emblaApi);
        }
    }, [emblaApi, parentGetEmblaApi]);


    // Re-initialize AutoHeight and scroll into view on slide change
    useEffect(() => {
        if (!emblaApi) return;

        const handleSelect = () => {
            // Short delay allows layout adjustments before re-init/scroll
            setTimeout(() => {
                emblaApi.reInit(); // Re-initialize for AutoHeight correctness

                // Scroll carousel container into view if prop is true
                if (scrollIntoViewOnSelect && carouselRef.current) {
                    // The browser should respect scroll-margin-top set on the element
                    carouselRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Aligns top of element (considering margin) at top of viewport
                    });
                }
            }, 50);
        };

        emblaApi.on('select', handleSelect);
        // Initial re-init might be needed for AutoHeight
        setTimeout(() => emblaApi.reInit(), 50);

        // Cleanup listener on unmount
        return () => {
            emblaApi.off('select', handleSelect);
        };
    }, [emblaApi, scrollIntoViewOnSelect]); // Dependency array includes scroll prop

    // Type assertion for props passed to Mantine Carousel
    const mantineProps: Partial<MantineCarouselProps> = {
        getEmblaApi: setEmblaApi,
        plugins: [AutoHeight()],
        slideSize: "100%",
        align: "start",
        withIndicators: true,
        loop: true,
        nextControlIcon: <FaChevronRight size={16} />,
        previousControlIcon: <FaChevronLeft size={16} />,
    };

    return (
        <S.StyledCarousel
            ref={carouselRef}
            id={id}
            className={className}
            {...mantineProps} // Spread the typed props
        >
            {React.Children.map(children, (child, index) => (
                // Ensure child is a valid React element before cloning or wrapping
                React.isValidElement(child) ? (
                    <S.StyledCarousel.Slide key={index}>
                        {/* Wrap slide content for potential styling */}
                        <S.CarouselSlideContent>
                            {child}
                        </S.CarouselSlideContent>
                    </S.StyledCarousel.Slide>
                ) : null
            ))}
        </S.StyledCarousel>
    );
}; 
import React from 'react';
import { useSpring, useInView, animated } from '@react-spring/web';
import { 
  BioSection, 
  BioSectionTitle
} from '../../Bio.styles';
import { TESTIMONIALS_DATA } from './testimonials.data';
import { TestimonialsProps } from './Testimonials.types';
import { 
  TestimonialsContainer,
  SectionHeading,
  CategoryHeading,
  CategoryHeadingWrapper,
  CategoryIcon,
  TestimonialCardsContainer,
  TestimonialCard,
  TestimonialText,
  TestimonialAuthor,
  LinkedInButtonContainer,
  LinkedInButton
} from './Testimonials.styles';
import { 
  IconBrandLinkedin, 
  IconMusic, 
  IconBusinessplan, 
  IconCode 
} from '@tabler/icons-react';

// Create animated components
const AnimatedBioSectionTitle = animated(BioSectionTitle);
const AnimatedCategoryHeading = animated(CategoryHeading);
const AnimatedTestimonialCard = animated(TestimonialCard);
const AnimatedLinkedInButton = animated(LinkedInButton);

// Map of category icons
const CATEGORY_ICONS = {
  'Music': IconMusic,
  'Sales/Marketing': IconBusinessplan,
  'Software': IconCode
};

export const Testimonials: React.FC<TestimonialsProps> = ({ className }) => {
  // Heading animation
  const [headingRef, headingInView] = useInView({
    once: true,
    rootMargin: '0px 0px -100px 0px'
  });

  const headingAnimation = useSpring({
    opacity: headingInView ? 1 : 0,
    transform: headingInView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 280, friction: 60 }
  });

  // LinkedIn button animation
  const [buttonRef, buttonInView] = useInView({
    once: true,
    rootMargin: '0px 0px -50px 0px'
  });

  const buttonAnimation = useSpring({
    opacity: buttonInView ? 1 : 0,
    transform: buttonInView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 280, friction: 60 },
    delay: 300
  });

  return (
    <BioSection className={className} id="testimonials">
      <TestimonialsContainer>
        <AnimatedBioSectionTitle ref={headingRef} style={headingAnimation}>
          Testimonials
        </AnimatedBioSectionTitle>
        
        {TESTIMONIALS_DATA.map((categoryData, categoryIndex) => {
          const [categoryRef, categoryInView] = useInView({
            once: true,
            rootMargin: '0px 0px -100px 0px'
          });

          const categoryAnimation = useSpring({
            opacity: categoryInView ? 1 : 0,
            transform: categoryInView ? 'translateY(0)' : 'translateY(20px)',
            config: { tension: 280, friction: 60 },
            delay: categoryIndex * 100
          });

          // Get the appropriate icon component
          const IconComponent = CATEGORY_ICONS[categoryData.category as keyof typeof CATEGORY_ICONS];

          return (
            <div key={categoryData.category}>
              <CategoryHeadingWrapper>
                <CategoryIcon>
                  <IconComponent stroke={1.5} />
                </CategoryIcon>
                <AnimatedCategoryHeading ref={categoryRef} style={categoryAnimation}>
                  {categoryData.category}
                </AnimatedCategoryHeading>
              </CategoryHeadingWrapper>
              
              <TestimonialCardsContainer>
                {categoryData.testimonials.map((testimonial, testimonialIndex) => {
                  const [testimonialRef, testimonialInView] = useInView({
                    once: true,
                    rootMargin: '0px 0px -50px 0px'
                  });

                  const testimonialAnimation = useSpring({
                    opacity: testimonialInView ? 1 : 0,
                    transform: testimonialInView ? 'translateY(0)' : 'translateY(20px)',
                    config: { tension: 280, friction: 60 },
                    delay: testimonialIndex * 200
                  });

                  return (
                    <AnimatedTestimonialCard 
                      key={testimonialIndex}
                      ref={testimonialRef}
                      style={testimonialAnimation}
                    >
                      <TestimonialText dangerouslySetInnerHTML={{ __html: testimonial.text }} />
                      <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                    </AnimatedTestimonialCard>
                  );
                })}
              </TestimonialCardsContainer>
            </div>
          );
        })}

        <LinkedInButtonContainer>
          <AnimatedLinkedInButton 
            ref={buttonRef}
            style={buttonAnimation}
            href="https://www.linkedin.com/in/davidmieloch/details/recommendations/?detailScreenTabIndex=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin />
            View more Testimonials on LinkedIn
          </AnimatedLinkedInButton>
        </LinkedInButtonContainer>
      </TestimonialsContainer>
    </BioSection>
  );
};

export default Testimonials; 
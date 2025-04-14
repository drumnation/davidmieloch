import React from 'react';
import { motion } from 'framer-motion';
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

// Framer Motion variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

// Define type for icon components using 'typeof' to infer the type from the existing components
type IconComponent = typeof IconCode;

// Map of category icons
const CATEGORY_ICONS: Record<string, IconComponent> = {
  'Music': IconMusic,
  'Sales/Marketing': IconBusinessplan,
  'Software': IconCode
};

export const Testimonials: React.FC<TestimonialsProps> = ({ className }) => {
  return (
    <BioSection className={className} id="testimonials">
      <TestimonialsContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          variants={fadeInVariants}
        >
          <BioSectionTitle>
            Testimonials
          </BioSectionTitle>
        </motion.div>
        
        {TESTIMONIALS_DATA.map((categoryData, categoryIndex) => {
          // Get the appropriate icon component
          const Icon = CATEGORY_ICONS[categoryData.category] || IconCode;
          
          return (
            <div key={categoryData.category}>
              <CategoryHeadingWrapper>
                <CategoryIcon>
                  <Icon stroke={1.5} />
                </CategoryIcon>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px 0px" }}
                  variants={fadeInVariants}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <CategoryHeading>
                    {categoryData.category}
                  </CategoryHeading>
                </motion.div>
              </CategoryHeadingWrapper>
              
              <TestimonialCardsContainer>
                {categoryData.testimonials.map((testimonial, testimonialIndex) => (
                  <motion.div
                    key={testimonialIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px 0px" }}
                    variants={fadeInVariants}
                    transition={{ delay: testimonialIndex * 0.2 }}
                  >
                    <TestimonialCard>
                      <TestimonialText dangerouslySetInnerHTML={{ __html: testimonial.text }} />
                      <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                    </TestimonialCard>
                  </motion.div>
                ))}
              </TestimonialCardsContainer>
            </div>
          );
        })}

        <LinkedInButtonContainer>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px 0px" }}
            variants={fadeInVariants}
            transition={{ delay: 0.3 }}
          >
            <LinkedInButton
              href="https://www.linkedin.com/in/davidmieloch/details/recommendations/?detailScreenTabIndex=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin />
              View more Testimonials on LinkedIn
            </LinkedInButton>
          </motion.div>
        </LinkedInButtonContainer>
      </TestimonialsContainer>
    </BioSection>
  );
};

export default Testimonials; 
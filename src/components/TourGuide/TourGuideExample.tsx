import React, { useState } from 'react';
import { TourGuide } from './TourGuide';
import { Step } from 'react-joyride';

export const TourGuideExample: React.FC = () => {
    // State to force re-render when resetting the tour
    const [key, setKey] = useState(0);

    // Define your tour steps - COMPRESSED VERSION
    const steps: Step[] = [
        {
            target: '.step-1',
            content: 'Welcome! This tour will quickly introduce you to the key features.',
            disableBeacon: true,
            placement: 'center', // Start with a centered intro for better context
        },
        {
            target: '.step-2, .step-3', // Target multiple elements to highlight a section
            content: 'These are the main features you need to know about. They work together to help you accomplish your goals.',
            placement: 'bottom',
            // Optional styling to highlight multiple elements
            styles: {
                options: {
                    width: 350, // Wider tooltip for more comprehensive explanation
                }
            }
        }
    ];

    // Function to reset the tour
    const resetTour = () => {
        // Remove from localStorage
        localStorage.removeItem('tour-state-example-tour');
        // Force component to re-mount by changing key
        setKey(prevKey => prevKey + 1);
    };

    return (
        <TourGuide
            key={key}
            tourId="example-tour" // Unique ID for this tour
            steps={steps}
            run={true} // Start the tour automatically
            continuous={true} // Allow users to navigate through steps
            showSkipButton={true} // Allow users to skip the tour
            showProgress={true} // Show progress indicator
            debug={true} // Enable debugging
        >
            {/* Your main content goes here */}
            <div className="tour-example">
                <h1>Welcome to the Tour Example</h1>

                <div className="step-1">
                    <h2>Getting Started</h2>
                    <p>This is your entry point to the application.</p>
                </div>

                <div className="step-2">
                    <h2>Main Features</h2>
                    <p>This area contains essential functionality.</p>
                </div>

                <div className="step-3">
                    <h2>Additional Features</h2>
                    <p>These features enhance your experience.</p>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    {/* Add button to manually restart the tour */}
                    <button onClick={resetTour}>
                        Restart Tour
                    </button>

                    {/* Add button to show localStorage for debugging */}
                    <button
                        onClick={() => {
                            console.log('Tour State in localStorage:',
                                localStorage.getItem('tour-state-example-tour'));
                        }}
                    >
                        Show Tour State
                    </button>

                    {/* Add button to manually force run the tour */}
                    <button
                        onClick={() => {
                            // Force reset (more aggressive)
                            localStorage.removeItem('tour-state-example-tour');
                            // Force a full page reload to ensure clean state
                            window.location.reload();
                        }}
                    >
                        Force Reload Tour
                    </button>
                </div>
            </div>
        </TourGuide>
    );
}; 
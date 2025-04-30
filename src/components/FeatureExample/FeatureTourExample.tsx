import React from 'react';
import { Step } from 'react-joyride';
import { TourGuideWithContext } from '../TourGuide/TourGuideWithContext';

export const FeatureTourExample: React.FC = () => {
    // Define your feature-specific tour steps
    const steps: Step[] = [
        {
            target: '.feature-title',
            content: 'This is our new feature! Let us show you how it works.',
            disableBeacon: true,
        },
        {
            target: '.feature-option-1',
            content: 'You can configure this setting to customize behavior.',
        },
        {
            target: '.feature-option-2',
            content: 'This option allows you to enable advanced functionality.',
        },
        {
            target: '.feature-action',
            content: 'Click here to apply your settings and activate the feature.',
        },
    ];

    return (
        <TourGuideWithContext
            tourId="feature-example" // Unique ID for this feature's tour
            steps={steps}
            isFeatureTour={true} // Specify this is a feature-specific tour
            run={true}
        >
            <div className="feature-container">
                <h2 className="feature-title">New Feature</h2>

                <div className="feature-options">
                    <div className="feature-option-1">
                        <label>
                            <input type="checkbox" /> Enable basic settings
                        </label>
                        <p>Control how the feature behaves under normal conditions</p>
                    </div>

                    <div className="feature-option-2">
                        <label>
                            <input type="checkbox" /> Enable advanced settings
                        </label>
                        <p>Unlock additional functionality for power users</p>
                    </div>
                </div>

                <button className="feature-action">
                    Activate Feature
                </button>
            </div>
        </TourGuideWithContext>
    );
}; 
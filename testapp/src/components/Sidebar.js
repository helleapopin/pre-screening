import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ steps, currentStep }) => {
  const navigate = useNavigate();

  return (
    <div className="body">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        // Determine if this step is active
        const activeClass = currentStep === stepNumber ? 'activeStep' : '';

        return (
          <div
            key={stepNumber}
            className={`step ${activeClass}`}
            onClick={() => {
              console.log("Clicked:", stepNumber, step.title, "Path:", step.path);
              if (step.path) {
                navigate(step.path);
              } else {
                console.error("Error: step.path is undefined for", stepNumber, step.title);
              }
            }}
          >
            <span className="stepNumber">Section {stepNumber}</span>
            <span className="stepTitle">{step.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;

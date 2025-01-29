import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ steps, currentStep }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.sidebar}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;

        return (
          <div
            key={stepNumber}
            style={{
              ...styles.step,
              ...(isActive ? styles.activeStep : {}),
              borderBottom: index !== steps.length - 1 ? "1px solid #ccc" : "none", // Line between sections
            }}
            onClick={() => navigate(step.path)}
          >
            <span style={styles.stepNumber}>Section {stepNumber}</span>
            <span style={styles.stepTitle}>{step.title}</span>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    minHeight: '100vh',
    backgroundColor: '#f8f8f8',
    padding: '10px',
  },
  step: {
    padding: '12px 10px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  activeStep: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
  },
  stepNumber: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#333',
  },
  stepTitle: {
    fontSize: '17px',
    fontWeight: 'bold',
  },
};

export default Sidebar;

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import VariablesSection from '../components/VariablesSectionRest/VariablesSectionRest';

describe('VariablesSection', () => {
  const locale = (key: string) => {
    const translations: { [key: string]: string } = {
      showVariables: 'Show Variables',
      hideVariables: 'Hide Variables',
      addVariable: 'Add Variable',
      variableKey: 'Key',
      variableValue: 'Value',
    };
    return translations[key] || key;
  };

  const setup = (showVariables = false) => {
    const handleVariableChange = vi.fn();
    const handleAddVariable = vi.fn();
    const handleRemoveVariable = vi.fn();
    const toggleVariablesSection = vi.fn();
    const variables = [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
    ];

    render(
      <VariablesSection
        variables={variables}
        handleVariableChange={handleVariableChange}
        handleAddVariable={handleAddVariable}
        handleRemoveVariable={handleRemoveVariable}
        locale={locale}
        showVariables={showVariables}
        toggleVariablesSection={toggleVariablesSection}
      />
    );

    return {
      handleVariableChange,
      handleAddVariable,
      handleRemoveVariable,
      toggleVariablesSection,
    };
  };

  it('renders show variables button', () => {
    setup();
    const button = screen.getByRole('button', { name: /Show Variables/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles variables section when button is clicked', () => {
    const { toggleVariablesSection } = setup();
    const button = screen.getByRole('button', { name: /Show Variables/i });

    fireEvent.click(button);
    expect(toggleVariablesSection).toHaveBeenCalled();
  });

  it('renders variables section when showVariables is true', () => {
    setup(true);
    const addVariableButton = screen.getByRole('button', {
      name: /Add Variable/i,
    });
    expect(addVariableButton).toBeInTheDocument();
  });

  it('calls handleAddVariable when add button is clicked', () => {
    const { handleAddVariable } = setup(true);
    const addVariableButton = screen.getByRole('button', {
      name: /Add Variable/i,
    });

    fireEvent.click(addVariableButton);
    expect(handleAddVariable).toHaveBeenCalled();
  });
});

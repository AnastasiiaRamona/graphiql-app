import {
  Grid,
  TextField,
  IconButton,
  Button,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  buttonStyles,
  gridContainerStyles,
  gridItemStyles,
  variablesBoxStyles,
} from '@/app/[locale]/[method]/[[...params]]/restfullFormStyles';

interface VariablesSectionProps {
  variables: { key: string; value: string }[];
  handleVariableChange: (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => void;
  handleAddVariable: () => void;
  handleRemoveVariable: (index: number) => void;
  locale: (key: string) => string;
  showVariables: boolean;
  toggleVariablesSection: () => void;
}

const VariablesSection: React.FC<VariablesSectionProps> = ({
  variables,
  handleVariableChange,
  handleAddVariable,
  handleRemoveVariable,
  locale,
  showVariables,
  toggleVariablesSection,
}) => {
  return (
    <Box>
      <Grid item xs={12} sx={buttonStyles}>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVariablesSection}
        >
          {showVariables
            ? `${locale('hideVariables')}`
            : `${locale('showVariables')}`}
        </Button>
      </Grid>

      {showVariables && (
        <Box>
          <Box>
            <Grid
              item
              sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddVariable}
              >
                {locale('addVariable')}
              </Button>
            </Grid>
          </Box>

          {variables.map((variable, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{ ...gridContainerStyles, paddingLeft: '16px' }}
            >
              <Grid item xs={5} sx={gridItemStyles}>
                <TextField
                  fullWidth
                  label={locale('variableKey')}
                  variant="outlined"
                  value={variable.key}
                  onChange={(e) =>
                    handleVariableChange(index, 'key', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={5} sx={gridItemStyles}>
                <TextField
                  fullWidth
                  label={locale('variableValue')}
                  variant="outlined"
                  value={variable.value}
                  onChange={(e) =>
                    handleVariableChange(index, 'value', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveVariable(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VariablesSection;

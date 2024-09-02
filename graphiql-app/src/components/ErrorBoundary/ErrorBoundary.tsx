'use client';

import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Typography } from '@mui/material';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import GppMaybeTwoToneIcon from '@mui/icons-material/GppMaybeTwoTone';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps & {
    errorDescription: string;
    errorToast: string;
    refreshText: string;
  },
  ErrorBoundaryState
> {
  constructor(
    props: ErrorBoundaryProps & {
      errorDescription: string;
      errorToast: string;
      refreshText: string;
    }
  ) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    toast.error(`${this.props.errorToast}: ${error}`);
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'background.default',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            {this.props.errorDescription}
          </Typography>
          <GppMaybeTwoToneIcon sx={{ fontSize: 100, mb: 2 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CachedTwoToneIcon sx={{ fontSize: 40, mr: 1 }} />
            {this.props.refreshText}
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

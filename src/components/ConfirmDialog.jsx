import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmDialog = ({ open, onClose, onConfirm, title }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 3,
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
            Confirm Delete
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the book "{title}"? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          sx={{
            '&:hover': {
              backgroundColor: 'error.dark',
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog; 
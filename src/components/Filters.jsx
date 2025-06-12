import { Box, TextField, MenuItem, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Filters = ({ search, onSearchChange, genreFilter, onGenreChange, statusFilter, onStatusChange }) => {
  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Romance', 'Biography'];
  const statuses = ['Available', 'Issued'];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3, 
        flexWrap: 'wrap',
        '& .MuiTextField-root': {
          minWidth: { xs: '100%', sm: 200 },
          flex: { xs: '1 1 100%', sm: '1 1 auto' }
        }
      }}
    >
      <TextField
        label="Search Books"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        placeholder="Search by title or author..."
      />
      <TextField
        select
        label="Genre"
        variant="outlined"
        size="small"
        value={genreFilter}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <MenuItem value="">All Genres</MenuItem>
        {genres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Status"
        variant="outlined"
        size="small"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <MenuItem value="">All Status</MenuItem>
        {statuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Filters; 
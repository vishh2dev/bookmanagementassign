import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookCard = ({ book, onEdit, onDelete, isEdit = false }) => {

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={book.imageUrl || `https://placehold.co/600x400/black/red/?text=${encodeURIComponent(book.title)}&font=roboto&red`}
        alt={book.title}
        sx={{
          objectFit: 'cover',
          backgroundColor: 'grey.100',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 120 }}>
        <Tooltip title={book.title} placement="top">
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            noWrap
            sx={{
              fontWeight: 'medium',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            {book.title}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: { xs: '0.875rem', sm: '0.9rem' }
          }}
        >
          By {book.author}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={book.genre}
            size="small"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              height: { xs: 24, sm: 28 }
            }}
          />
          <Chip
            label={book.status}
            size="small"
            color={book.status === 'Available' ? 'success' : 'warning'}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              height: { xs: 24, sm: 28 }
            }}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: { xs: '0.75rem', sm: '0.8rem' }
          }}
        >
          Published: {book.publishedYear}
        </Typography>
      </CardContent>
      {isEdit && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            p: 1,
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Tooltip title="Edit Book">
            <IconButton
              onClick={() => onEdit(book)}
              color="primary"
              size="small"
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText'
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Book">
            <IconButton
              onClick={() => onDelete(book)}
              color="error"
              size="small"
              sx={{
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'error.contrastText'
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
};

export default BookCard;

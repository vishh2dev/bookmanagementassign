import { Container, Grid, CircularProgress, Pagination, Box } from '@mui/material';
import toast from 'react-hot-toast';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import Filters from '../components/Filters';
import NoResultsFound from "../common/NoResultsFound";
import PageTitle from "../common/PageTitle";
import { useSearchParams } from 'react-router-dom';

const Dashboard = () => {
  const { books, isLoading, error } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const searchQuery = searchParams.get('search') || '';
  const genreFilter = searchParams.get('genre') || '';
  const statusFilter = searchParams.get('status') || '';

  const booksPerPage = 10;

  const filteredAndSearchedBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !genreFilter || book.genre === genreFilter;
    const matchesStatus = !statusFilter || book.status === statusFilter;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  
  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = filteredAndSearchedBooks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredAndSearchedBooks.length / booksPerPage);

  const handleSearchChange = (value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); 
      return params;
    });
  };

  const handleGenreChange = (value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
          params.set('genre', value);
      } else {
          params.delete('genre');
      }
      params.set('page', '1'); 
      return params;
    });
  };

  const handleStatusChange = (value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) {
          params.set('status', value);
      } else {
          params.delete('status');
      }
      params.set('page', '1'); 
      return params;
    });
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    toast.error(`Error loading books: ${error.message}`);
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageTitle title="Book Dashboard" />
      <Filters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        genreFilter={genreFilter}
        onGenreChange={handleGenreChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
      />
      {paginatedBooks.length === 0 ? (
        <NoResultsFound message="No books found" />
      ) : (
        <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
          {paginatedBooks.map((book) => (
            <Grid 
              key={book.id}
              size={{ xs: 12, sm: 6 }}
            >
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, newPage) => {
              setSearchParams(prev => {
                const params = new URLSearchParams(prev);
                params.set('page', String(newPage));
                return params;
              });
            }}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default Dashboard; 
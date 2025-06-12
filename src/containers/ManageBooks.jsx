import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  CircularProgress,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast';
import { useBooks } from "../hooks/useBooks";
import BookCard from "../components/BookCard";
import Filters from "../components/Filters";
import BookFormModal from "../components/BookFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import NoResultsFound from "../common/NoResultsFound";
import PageTitle from "../common/PageTitle";

const ManageBooks = () => {
  const { books, isLoading, error, createBook, updateBook, deleteBook } =
    useBooks();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const genreFilter = searchParams.get('genre') || '';
  const statusFilter = searchParams.get('status') || '';
  const page = Number(searchParams.get('page') || 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  
  const booksPerPage = 10;

  const filteredAndSearchedBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = !genreFilter || book.genre === genreFilter;
      const matchesStatus = !statusFilter || book.status === statusFilter;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, search, genreFilter, statusFilter]);


  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = filteredAndSearchedBooks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredAndSearchedBooks.length / booksPerPage);

  const handleSearchChange = useCallback((value) => {
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
  }, [setSearchParams]);

  const handleGenreChange = useCallback((value) => {
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
  }, [setSearchParams]);

  const handleStatusChange = useCallback((value) => {
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
  }, [setSearchParams]);

  const handlePageChange = useCallback((event, newPage) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set('page', String(newPage));
      return params;
    });
  }, [setSearchParams]);

  const handleAddBook = useCallback(() => {
    setSelectedBook(null);
    setIsModalOpen(true);
  }, []);

  const handleEditBook = useCallback((book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  }, []);

  const handleDeleteBook = useCallback((book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleModalSubmit = useCallback((data) => {
    if (selectedBook) {
    
      const updatedBookPayload = {
        ...selectedBook, 
        ...data,        
      };

      updateBook({ id: selectedBook.id, book: updatedBookPayload });
      toast.success('Book updated successfully!');
    } else {
      createBook(data);
      toast.success('Book added successfully!');
    }
    setIsModalOpen(false);
  }, [selectedBook, createBook, updateBook]);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedBook) {
      deleteBook(selectedBook.id);
      setIsDeleteDialogOpen(false);
      toast.success('Book deleted successfully!');
    }
  }, [selectedBook, deleteBook]);

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", m: 4 }}>
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
      <PageTitle
        title="Manage Books"
        actions={
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBook}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Add Book
          </Button>
        }
      />

      <Filters
        search={search}
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
              <BookCard
                book={book}
                isEdit
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}

      <BookFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={selectedBook}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={selectedBook?.title}
      />
    </Container>
  );
};

export default ManageBooks;

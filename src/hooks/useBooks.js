import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, createBookApi, updateBookApi, deleteBookApi } from "../services/bookService";

export const useBooks = () => {
  const queryClient = useQueryClient();

  // Fetching books
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5,
  });

  // Creating a book
  const createBookMutation = useMutation({
    mutationFn: createBookApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
    onError: (err) => {
      console.error('Error creating book:', err);
    },
  });

  // Updating a book
  const updateBookMutation = useMutation({
    mutationFn: updateBookApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
    onError: (err) => {
      console.error('Error updating book:', err);
    },
  });

  // Deleting a book
  const deleteBookMutation = useMutation({
    mutationFn: deleteBookApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
    onError: (err) => {
      console.error('Error deleting book:', err);
    },
  });

  return {
    books: books || [],
    isLoading,
    error,
    createBook: createBookMutation.mutate,
    updateBook: updateBookMutation.mutate,
    deleteBook: deleteBookMutation.mutate,
  };
};

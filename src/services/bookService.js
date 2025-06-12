const API_BASE_URL = 'https://crudcrud.com/api/d9ac25dbae9d4e988a761fb8ff87ae39';

export const fetchBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  return data
    .map(book => ({ ...book, id: book._id }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const createBookApi = async (newBook) => {
  const bookWithTimestamp = {
    ...newBook,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookWithTimestamp),
  });
  if (!response.ok) {
    throw new Error('Failed to create book');
  }
  return response.json();
};

export const updateBookApi = async ({ id, book }) => {
  const bookToUpdate = {
    title: book.title,
    author: book.author,
    genre: book.genre,
    publishedYear: book.publishedYear,
    status: book.status,
    imageUrl: book.imageUrl,
    createdAt: book.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookToUpdate),
  });
  if (!response.ok) {
    throw new Error('Failed to update book');
  }
  return { success: true };
};

export const deleteBookApi = async (id) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
}; 
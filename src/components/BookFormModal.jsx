import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  publishedYear: Yup.number()
    .required("Published year is required")
    .min(1000, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  status: Yup.string().required("Status is required"),
  imageUrl: Yup.string().url("Must be a valid URL").optional(),
});

const BookFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      publishedYear: new Date().getFullYear(),
      status: "Available",
      imageUrl: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues(initialData);
    } else {
      formik.resetForm();
    }
  }, [initialData]);

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
    "Biography",
  ];
  const statuses = ["Available", "Issued"];

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
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" sx={{ fontWeight: "medium" }}>
          {initialData ? "Edit Book" : "Add New Book"}
        </Typography>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Genre"
                name="genre"
                value={formik.values.genre}
                onChange={formik.handleChange}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                helperText={formik.touched.genre && formik.errors.genre}
                size="small"
                sx={{ minWidth: 150 }}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Published Year"
                name="publishedYear"
                type="number"
                value={formik.values.publishedYear}
                onChange={formik.handleChange}
                error={
                  formik.touched.publishedYear &&
                  Boolean(formik.errors.publishedYear)
                }
                helperText={
                  formik.touched.publishedYear && formik.errors.publishedYear
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
                size="small"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                error={
                  formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                }
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookFormModal;

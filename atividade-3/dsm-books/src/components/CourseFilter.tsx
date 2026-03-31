import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography, Box } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
  const { books } = useBooks();
  
  // Estados filtros 
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | "">("");

  // Listas Selects 
  const courses = [...new Set(books.map(book => book.course))];
  const semesters = [...new Set(books.map(book => book.semester))].sort((a, b) => a - b);

  // Lógica de filtro combinada (Atividade 3) 
  const filteredBooks = books.filter(book => {
    const matchCourse = selectedCourse === "" || book.course === selectedCourse;
    const matchSemester = selectedSemester === "" || book.semester === selectedSemester;
    return matchCourse && matchSemester;
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Filtrar Livros</Typography>

      {/* Filtro por Disciplina */}
      <Typography variant="body1">Disciplina:</Typography>
      <Select 
        value={selectedCourse} 
        onChange={e => setSelectedCourse(e.target.value)} 
        fullWidth 
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Todas as Disciplinas</MenuItem>
        {courses.map(course => (
          <MenuItem key={course} value={course}>{course}</MenuItem>
        ))}
      </Select>

      {/* Filtro por Semestre */}
      <Typography variant="body1">Semestre:</Typography>
      <Select 
        value={selectedSemester} 
        onChange={e => setSelectedSemester(e.target.value as number | "")} 
        fullWidth 
        sx={{ mb: 3 }}
      >
        <MenuItem value="">Todos os Semestres</MenuItem>
        {semesters.map(sem => (
          <MenuItem key={sem} value={sem}>{sem}º Semestre</MenuItem>
        ))}
      </Select>

      {/* Resultados */}
      <Typography variant="h6">Resultados ({filteredBooks.length}):</Typography>
      {filteredBooks.map((book, idx) => (
        <Typography key={idx} sx={{ mt: 1, p: 1, borderBottom: '1px solid #ccc' }}>
          <strong>{book.title}</strong> <br/>
          {book.course} - {book.semester}º Semestre
        </Typography>
      ))}
    </Box>
  );
}
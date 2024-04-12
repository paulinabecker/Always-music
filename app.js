import pg from "pg";
const { Pool } = pg;

const config = {
  user: "postgres",
  host: "localhost",
  database: "always music",
  password: "Pauli1989+",
  port: 5432,
};

const pool = new Pool(config);

// Función para registrar un nuevo estudiante
async function registrarEstudiante(nombre, rut, curso, nivel) {
  try {
    // Validar que ninguno de los datos sea null o undefined
    if (!nombre || !rut || !curso || !nivel) {
      throw new Error('Todos los campos son obligatorios.');
    }
    
    const query = 'INSERT INTO estudiantes(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4)';
    const values = [nombre, rut, curso, nivel];
    const result = await pool.query(query, values);
    console.log('Estudiante registrado correctamente.');
    return result.rows;
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
  }
}

// Función para obtener un estudiante por su rut
async function obtenerEstudiantePorRut(rut) {
  try {
    const query = 'SELECT * FROM estudiantes WHERE rut = $1';
    const result = await pool.query(query, [rut]);

    if (result.rows.length > 0) {
      const estudiante = result.rows[0];
      console.log('Estudiante encontrado:');
      console.log(`Nombre: ${estudiante.nombre}, Rut: ${estudiante.rut}, Curso: ${estudiante.curso}, Nivel: ${estudiante.nivel}`);
      return estudiante;
    } else {
      console.log('No se encontró ningún estudiante con el rut proporcionado.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener estudiante por rut:', error);
  }
}

// Función para obtener todos los estudiantes
async function obtenerTodosLosEstudiantes() {
  try {
    const query = 'SELECT nombre, rut, curso, nivel FROM estudiantes'; // Selección explícita de los campos para evitar datos nulos
    const result = await pool.query(query);
    console.log('Estudiantes:');
    result.rows.forEach(estudiante => {
      console.log(`Nombre: ${estudiante.nombre}, Rut: ${estudiante.rut}, Curso: ${estudiante.curso}, Nivel: ${estudiante.nivel}`);
    });
    return result.rows;
  } catch (error) {
    console.error('Error al obtener todos los estudiantes:', error);
  }
}

// Función para actualizar los datos de un estudiante
async function actualizarEstudiante(nombre, rut, curso, nivel) {
  try {
    const query = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4';
    const values = [nombre, curso, nivel, rut];
    const result = await pool.query(query, values);
    console.log('Estudiante actualizado correctamente.');
    return result.rows;
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
  }
}

// Función para eliminar un estudiante por su rut
async function eliminarEstudiantePorRut(rut) {
  try {
    const query = 'DELETE FROM estudiantes WHERE rut = $1';
    const result = await pool.query(query, [rut]);
    console.log('Estudiante eliminado correctamente.');
    return result.rows;
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
  }
}




/*CONSULTAS
registrarEstudiante('Camila Salas', '24576891-8', 'Guitarra', 'Principiante');
obtenerEstudiantePorRut('34567890-1');
obtenerTodosLosEstudiantes();
actualizarEstudiante();
eliminarEstudiantePorRut('24576891-8');
*/














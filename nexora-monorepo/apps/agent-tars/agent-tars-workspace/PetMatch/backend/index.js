const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/petmatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a PetMatch Backend');
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

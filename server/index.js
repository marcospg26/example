const express = require('express');
const app = express();

app.get('/api/example', (req, res) => {
    res.json({ message: 'Este es un ejemplo de respuesta desde el servidor Node.js' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

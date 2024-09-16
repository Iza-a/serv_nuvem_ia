const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Conexão com o MongoDB Atlas
const dbURI = 'mongodb+srv://almeidaizabellyfernanda:TR1Ape4uvCJ@cluster0.tjqy0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));

// Definir o Schema do MongoDB
const historicoSchema = new mongoose.Schema({
  userId: String,
  acao: String,
  data: { type: Date, default: Date.now }
});

// Criar o Model
const Historico = mongoose.model('Historico', historicoSchema);

// Endpoint para registrar uma ação no histórico
app.post('/registrar-acao', async (req, res) => {
  const { userId, acao } = req.body;

  const novoRegistro = new Historico({
    userId,
    acao
  });

  try {
    await novoRegistro.save();
    res.status(200).send('Ação registrada com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao registrar ação: ' + error.message);
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

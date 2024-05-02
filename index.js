const bodyParser = require("body-parser")
const express = require('express'); 

const app = express()
app.use(bodyParser.json())

let livros = []

app.get('/livros', (req, res) => {
    res.json(livros)
})

app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = livros.find(l => l.id == id);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

app.post('/livros', (req, res) => {
    const { id, nome, autor, ano } = req.body;
    const livro = { id, nome, autor, ano };
    livros.push(livro);
    res.status(201).json({ message: 'Livro cadastrado com sucesso.' });
});

app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { nome, autor, ano } = req.body;
    const livro = livros.find(l => l.id == id);
    if (livro) {
        livro.nome = nome || livro.nome;
        livro.autor = autor || livro.autor;
        livro.ano = ano || livro.ano;
        res.json({ message: 'Informações do Livro atualizadas com sucesso.' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});


app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livroIndex = livros.findIndex(l => l.id == id);
    if (livroIndex !== -1) {
        livros.splice(livroIndex, 1);
        res.json({ message: 'Livro excluído com sucesso.' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});


const port = 3000; 
app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`); 
});


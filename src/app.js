const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
    ? repositories.filter()
    : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const likes = 0;

  const repositorie = { id: uuid(), url, title, techs, likes }

  repositories.push(repositorie);

  return response.status(201).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  let { url, title, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({ error: 'Repositorie not found!' });
  }

  url = url !== undefined ? url : repositories[repositorieIndex].url;
  title = title !== undefined ? title : repositories[repositorieIndex].title;
  techs = techs !== undefined ? techs : repositories[repositorieIndex].techs;
  const likes = repositories[repositorieIndex].likes;

  const repositorie = {
    id,
    url,
    title,
    techs,
    likes,
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({ error: 'Repositorie not found!' });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({ error: 'Repositorie not found!' });
  }

  repositories[repositorieIndex].likes++;

  return response.json(repositories[repositorieIndex]);
});

module.exports = app;

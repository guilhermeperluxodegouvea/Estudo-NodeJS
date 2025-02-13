// CRIANDO O SERVIDOR COM O FASTIFY

// importando fastify do fastify
import { fastify } from "fastify";

// importando a database de teste
import { DatabaseMemory } from "./database-memory.js";

// Criando o servidor
const server = fastify();

// Criando a database
const database = new DatabaseMemory();

server.post("/videos", (request, response) => {
    const { title, description, duration } = request.body;

    database.create({
        title,
        description,
        duration,
    });

    return response.status(201).send();
});

server.get("/videos", (request) => {
    const search = request.query.search;

    const videos = database.list(search);

    return videos;
});

// Route Parameter é passado na rotas com ":"
server.put("/videos/:id", (request, response) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    database.update(videoId, {
        title,
        description,
        duration,
    });

    return response.status(204).send();
});

server.delete("/videos/:id", (request, response) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return response.status(204).send();
});

// botar pra rodar
server.listen({
    port: 3333,
});

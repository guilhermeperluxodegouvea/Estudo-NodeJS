// Gerador de ID aleatório pra cada video ter
import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    // map() é uma estrutura de dados que não aceita chaves duplicadas
    #videos = new Map();

    // Retorna todos os videos
    list(search) {
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0];
                const data = videoArray[1];

                return {
                    id,
                    ...data,
                };
            })
            .filter((video) => {
                if (search) {
                    return video.title.includes(search);
                }

                return true;
            });
    }

    // Cria um ID aleatório pro vídeo e salva banco de dados local
    create(video) {
        const videoId = randomUUID();

        this.#videos.set(videoId, video);
    }

    // Atualiza um video
    update(id, video) {
        this.#videos.set(id, video);
    }

    // Deleta um video do banco de dados local
    delete(id) {
        this.#videos.delete(id);
    }
}

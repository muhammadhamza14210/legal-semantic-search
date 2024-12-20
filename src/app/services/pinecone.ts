import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
});

export async function createIndexIfNecessary(indexTarget: string) {
  console.log(`Creating index: ${indexTarget}`);
}

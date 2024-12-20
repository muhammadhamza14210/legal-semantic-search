import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string
});

export async function createIndexIfNecessary(indexTarget: string) {
    await pinecone.createIndex({
      name: indexTarget,
      dimension: 1024,
      spec:{
        serverless: {
            cloud: "aws",
            region:"us-east-1",
        },
      },
      waitUntilReady: true,
      suppressConflicts: true
    });
}

export async function indexHasVectors(indexName: string): Promise<boolean> {
    try {
        const targetIndex = pinecone.index(indexName);
        const stats = await targetIndex.describeIndexStats();
        return (stats.totalRecordCount && stats.totalRecordCount > 0) ? true : false;
    } catch (error) {
        console.error('Failed to fetch index stats for index');
        return false;
    }
}
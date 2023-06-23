import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

export interface EmbeddingWithText {
  text: string;
  embedding: string;
}

export async function createEmbeddings(
  text: string,
): Promise<EmbeddingWithText[]> {
  await tf.setBackend('webgl');

  const model: use.UniversalSentenceEncoder = await use.load();
  const sentences: string[] = text.split('.').filter(Boolean);
  const embeddings: tf.Tensor = await model.embed(sentences);

  // Convert Tensor to Array
  const embeddingArray: number[][] = (await embeddings.array()) as number[][];

  // Convert each sentence's embedding to PGVector format
  const embeddingsWithText: EmbeddingWithText[] = embeddingArray.map(
    (sentenceEmbedding, index) => {
      const pgVector: string = '[' + sentenceEmbedding.join(',') + ']';
      return {
        text: sentences[index],
        embedding: pgVector,
      };
    },
  );

  return embeddingsWithText;
}

import { ChangeEvent, FormEvent, useState } from 'react';
import { createEmbeddings, EmbeddingWithText } from '../utils/createEmbedding';
import { useSupabase } from '../supabase/supabase-provider';

const TextToEmbedding = (): JSX.Element => {
  const { supabase } = useSupabase();
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Generieren Sie die Texteinbettungen mithilfe der createEmbeddings-Funktion
      const embeddings: EmbeddingWithText[] = await createEmbeddings(text);

      // Speichern Sie die Einbettungen in der Supabase-Datenbank
      const { error }: { error: any | null } = await supabase
        .from('books')
        .insert(
          embeddings.map(({ text, embedding }) => ({
            author: 'Autorname',
            title: 'Buchtitel',
            publication_date: new Date(),
            content: text,
            embedding: embedding,
          })),
        );

      if (error) {
        throw error;
      }

      setText('');
      alert('Text erfolgreich eingebettet und in der Datenbank gespeichert!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <input type="text" value={text} onChange={handleTextChange} />
        </label>
        <input type="submit" value="Submit" disabled={isLoading} />
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TextToEmbedding;

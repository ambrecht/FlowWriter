'use client';

import { useSupabase } from '@/supabase/supabase-provider';
import Writter from '../components/writter';
import Login from '../components/login';
import UserList from '@/components/UserList';
import Logout from '@/components/logout';
import NoteList from '@/components/notesList';
import { SearchComponent } from '@/components/searchNotes';
import Github from '../components/github';
import TextToEmbedding from '@/components/Text2Embeddings';

export default function Home() {
  const { supabase, session } = useSupabase();

  if (!session) {
    return <Login />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Writter />
      <NoteList />
      <SearchComponent />
      <UserList />
      <Logout />
      <Github />
      <TextToEmbedding />
    </div>
  );
}

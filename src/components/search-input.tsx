'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

function SearchInput() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('searchTerm') as string;

    if (searchTerm) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center px-5 rounded-xl border-white bg-white border shadow-lg"
    >
      <Link
        href="/"
        className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100"
      >
        <p className="text-3xl font-extrabold font-host-grotesk text-[#54008f]">
          Recommen
        </p>
        <Home className="h-10 w-10 text-gray-300" />
      </Link>
      <input
        type="text"
        className="flex-1 p-5 outline-none placeholder:text-gray-400/80"
        name="searchTerm"
        placeholder="あなたはどんな種類の映画が好きですか？ 映画タイトルやジャンルなどで検索できます..."
      />
    </form>
  );
}

export default SearchInput;

import MoviePoster from '@/components/movie-poster';
import { mockMovies } from '@/data/movie-mock-data';

async function SearchTermPage({
  params: { term },
}: {
  params: {
    term: string;
  };
}) {
  const decodedTerm = decodeURIComponent(term);

  const similarMovies = mockMovies.filter(
    (movie) =>
      movie.Title.toLowerCase().includes(decodedTerm.toLowerCase()) ||
      movie.Genre.toLowerCase().includes(decodedTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col items-center justify-center p-20 pt-10">
      <h1 className="mb-10 text-xl text-gray-100">
        検索結果: 「{decodedTerm}」 にもとづくおすすめ映画
      </h1>

      {similarMovies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {similarMovies.map((movie, i) => (
            <div
              className="flex space-x-2 relative"
              key={movie._id}
            >
              <p className="absolute flex items-center justify-center top-6 left-10 text-white font-extrabold text-xl z-40 rounded-full bg-indigo-500/80 w-10 h-10">
                {i + 1}
              </p>

              <MoviePoster
                key={movie._id}
                movie={movie}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-800/60 text-center">
          <p className="text-xl">検索結果が見つかりませんでした</p>
          <p className="mt-2">別のキーワードで検索してみてください</p>
        </div>
      )}
    </div>
  );
}

export default SearchTermPage;

import Image from 'next/image';
import { notFound } from 'next/navigation';

import MoviePoster from '@/components/movie-poster';
import { mockMovies } from '@/data/movie-mock-data';

async function MovieIdPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  // モックデータから対象の映画を検索
  const movie = mockMovies.find((movie) => movie._id === id);

  if (!movie) {
    return notFound();
  }

  // 類似映画を取得
  const similarMovies = mockMovies
    .filter((m) => m._id !== movie._id) // 自分自身を除外
    .slice(0, 5); // 最大5つの類似映画を取得

  // 映画情報の項目を定義
  const movieDetails = [
    { label: '監督', value: movie.Director },
    { label: '出演', value: movie.Actors },
    { label: '興行収入', value: movie.BoxOffice },
    { label: '公開日', value: movie.Released },
    { label: '上映時間', value: movie.Runtime },
    { label: '評価', value: movie.Rated },
    { label: 'IMDB評価', value: movie.imdbRating },
    { label: '言語', value: movie.Language },
    { label: '制作国', value: movie.Country },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start gap-y-10 p-10 pb-0">
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={300}
          height={450}
          className="shrink-0 rounded-lg"
        />
        <div className="px-2 md:px-10 flex flex-col gap-y-2 w-full">
          <h1 className="text-4xl md:text-6xl font-bold">{movie.Title}</h1>
          <p className="text-gray-600">{movie.Genre}</p>
          <p className="font-light">{movie.$vectorize}</p>

          <div className="mt-5 w-full space-y-2">
            {movieDetails.map((detail, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row pb-2"
              >
                <div className="font-semibold w-full md:w-1/4 text-gray-700">
                  {detail.label}
                </div>
                <div className="w-full md:w-3/4">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-3xl pt-10 pl-10 font-bold">おすすめの映画</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {similarMovies.map((movie, i) => (
            <MoviePoster
              key={movie._id}
              index={i + 1}
              similarityRating={Number(movie.$similarity.toFixed(2)) * 100}
              movie={movie}
              isSimilarity
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieIdPage;

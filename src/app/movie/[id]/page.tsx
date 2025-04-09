import Image from 'next/image';
import { notFound } from 'next/navigation';

import MoviePoster from '@/components/movie-poster';
import db from '@/lib/db';

import type { Movie, SimilarMovie } from '@/types';

const SIMILAR_MOVIES_LIMIT = 5;

async function MovieIdPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const movies = db.collection('movies');

  const { id } = await params;
  const search = await movies.find(
    { $and: [{ _id: id }] },
    { projection: { $vector: 1 } },
  );

  if (!(await search.hasNext())) {
    return notFound();
  }

  const movie = (await search.next()) as Movie;
  console.log('movie.$vector', movie.$vector);
  const similarMovies = (await movies
    .find(
      {},
      {
        vector: movie.$vector,
        limit: SIMILAR_MOVIES_LIMIT + 1,
        includeSimilarity: true,
      },
    )
    .toArray()) as SimilarMovie[];

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
              similarityRating={
                movie.$similarity &&
                Number(movie.$similarity.toFixed(2)) * 100
              }
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

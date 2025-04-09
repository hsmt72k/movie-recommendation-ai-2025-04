import Link from 'next/link';

import ImageWithFallback from '@/components/image-with-fallback';
import { cn } from '@/lib/utils';
import { Movie, SimilarMovie } from '@/types';

function MoviePoster({
  index,
  similarityRating,
  movie,
  isSimilarity,
}: {
  index?: number;
  similarityRating?: number;
  movie: Movie | SimilarMovie;
  isSimilarity?: boolean;
}) {
  return (
    <Link
      key={movie._id}
      href={`/movie/${movie._id}`}
      className="flex flex-col items-center justify-center"
    >
      <div>
        <ImageWithFallback
          className={cn(
            'object-cover rounded-lg shadow-lg',
            isSimilarity && '-ml-28 min-w-32 max-w-32',
            !isSimilarity && 'min-w-64 max-w-64 h-96',
          )}
          src={movie.Poster}
          alt={movie.Title}
          isSimilarity={isSimilarity}
        />
      </div>
      <div className="relative">
        {similarityRating && (
          <div className="absolute -left-12 w-14 h-14 flex items-center justify-center bottom-0 right-0 bg-orange-300 bg-opacity-90 p-2 rounded-full m-5 font-bold">
            {similarityRating}%
          </div>
        )}

        {index && (
          <div className="absolute text-white/40 -top-48 left-8 text-9xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
            {index}
          </div>
        )}
      </div>

      <div className="px-4 py-2">
        <p
          className={cn(
            'text-lg font-semibold line-clamp-1',
            isSimilarity && 'w-32',
            !isSimilarity && 'min-w-64 max-w-64',
          )}
        >
          {movie.Title}
        </p>
        <p className="text-gray-500 line-clamp-1">{movie.Genre}</p>
      </div>
    </Link>
  );
}

export default MoviePoster;

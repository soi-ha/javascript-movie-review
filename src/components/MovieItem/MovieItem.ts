import './MovieItem.css';
import { POSTER_BASE_URL } from '../../constants/rule';
import ModalController from '../../controller/ModalController';
import MovieDetailService from '../../services/MovieDetailService';
import NoPosterImage from '../../statics/images/no_poster_image.png';
import StarFilled from '../../statics/images/star_filled.png';

const createTitle = (title: string) => {
  const $title = document.createElement('p');
  $title.classList.add('item-title');
  $title.textContent = title;
  return $title;
};

const createScore = (vote_average: number) => {
  const $score = document.createElement('p');
  $score.classList.add('item-score');

  const $scoreImg = document.createElement('img');
  $scoreImg.src = StarFilled;
  $scoreImg.alt = '별점';
  $score.textContent = vote_average.toFixed(1);
  $score.appendChild($scoreImg);

  return $score;
};

const createThumbnail = (title: string, poster_path: string) => {
  const $thumbnail = document.createElement('img');
  $thumbnail.classList.add('item-thumbnail');
  $thumbnail.src = `${POSTER_BASE_URL}${poster_path}`;
  $thumbnail.onerror = () => {
    $thumbnail.src = NoPosterImage;
  };
  $thumbnail.loading = 'lazy';
  $thumbnail.alt = `${title} 포스터`;

  return $thumbnail;
};

const createCard = ({
  title,
  poster_path,
  vote_average,
}: Pick<Movie, 'title' | 'poster_path' | 'vote_average'>) => {
  const $card = document.createElement('button');
  $card.classList.add('item-card');

  const $thumbnail = createThumbnail(title, poster_path);
  const $title = createTitle(title);
  const $score = createScore(vote_average);

  $card.appendChild($thumbnail);
  $card.appendChild($title);
  $card.appendChild($score);

  return $card;
};

const MovieItem = (movie: Movie) => {
  const $li = document.createElement('li');
  const $card = createCard(movie);

  const render = () => {
    $li.id = movie.id.toString();
    $li.appendChild($card);

    return $li;
  };

  $card.addEventListener('click', () => {
    MovieDetailService.fetchDetailMovie(movie.id).then((res) => {
      ModalController.openModal(res);
      ModalController.closeModal();
    });
  });

  return {
    render,
  };
};
export default MovieItem;

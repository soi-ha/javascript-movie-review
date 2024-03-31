import CloseBtn from '../../statics/images/close_button.png';
import StartEmpty from '../../statics/images/star_empty.png';
import StarFilled from '../../statics/images/star_filled.png';
import './Modal.css';

const createHeader = (title: string) => {
  const $header = document.createElement('div');
  $header.classList.add('modal-body__header');

  const $movieTitle = document.createElement('span');
  $movieTitle.classList.add('modal-body__movie-title');
  $movieTitle.textContent = title;

  const $closeBtn = document.createElement('button');
  $closeBtn.classList.add('modal-body__close-btn');
  $closeBtn.type = 'button';

  const $closeImg = document.createElement('img');
  $closeImg.src = CloseBtn;
  $closeImg.alt = '창 닫기';

  $closeBtn.appendChild($closeImg);

  $header.appendChild($movieTitle);
  $header.appendChild($closeBtn);

  return $header;
};

const createInfoBox = (vote_average: number, genres: Genre[]) => {
  const $infoBox = document.createElement('div');
  $infoBox.classList.add('modal-body__info-box');

  const $genre = document.createElement('span');
  $genre.classList.add('"modal-body__genre');

  const genreName = genres.map((genre) => genre.name);
  $genre.textContent = genreName.join(', ');

  const $voteAverage = document.createElement('div');
  $voteAverage.classList.add('modal-body__vote-average');

  const $starImg = document.createElement('img');
  $starImg.classList.add('modal-body__star-img');
  $starImg.src = StarFilled;
  $starImg.alt = '별점';

  const $starNumber = document.createElement('span');
  $starNumber.classList.add('modal-body__star-number');
  $starNumber.textContent = vote_average.toFixed(1);

  $voteAverage.appendChild($starImg);
  $voteAverage.appendChild($starNumber);

  $infoBox.appendChild($genre);
  $infoBox.appendChild($voteAverage);

  return $infoBox;
};

const createUserRating = () => {
  const $userRating = document.createElement('div');
  $userRating.classList.add('modal-body__user-rating');

  const $title = document.createElement('p');
  $title.classList.add('modal-body__user-rating-title');
  $title.textContent = '내 별점';

  const $starBox = document.createElement('div');
  $starBox.classList.add('modal-body__star-box');

  ['별로에요', '그냥 그래요', '보통이에요', '좋아요', '최고에요'].forEach(
    (starText) => {
      const $star = document.createElement('img');
      $star.src = StartEmpty;
      $star.alt = starText;

      $starBox.appendChild($star);
    },
  );

  const $ratingNumber = document.createElement('p');
  $ratingNumber.classList.add('modal-body__star-box__rating-number');
  $ratingNumber.textContent = '6';

  const $ratingText = document.createElement('p');
  $ratingText.classList.add('modal-body__star-box__rating-text');
  $ratingText.textContent = '보통이에요';

  $userRating.appendChild($title);
  $userRating.appendChild($starBox);
  $userRating.appendChild($ratingNumber);
  $userRating.appendChild($ratingText);

  return $userRating;
};

const createContent = (movie: Movie) => {
  const $content = document.createElement('div');
  $content.classList.add('modal-body__content');

  const $infoBox = createInfoBox(movie.vote_average, movie.genres as Genre[]);

  const $overview = document.createElement('div');
  $overview.classList.add('modal-body__overview');
  $overview.textContent =
    movie.overview === ''
      ? '영화 설명이 존재하지 않습니다.'
      : (movie.overview as string);

  const $userRating = createUserRating();

  $content.appendChild($infoBox);
  $content.appendChild($overview);
  $content.appendChild($userRating);

  return $content;
};

const createDetail = (movie: Movie) => {
  const $detail = document.createElement('div');
  $detail.classList.add('modal-body__detail');

  const $poster = document.createElement('img');
  $poster.classList.add('modal-body__poster');
  $poster.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
  $poster.alt = `${movie.title} 포스터`;

  const $content = createContent(movie);

  $detail.appendChild($poster);
  $detail.appendChild($content);

  return $detail;
};

const createBody = (movie: Movie) => {
  const $body = document.createElement('div');
  $body.classList.add('modal-body');

  const $header = createHeader(movie.title);
  const $detail = createDetail(movie);

  $body.appendChild($header);
  $body.appendChild($detail);

  return $body;
};

const createModal = (movie: Movie) => {
  const $modal = document.createElement('div');
  $modal.classList.add('modal');

  const $backdrop = document.createElement('div');
  $backdrop.classList.add('modal-backdrop');

  const $body = createBody(movie);

  $modal.appendChild($backdrop);
  $modal.appendChild($body);

  return $modal;
};

function Modal(movie: Movie) {
  return {
    render: () => {
      const $modal = createModal(movie);
      return $modal;
    },
  };
}
export default Modal;

import './MovieList.css';
import movieStore from '../../stores/movieStore';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MovieItem from '../MovieItem/MovieItem';

const getSearchQuery = ($title: HTMLElement) => {
  if ($title && $title.textContent) return $title.textContent.split('"')[1];
};

const MovieList = ({
  title,
  type,
  isLastPage,
}: {
  title: string;
  type: string;
  isLastPage: boolean;
}) => {
  const $section = document.createElement('section');
  const $title = document.createElement('h2');
  const $ul = document.createElement('ul');
  const $loadMoreBtn = LoadMoreButton().render();

  const render = () => {
    $section.classList.add('item-view');

    $title.textContent = title;

    $ul.classList.add('item-list');
    movieStore.movies.forEach((movie) => {
      const $movieItem = MovieItem(movie).render();
      $ul.appendChild($movieItem);
    });

    $loadMoreBtn.setAttribute('list-type', type);

    $section.appendChild($title);
    $section.appendChild($ul);
    if (!isLastPage) $section.appendChild($loadMoreBtn);

    return $section;
  };

  $loadMoreBtn.addEventListener('click', () => {
    $loadMoreBtn.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        detail: {
          curType: type,
          query: getSearchQuery($title),
        },
      }),
    );
  });

  return {
    render,
  };
};
export default MovieList;

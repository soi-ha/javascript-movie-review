import Logo from '../../statics/images/logo.png';
import SearchInput from '../SearchInput/SearchInput';
import './Header.css';

const createLogo = () => {
  const $h1 = document.createElement('h1');
  const $span = document.createElement('span');
  const $img = document.createElement('img');

  $span.textContent = 'MovieList';
  $span.classList.add('sr-only');
  $img.src = Logo;
  $img.alt = '';

  $h1.appendChild($span);
  $h1.appendChild($img);
  return $h1;
};

const createHeader = () => {
  const $header = document.createElement('header');
  const $logo = createLogo();
  const $searchBox = SearchInput().render();

  $header.appendChild($logo);
  $header.appendChild($searchBox);
  return $header;
};

function Header() {
  return {
    render: () => {
      const $header = createHeader();
      return $header;
    },
  };
}

export default Header;

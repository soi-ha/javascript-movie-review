const createSearchBox = () => {
  const $searchBox = document.createElement('div');
  $searchBox.classList.add('search-box');
  return $searchBox;
};

const SearchInput = () => {
  const $searchBox = createSearchBox();
  const $searchInput = document.createElement('input');
  const $searchBtn = document.createElement('button');

  const render = () => {
    $searchInput.type = 'text';
    $searchInput.placeholder = '검색';
    $searchInput.classList.add('search-input');

    $searchBtn.type = 'button';
    $searchBtn.classList.add('search-button');
    $searchBtn.textContent = '검색';

    $searchBox.innerHTML = '';

    $searchBox.appendChild($searchInput);
    $searchBox.appendChild($searchBtn);

    return $searchBox;
  };

  if (window.innerWidth <= 390) {
    $searchInput.classList.add('visibility-hidden');
    $searchBtn.addEventListener('click', () => {
      $searchBox.classList.toggle('click-input-box');
      $searchInput.classList.toggle('visibility-hidden');
    });
  }

  $searchInput.addEventListener('keydown', (e) => {
    const { target } = e;
    const { key } = e as KeyboardEvent;

    if (e.isComposing) return;
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      $searchInput.dispatchEvent(
        new CustomEvent('search', {
          bubbles: true,
          detail: {
            query: target.value,
          },
        }),
      );
    }
  });

  $searchInput.addEventListener('input', (e) => {
    const { target } = e;
    if (target instanceof HTMLInputElement && target.value === '') {
      $searchInput.dispatchEvent(
        new CustomEvent('popular', {
          bubbles: true,
          detail: {
            curType: 'search',
          },
        }),
      );
    }
  });

  if (window.innerWidth > 390) {
    $searchBtn.addEventListener('click', () => {
      const { value } = $searchInput as HTMLInputElement;
      $searchInput.dispatchEvent(
        new CustomEvent('search', {
          bubbles: true,
          detail: {
            query: value,
          },
        }),
      );
    });
  }

  return {
    render,
  };
};

export default SearchInput;

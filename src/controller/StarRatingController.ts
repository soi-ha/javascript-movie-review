import {
  LocalStorageService,
  StarRating,
} from '../services/LocalStorageService';
import StarEmpty from '../statics/images/star_empty.png';
import StarFilled from '../statics/images/star_filled.png';

const StarRatingController = {
  changeStarFilled(movieId: number) {
    const $starBtns = document.querySelectorAll('.modal-body__star-btn');
    const $ratingNumber = document.querySelector(
      '.modal-body__star-box__rating-number',
    );
    const $ratingText = document.querySelector(
      '.modal-body__star-box__rating-text',
    );

    function startIdToRatingNumber(starId: number) {
      return starId * 2;
    }

    function updateStars(starId: number, ratingText: string) {
      $starBtns.forEach((button, index) => {
        const currentId: number = index + 1;
        const $starImg = button.querySelector('img') as HTMLImageElement;
        if (currentId <= starId) {
          $starImg.src = StarFilled;
        } else {
          $starImg.src = StarEmpty;
        }
      });

      if ($ratingNumber) {
        $ratingNumber.textContent = startIdToRatingNumber(starId).toString();
      }
      if ($ratingText) {
        $ratingText.textContent = ratingText;
      }
    }

    function updateMovieRatingInLocalStorage(
      starId: number,
      ratingText: string,
    ) {
      const ratingData: StarRating[] =
        LocalStorageService.getData('starRating');
      const rating = ratingData?.find((item) => item.id === movieId);

      if (!rating) {
        const newRatingData = [
          ...(ratingData || []),
          {
            id: movieId,
            ratingNumber: startIdToRatingNumber(starId),
            ratingText,
          },
        ];
        LocalStorageService.setData('starRating', newRatingData);
      } else {
        rating.ratingNumber = startIdToRatingNumber(starId);
        rating.ratingText = ratingText;
        LocalStorageService.setData('starRating', ratingData);
      }
    }

    $starBtns.forEach((button, index) => {
      button.addEventListener('click', () => {
        const starId: number = index + 1;
        const ratingText = button.querySelector('img')?.alt as string;
        updateStars(starId, ratingText);
        updateMovieRatingInLocalStorage(starId, ratingText);
      });
    });
  },
};

export default StarRatingController;

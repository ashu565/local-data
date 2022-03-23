const cardParent = document.querySelector('.cards');
const page = window.location.search;
const params = new URLSearchParams(page);

cardParent.addEventListener('click', function (e) {
  console.log(e.target.dataset.data);
});

function setPage(str) {
  window.location.search = str;
}
(() => {
  const PAGE = params.get('page');
  if (!PAGE) {
    params.set('page', 1);
    setPage(params.toString());
  }
  const search = params.get('query');
  fetch(
    `http://localhost:3000/api/v1/scrap/get-all-scrapped-videos?page=${PAGE}&query=${search}`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((res) => {
      res.videos.map((CD, idx) => {
        const div = document.createElement('div');
        div.setAttribute('data', idx);
        div.addEventListener(
          'click',
          (e) => {
            console.log(div.getAttribute('data'));
          },
          { capture: true }
        );
        const href = CD?.link || 'https://google.com';
        div.innerHTML = `
            <div class="card" style="width: 18rem">
            <img src="${CD.thumbnail}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${CD.title}</h5>
                    <p class="card-text">
                        ${CD.channelAbout.substr(
                          0,
                          Math.min(CD.channelAbout.length, 50)
                        )}${CD.channelAbout.length > 50 ? '...' : ''}
                    </p>
                    <a href="${href}" class="btn btn-primary">Go to the Detail's</a>
                </div>
            </div>
        `;
        cardParent.appendChild(div);
      });
    });
})();
const pagination = document.querySelector('.pagination');
pagination.addEventListener('click', (e) => {
  const T = e.target.innerText;
  const page = parseInt(params.get('page'));
  if (T === 'Previous') {
    if (page > 1) {
      params.set('page', page - 1);
      setPage(params.toString());
    }
  }
  if (T === 'Next') {
    if (page < 9) {
      params.set('page', page + 1);
      setPage(params.toString());
    }
  }
});
// pagination.

const input = document.getElementById('input-box');
// input.addEventListener('input', (e) => {
//   console.log(e.target.value);
// });

const searchEvent = document.getElementById('submit');

searchEvent.addEventListener('click', function (e) {
  e.preventDefault();
  const search = input.value;
  if (search) {
    params.set('query', search);
    setPage(params.toString());
  }
});

// cardParent.addEventListener(
//   'click',
//   function (e) {
//     console.log(e.target.nodeName);
//   },
//   true
// );

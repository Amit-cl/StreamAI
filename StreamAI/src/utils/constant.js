export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI3MzUwYWJkM2JmNTI5ZmRlZWI4ZDZlNjVkNzI5NyIsIm5iZiI6MTc2OTc1NDUxOS40NjMsInN1YiI6IjY5N2M0Zjk3ZjYxYzdmMzA0M2ZlZTQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bez2HlwaD5XwcY-rhWP_WlHVqIIL8Z26dw_Tn1UVp54',
  },
}

export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500'

export const USER_AVATAR =
  'https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e'
export const BG_URL =
  'https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg'
export const SUPPORTED_LANGUAGES = [
  { identifier: 'en', name: 'English' },
  { identifier: 'hindi', name: 'Hindi' },
  { identifier: 'spanish', name: 'Spanish' },
]

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;
export const GROQ_KEY = import.meta.env.VITE_GROQ_KEY;
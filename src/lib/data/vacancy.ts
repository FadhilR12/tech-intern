// TODO
// 1, membuat const array of object vacancies, views, (optional)totalViews
// 2. buat const dari data.json
// 3. export const lalu pakai di server.js
// 4. gunakan const ini sebagai api (api )

import data from './data.json' with { type: 'json' }
export const vacancies = [...data.vacancy];
export const views = [...data.view];
export const totalViews = [...data.totalView];

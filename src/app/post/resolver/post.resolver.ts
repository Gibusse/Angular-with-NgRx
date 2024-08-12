import { ResolveFn } from '@angular/router';

export const postResolver: ResolveFn<string | null> = (route, _) => {
  const postId = route.paramMap.get('id');
  return postId || '';
};

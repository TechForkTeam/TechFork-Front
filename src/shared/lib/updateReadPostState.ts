/** old: 현재 캐시 데이터*/
/** postId: 읽은 글*/

export const updateReadPostState = (old: any, postId: number) => {
  if (!old) return old;

  /**patchPost: id또는 postId가 일치하면 viewCount를 증가시킨다.*/
  const patchPost = (post: any) =>
    post.id === postId || post.postId === postId
      ? { ...post, viewCount: (post.viewCount ?? 0) + 1 }
      : post;

  if (old.pages && Array.isArray(old.pages)) {
    /**무한스크롤 데이터 */
    return {
      ...old,
      pages: old.pages.map((page: any) => {
        const dataKey = page.data?.posts
          ? "posts"
          : page.data?.readPosts
            ? "readPosts"
            : page.data?.bookmarks
              ? "bookmarks"
              : null;

        if (!dataKey || !page.data[dataKey]) return page;

        return {
          ...page,
          data: {
            ...page.data,
            [dataKey]: page.data[dataKey].map(patchPost),
          },
        };
      }),
    };
  }

  if (old.recommendations) {
    /** 추천 목록이 root에 있을때*/
    return {
      ...old,
      recommendations: old.recommendations.map(patchPost),
    };
  }

  if (old.data?.recommendations) {
    return {
      ...old,
      data: {
        ...old.data,
        recommendations: old.data.recommendations.map(patchPost),
      },
    };
  }

  if (Array.isArray(old)) {
    return old.map(patchPost);
  }

  if (old.data && Array.isArray(old.data)) {
    /** 그냥 배열*/
    return {
      ...old,
      data: old.data.map(patchPost),
    };
  }

  return old;
};

//낙관적 업데이트
export const updateBookmarkState = (
  old: any,
  postId: number,
  isBookmarked: boolean,
) => {
  if (!old) return old;

  // 1. 무한 스크롤 구조 (pages > data > posts)
  if (old.pages) {
    return {
      ...old,
      pages: old.pages.map((page: any) => ({
        ...page,
        data: {
          ...page.data,
          posts: page.data.posts.map((post: any) =>
            post.id === postId || post.postId === postId
              ? { ...post, isBookmarked }
              : post,
          ),
        },
      })),
    };
  }

  // 2. 일반 리스트 구조 (recommendations가 최상위)
  if (old.recommendations) {
    return {
      ...old,
      recommendations: old.recommendations.map((post: any) =>
        post.postId === postId || post.id === postId
          ? { ...post, isBookmarked }
          : post,
      ),
    };
  }

  // 3. Suspense/Data 래핑 구조 (data > recommendations)
  if (old.data && old.data.recommendations) {
    return {
      ...old,
      data: {
        ...old.data,
        recommendations: old.data.recommendations.map((post: any) =>
          post.postId === postId || post.id === postId
            ? { ...post, isBookmarked }
            : post,
        ),
      },
    };
  }

  return old;
};

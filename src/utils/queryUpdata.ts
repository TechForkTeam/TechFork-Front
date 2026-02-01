//낙관적 업데이트
export const updateBookmarkState = (
  old: any,
  postId: number,
  isBookmarked: boolean,
) => {
  // console.log("업뎃데이터", old);
  if (!old) return old;

  //데이터 구조에 따른 분기
  if (Array.isArray(old)) {
    return old.map((post: any) =>
      post.id === postId || post.postId === postId
        ? { ...post, isBookmarked }
        : post,
    );
  }
  if (old.data && Array.isArray(old.data)) {
    return {
      ...old,
      data: old.data.map((post: any) =>
        post.id === postId || post.postId === postId
          ? { ...post, isBookmarked }
          : post,
      ),
    };
  }
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

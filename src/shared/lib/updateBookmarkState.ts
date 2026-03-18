export const updateBookmarkState = (
  old: any,
  postId: number,
  isBookmarked: boolean,
) => {
  if (!old) return old;

  if (old.pages && Array.isArray(old.pages)) {
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

        if (dataKey === "bookmarks" && !isBookmarked) {
          return {
            ...page,
            data: {
              ...page.data,
              [dataKey]: page.data[dataKey].filter(
                (post: any) => post.id !== postId && post.postId !== postId,
              ),
            },
          };
        }

        return {
          ...page,
          data: {
            ...page.data,
            [dataKey]: page.data[dataKey].map((post: any) =>
              post.id === postId || post.postId === postId
                ? { ...post, isBookmarked }
                : post,
            ),
          },
        };
      }),
    };
  }

  const isRec = old.recommendations || (old.data && old.data.recommendations);
  if (isRec) {
    const isRoot = !!old.recommendations;
    const target = isRoot ? old : old.data;

    const updated = {
      ...target,
      recommendations: target.recommendations.map((post: any) =>
        post.postId === postId || post.id === postId
          ? { ...post, isBookmarked }
          : post,
      ),
    };
    return isRoot ? updated : { ...old, data: updated };
  }

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

  return old;
};

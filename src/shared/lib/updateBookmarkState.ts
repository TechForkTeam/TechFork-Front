type AnyRecord = Record<string, unknown>;

export const updateBookmarkState = (
  old: unknown,
  postId: number,
  isBookmarked: boolean,
): unknown => {
  if (!old) return old;
  const data = old as AnyRecord;

  if (Array.isArray((data as AnyRecord).pages)) {
    const pages = (data.pages as AnyRecord[]).map((page: AnyRecord) => {
      const pageData = page.data as AnyRecord;
      const dataKey = pageData?.posts
        ? "posts"
        : pageData?.readPosts
          ? "readPosts"
          : pageData?.bookmarks
            ? "bookmarks"
            : null;

      if (!dataKey || !pageData[dataKey]) return page;

      if (dataKey === "bookmarks" && !isBookmarked) {
        return {
          ...page,
          data: {
            ...pageData,
            [dataKey]: (pageData[dataKey] as AnyRecord[]).filter(
              (post: AnyRecord) => post.id !== postId && post.postId !== postId,
            ),
          },
        };
      }

      return {
        ...page,
        data: {
          ...pageData,
          [dataKey]: (pageData[dataKey] as AnyRecord[]).map((post: AnyRecord) =>
            post.id === postId || post.postId === postId
              ? { ...post, isBookmarked }
              : post,
          ),
        },
      };
    });
    return { ...data, pages };
  }

  const isRec =
    data.recommendations ||
    ((data.data as AnyRecord)?.recommendations);
  if (isRec) {
    const isRoot = !!data.recommendations;
    const target = (isRoot ? data : data.data) as AnyRecord;
    const updated = {
      ...target,
      recommendations: (target.recommendations as AnyRecord[]).map(
        (post: AnyRecord) =>
          post.postId === postId || post.id === postId
            ? { ...post, isBookmarked }
            : post,
      ),
    };
    return isRoot ? updated : { ...data, data: updated };
  }

  if (Array.isArray(old)) {
    return (old as AnyRecord[]).map((post: AnyRecord) =>
      post.id === postId || post.postId === postId
        ? { ...post, isBookmarked }
        : post,
    );
  }

  if (data.data && Array.isArray(data.data)) {
    return {
      ...data,
      data: (data.data as AnyRecord[]).map((post: AnyRecord) =>
        post.id === postId || post.postId === postId
          ? { ...post, isBookmarked }
          : post,
      ),
    };
  }

  return old;
};

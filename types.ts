export type Post = {
  cursor: string;
  post: {
    slug: string;
    id: string;
    createdAt: string;
    content: {
      html: string;
    };
  };
};
// eslint-disable-next-line
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (acumulador, valorAtual) => acumulador + valorAtual.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );
};

const mostBlogs = (blogs) => {
  const counter = [];

  blogs.forEach((post) => {
    const objIndex = counter.findIndex((obj) => obj.author === post.author);
    if (objIndex > 0) {
      counter[objIndex].blogs++;
    } else {
      counter.push({ author: post.author, blogs: 1 });
    }
  });
  return counter.reduce((prev, current) =>
    prev.blogs > current.blogs ? prev : current
  );
};

const mostLikes = (blogs) => {
  const counter = [];

  blogs.forEach((post) => {
    const objIndex = counter.findIndex((obj) => obj.author === post.author);
    if (objIndex > 0) {
      counter[objIndex].likes += post.likes;
    } else {
      counter.push({ author: post.author, likes: post.likes });
    }
  });
  return counter.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

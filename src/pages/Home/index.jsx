import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { useEffect, useState, useCallback } from "react";
import ScrollArrow from "../../components/BackToTop";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  const [loadedPosts, setLoadedPosts] = useState(false);
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
    setLoadedPosts(true);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPostsPerPage = nextPage + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPostsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <h1>
            Found: {searchValue} in {filteredPosts.length} results
          </h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {loadedPosts === true && filteredPosts.length === 0 && (
        <div className="not-found-container">
          <h3>Not Found</h3>
          <h2 className="more-posts">View more posts:</h2>
          <Posts posts={posts} />
          <div className="button-container">
            <Button
              disabled={noMorePosts}
              text="Load more posts"
              onClick={loadMorePosts}
            />
            <ScrollArrow />
          </div>
        </div>
      )}
      <div className="button-container">
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            text="Load more posts"
            onClick={loadMorePosts}
          />
        )}
        {!searchValue && <ScrollArrow />}
      </div>
    </section>
  );
};

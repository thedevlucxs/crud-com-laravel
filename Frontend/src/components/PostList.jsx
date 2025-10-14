function PostList({
  posts,
  handleSelectPost,
  handleDeletePost,
  token,
  authUser,
}) {
  return (
    <div className="posts-container">
      <>
        <h2>Posts</h2>
        {posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => handleSelectPost(post.id)}>
                  Ver detalhes
                </button>
                {token && authUser && post.user_id === authUser.id && (
                  <div style={{ marginTop: "10px" }}>
                    <button
                      className="button-danger"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Apagar
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Nenhum post disponível. Faça o login e clique em "Buscar Posts".
          </p>
        )}
      </>
    </div>
  );
}
export default PostList;

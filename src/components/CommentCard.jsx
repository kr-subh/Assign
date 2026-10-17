
function CommentCard({ comment }) {
  return (
    <article className="comment-card">
      <h3>{comment.name}</h3>
      <p className="comment-email">{comment.email}</p>
      <p>{comment.body}</p>
    </article>
  );
}

export default CommentCard;

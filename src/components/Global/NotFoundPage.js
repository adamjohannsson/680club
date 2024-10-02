import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <div>404 Not Found</div>
      <div>
        <Link to="/">Take me Home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

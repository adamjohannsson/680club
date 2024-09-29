import { useState, useEffect } from 'react';
import GalleryPage from '../components/gallery-page';

export default function Gallery() {
  const [boards, setBoards] = useState(null);

  useEffect(() => {
    // Simulate an API call to fetch boards
    const fetchBoards = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const fetchedBoards = [
        {
          name: "My First Board",
          aiResponse: {
            goalSummary: "Launch a successful startup",
            outcomeVisual: "/placeholder.svg?height=300&width=300",
            quote: "The best way to predict the future is to create it."
          }
        },
        // ... more boards
      ];
      setBoards(fetchedBoards);
    };

    fetchBoards();
  }, []);

  return <GalleryPage boards={boards} />;
}

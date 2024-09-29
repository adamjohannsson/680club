import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Edit, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom'; // Adjust for React Router
import Header from './header'; // Import the header
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Firestore DB import
import { useAuth } from './contexts/AuthContext'; // To get the current user

export default function GalleryPage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Assuming you have an Auth context that provides the user

  // Fetch the boards for the authenticated user
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        // Query to fetch vision boards created by the current user
        const q = query(collection(db, 'boards'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const boardsData = [];
        querySnapshot.forEach((doc) => {
          boardsData.push({ id: doc.id, ...doc.data() });
        });
        setBoards(boardsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching boards: ', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchBoards();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto p-4">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header /> {/* Display header */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Vision Boards</h1>
        {boards.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-lg mb-4">You haven't created any vision boards yet.</p>
              <Link to="/create">
                <Button>Create Your First Board</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{board.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{board.aiResponse.goalSummary}</p>
                  <img src={board.aiResponse.outcomeVisual} alt="Board visual" className="w-full h-40 object-cover mb-4" />
                  <Link to={`/edit-board/${index}`}>
                    <Button>
                      <Edit className="mr-2 h-4 w-4" /> Edit Board
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

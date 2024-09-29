import React, { useState } from 'react';
import { Button } from './components/ui/button';    // Adjusted import path
import { Input } from './components/ui/input';      // Adjusted import path
import { Textarea } from './components/ui/textarea';  // Adjusted import path
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';  // Adjusted import path
import { PlusCircle, RefreshCw, Send, ArrowLeft } from 'lucide-react';  // Keeping Lucide icons
import Header from './components/header';  // Adjusted import path for Header
import { db } from './firebaseConfig'; // Import Firestore
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Firestore methods
import { auth } from './firebaseConfig'; // Import authentication

// Simulated AI response function (replace with actual API call)
const getAIResponse = async (boardData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));  // Simulate API delay
  return {
    goalSummary: "Create a successful tech startup",
    outcomeVisual: "/placeholder.svg?height=300&width=300",
    quote: "The only way to do great work is to love what you do. - Steve Jobs",
  };
};

export default function MainAppPage() {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [step, setStep] = useState(0);
  const [boardData, setBoardData] = useState({
    name: '',
    goals: ['', '', '', '', ''],
    explanations: ['', '', '', '', ''],
    importance: ['', '', '', '', ''],
    outcomes: ['', '', '', '', ''],
  });
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, index, value) => {
    setBoardData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleCreateBoard = async () => {
    setIsLoading(true);
    const response = await getAIResponse(boardData);
    setAiResponse(response);
    setIsLoading(false);

    // Create board data object for Firestore
    const board = {
      name: boardData.name,
      userId: auth.currentUser.uid, // Get the current user's UID
      aiResponse: response,
      goals: boardData.goals,
      explanations: boardData.explanations,
      importance: boardData.importance,
      outcomes: boardData.outcomes,
      createdAt: Timestamp.now(), // Firestore timestamp
    };

    try {
      const docRef = await addDoc(collection(db, 'boards'), board);  // Add board to Firestore
      console.log('Document written with ID: ', docRef.id);
      // Update local state with new board
      setBoards(prev => [...prev, { id: docRef.id, ...board }]);
      setCurrentBoard(boards.length);
      setStep(6);  // Move to AI response view
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleRegenerateResponse = async () => {
    setIsLoading(true);
    const response = await getAIResponse(boardData);
    setAiResponse(response);
    setIsLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Create a New Vision Board</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter board name"
                value={boardData.name}
                onChange={e => setBoardData(prev => ({ ...prev, name: e.target.value }))}
              />
              <Button className="mt-4" onClick={() => setStep(1)}>
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 1:
      case 2:
      case 3:
      case 4:
        const fields = ['goals', 'explanations', 'importance', 'outcomes'];
        const titles = ['List Your Goals', 'Explain Your Goals', 'Why These Goals Matter', 'Describe the Outcomes'];
        const field = fields[step - 1];
        return (
          <Card>
            <CardHeader>
              <CardTitle>{titles[step - 1]}</CardTitle>
            </CardHeader>
            <CardContent>
              {boardData[field].map((value, index) => (
                <Textarea
                  key={index}
                  className="mb-4"
                  placeholder={`${titles[step - 1]} ${index + 1}`}
                  value={value}
                  onChange={e => handleInputChange(field, index, e.target.value)}
                />
              ))}
              <div className="flex justify-between">
                <Button onClick={() => setStep(prev => prev - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep(prev => prev + 1)}>Next</Button>
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review and Create Board</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold mb-2">Board Name: {boardData.name}</h3>
              {boardData.goals.map((goal, index) => (
                goal && (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">Goal {index + 1}: {goal}</p>
                    <p>Explanation: {boardData.explanations[index]}</p>
                    <p>Importance: {boardData.importance[index]}</p>
                    <p>Desired Outcome: {boardData.outcomes[index]}</p>
                  </div>
                )
              ))}
              <div className="flex justify-between">
                <Button onClick={() => setStep(prev => prev - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleCreateBoard}>Create Board</Button>
              </div>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <div className="flex h-[calc(100vh-4rem)]">
            <div className="w-1/2 p-4 border-r">
              <Card>
                <CardHeader>
                  <CardTitle>Chat with AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[calc(100vh-16rem)] overflow-y-auto mb-4">
                    {/* Chat messages would go here */}
                  </div>
                  <div className="flex">
                    <Input placeholder="Type your message..." className="flex-grow mr-2" />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-1/2 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Generating content...</p>
                  ) : aiResponse ? (
                    <>
                      <h3 className="font-bold mb-2">Goal Summary</h3>
                      <p className="mb-4">{aiResponse.goalSummary}</p>
                      <h3 className="font-bold mb-2">Outcome Visual</h3>
                      <img src={aiResponse.outcomeVisual} alt="AI generated outcome visual" className="mb-4" />
                      <h3 className="font-bold mb-2">Inspirational Quote</h3>
                      <p className="mb-4">{aiResponse.quote}</p>
                      <Button onClick={handleRegenerateResponse}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Regenerate Response
                      </Button>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />  {/* The header is now present */}
      <main className="container mx-auto p-4">
        {renderStep()}
      </main>
    </div>
  );
}

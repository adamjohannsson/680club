import React from 'react';
import { Button } from './ui/button';
import { PencilRuler } from "lucide-react";
import { Link } from 'react-router-dom'; // Adjust import for React Router

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <PencilRuler className="h-6 w-6" />
          <span className="text-2xl font-bold">Printboard</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/app">
                <Button variant="secondary">Create New Board</Button>
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                <Button variant="secondary">View Gallery</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

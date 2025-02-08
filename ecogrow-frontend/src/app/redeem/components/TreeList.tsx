import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Tree {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface TreeListProps {
  trees: Tree[];
  onTreeOrder: (treeId: number, quantity: number) => void;
  userTokens: number;
}

export default function TreeList({ trees, onTreeOrder, userTokens }: TreeListProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (treeId: number, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [treeId]: quantity
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Trees</h2>
      {trees.map(tree => (
        <Card key={tree.id}>
          <CardHeader>
            <CardTitle>{tree.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div>
                <p>Price: {tree.price} tokens</p>
                <p>Available Stock: {tree.stock}</p>
              </div>
              <Input 
                type="number" 
                min="0" 
                max={tree.stock} 
                value={quantities[tree.id] || 0}
                onChange={(e) => handleQuantityChange(tree.id, Number(e.target.value))}
                className="w-20"
              />
              <Button 
                onClick={() => onTreeOrder(tree.id, quantities[tree.id] || 0)}
                disabled={
                  !quantities[tree.id] || 
                  quantities[tree.id] > tree.stock || 
                  quantities[tree.id] * tree.price > userTokens
                }
              >
                Order
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
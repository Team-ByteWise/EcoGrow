import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function TreeList({
  trees,
  onTreeOrder,
  userTokens,
}: TreeListProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (treeId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [treeId]: quantity,
    }));
  };

  return (
    <div className="space-y-4">
      {trees.map((tree) => (
        <Card
          key={tree.id}
          className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle className="text-lg text-green-800">
              {tree.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <p className="text-sm text-gray-600">
                  Price:{" "}
                  <span className="font-semibold text-green-700">
                    {tree.price} tokens
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Available:{" "}
                  <span className="font-semibold text-green-700">
                    {tree.stock}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max={tree.stock}
                  value={quantities[tree.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(tree.id, Number(e.target.value))
                  }
                  className="w-20"
                />
                <Button
                  onClick={() => onTreeOrder(tree.id, quantities[tree.id] || 0)}
                  disabled={
                    !quantities[tree.id] ||
                    quantities[tree.id] > tree.stock ||
                    quantities[tree.id] * tree.price > userTokens
                  }
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Redeem
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

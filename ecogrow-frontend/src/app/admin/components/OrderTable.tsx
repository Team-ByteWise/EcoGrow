import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    UserName: "JohnDoe",
    email: "johndoe@example.com",
    Tree: "Oak",
    Quantity: 5,
  },
  {
    UserName: "JaneSmith",
    email: "janesmith@example.com",
    Tree: "Pine",
    Quantity: 3,
  },
  {
    UserName: "AlexBrown",
    email: "alexbrown@example.com",
    Tree: "Maple",
    Quantity: 7,
  },
  {
    UserName: "EmilyDavis",
    email: "emilydavis@example.com",
    Tree: "Cedar",
    Quantity: 2,
  },
  {
    UserName: "MichaelWilson",
    email: "michaelwilson@example.com",
    Tree: "Birch",
    Quantity: 6,
  },
  {
    UserName: "SophiaMiller",
    email: "sophiamiller@example.com",
    Tree: "Spruce",
    Quantity: 4,
  },
  {
    UserName: "DanielMartinez",
    email: "danielmartinez@example.com",
    Tree: "Willow",
    Quantity: 8,
  },
  {
    UserName: "OliviaAnderson",
    email: "oliviaanderson@example.com",
    Tree: "Redwood",
    Quantity: 1,
  },
  {
    UserName: "LiamThomas",
    email: "liamthomas@example.com",
    Tree: "Cherry Blossom",
    Quantity: 9,
  },
  {
    UserName: "AvaHarris",
    email: "avaharris@example.com",
    Tree: "Banyan",
    Quantity: 10,
  },
];

export default function OrderTable() {
  return (
    <div className="bg-background">
      <div className="overflow-hidden rounded-lg border border-border bg-background ">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">UserName</TableHead>
              <TableHead className="h-9 py-2">email</TableHead>
              <TableHead className="h-9 py-2">Tree</TableHead>
              <TableHead className="h-9 py-2">Quantiy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.UserName}>
                <TableCell className="py-4 font-medium">
                  {order.UserName}
                </TableCell>
                <TableCell className="py-2">{order.email}</TableCell>
                <TableCell className="py-2">{order.Tree}</TableCell>
                <TableCell className="py-2">{order.Quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { OrderTable };

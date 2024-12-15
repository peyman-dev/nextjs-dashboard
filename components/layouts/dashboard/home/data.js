import { BadgeCent, Receipt, ShoppingBag, UsersRound } from "lucide-react";

export const totalSales = [
    {
        id: crypto.randomUUID(),
        name: 'Total Sales',
        value: '$1k',
        icon: ShoppingBag,
        color: "bg-red-500"
    },
    {
        id: crypto.randomUUID(),
        name: 'Total Orders',
        value: '100',
        icon: Receipt,
        color: "bg-green-500"
    },
    {
        id: crypto.randomUUID(),
        name: 'Product sold',
        value: '10',
        icon: BadgeCent,
        color: "bg-yellow-500"
    },
    {
        id: crypto.randomUUID(),
        name: 'New customers',
        value: '$1k',
        icon: UsersRound,
        color: "bg-indigo-500"
    },
 

]
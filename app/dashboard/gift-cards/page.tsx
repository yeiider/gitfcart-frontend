import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Search } from 'lucide-react'

export default function GiftCardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Gift Cards</h1>
        <p className="text-muted-foreground">
          Administra todas tus Gift Cards desde aquí
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar Gift Card por ID..."
            className="pl-10"
          />
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Agregar Gift Card
        </Button>
      </div>

      <div className="grid gap-4">
        {[
          { id: 'GC-001', balance: 100, date: '2024-01-15', status: 'Activa' },
          { id: 'GC-002', balance: 75, date: '2024-01-10', status: 'Activa' },
          { id: 'GC-003', balance: 50, date: '2024-01-05', status: 'Activa' },
          { id: 'GC-004', balance: 0, date: '2023-12-20', status: 'Agotada' },
        ].map((card) => (
          <Card key={card.id}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Gift Card #{card.id}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Adquirida el {card.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">
                    ${card.balance.toFixed(2)}
                  </div>
                  <div className={`text-sm ${
                    card.status === 'Activa' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {card.status}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="border-t p-4">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Ver Historial
                </Button>
                <Button size="sm">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Plus, RefreshCcw } from 'lucide-react'

export default function EmptyGiftCardState() {
    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-6">
                    <Gift className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">No hay tarjetas de regalo</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Aún no tienes ninguna tarjeta de regalo. Puedes comenzar agregando una nueva o actualizar si crees que esto es un error.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Tarjeta
                    </Button>
                    <Button variant="outline">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Actualizar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 GiftCard Pro. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-primary mx-2">Términos de servicio</a>
            <a href="#" className="hover:text-primary mx-2">Política de privacidad</a>
            <a href="#" className="hover:text-primary mx-2">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


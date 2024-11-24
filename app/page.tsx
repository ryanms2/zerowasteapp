import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, ShoppingBag, Users, Leaf, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">ZeroWasteApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Recursos
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            Como Funciona
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contato
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Reduza o desperdício, alimente a comunidade
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Conectamos estabelecimentos com excedentes de alimentos a pessoas que precisam, criando um ciclo sustentável de consumo.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/register">Comece Agora</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#how-it-works">Saiba Mais</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Recursos Principais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Apple className="w-8 h-8 mb-2" />
                  <CardTitle>Ofertas de Alimentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Encontre alimentos de qualidade a preços reduzidos perto de você.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ShoppingBag className="w-8 h-8 mb-2" />
                  <CardTitle>Gerenciamento de Anúncios</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Estabelecimentos podem facilmente criar e gerenciar suas ofertas.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 mb-2" />
                  <CardTitle>Comunidade Engajada</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Conecte-se com outros usuários e estabelecimentos comprometidos com a redução do desperdício.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Cadastre-se</h3>
                <p className="text-gray-500 dark:text-gray-400">Crie uma conta como usuário ou estabelecimento.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Explore ou Anuncie</h3>
                <p className="text-gray-500 dark:text-gray-400">Encontre ofertas ou crie anúncios de alimentos excedentes.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Reduza o Desperdício</h3>
                <p className="text-gray-500 dark:text-gray-400">Aproveite alimentos de qualidade e ajude o meio ambiente.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Junte-se à Nossa Missão</h2>
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Seja parte da solução para o desperdício de alimentos. Juntos, podemos criar um futuro mais sustentável e solidário.
              </p>
              <Button asChild>
                <Link href="/register">
                  Comece Agora <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ZeroWasteApp. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Política de Privacidade
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="mailto:contato@zerowaste.app">
            contato@zerowaste.app
          </Link>
        </nav>
      </footer>
    </div>
  )
}


import './App.css'
import Counter from './Conter'
import Crud from './Crud'

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
      </header>

      <main className="app-main">
        <section className="section-block">
          <Crud />
        </section>

        <section className="section-block">
          <h3>Módulo de Contador</h3>
          <Counter />
        </section>
      </main>
    </div>
  )
}

export default App

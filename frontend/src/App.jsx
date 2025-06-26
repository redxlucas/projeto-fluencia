import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PhrasePractice from './pages/PhrasePractice'
import PrivateRoute from './components/atoms/PrivateRoute'
import HomePage from './pages/HomePage'
import AppLayout from './components/layout/AppLayout'
import { HistoryPage } from './pages/HistoryPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AppLayout>
                            <HomePage />
                        </AppLayout>
                    }
                />
                <Route
                    path="/phrasePractice/:sessionId"
                    element={
                        <PrivateRoute>
                            <AppLayout>
                                <PhrasePractice />
                            </AppLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/historic"
                    element={
                        <PrivateRoute>
                            <AppLayout>
                                <HistoryPage />
                            </AppLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App

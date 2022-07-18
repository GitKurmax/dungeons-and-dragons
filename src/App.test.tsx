import {render, screen} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import App from './App'

describe('App', () => {
    test('full app rendering', async () => {
        render(<App />)

        expect(screen.getByText(/Dungeons and Dragons/i)).toBeInTheDocument()
    })
})
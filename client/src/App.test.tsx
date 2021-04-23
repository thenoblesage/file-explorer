import { act, render, screen } from '@testing-library/react'
import Item from './components/item'
import Landing from './components/landing'
import PathContextProvider from './context/pathContext'

const data = [
    { name: 'programming', is_directory: true },
    { name: 'picture.jpeg', is_directory: false },
    { name: 'image.png', is_directory: false },
    { name: 'credentials', is_directory: true },
    { name: 'downloads', is_directory: true },
]

it('Renders Landing Component', async () => {
    jest.spyOn(global as any, 'fetch').mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(data) })
    )
    await act(
        async (): Promise<any> =>
            render(
                <PathContextProvider>
                    <Landing />
                </PathContextProvider>
            )
    )
    const heading = screen.getByTestId('heading')
    const path_items = screen.getAllByTestId('path-item')
    expect(heading).toBeInTheDocument()
    expect(path_items.length).toBeGreaterThan(0)
})

it('Correctly renders Item component', () => {
    render(<Item name="Downloads" is_directory={true} />)
    const item_icon = screen.getByTestId('path-item-image')
    const item_name = screen.getByTestId('path-item-name')
    expect(item_icon).toBeInTheDocument()
    expect(item_name).toBeInTheDocument()
})

it('Item component has only two buttons', () => {
    render(<Item name="Downloads" is_directory={true} />)
    const buttons = document.querySelectorAll('.nav-btn')
    expect(buttons.length).toBe(2)
})

it('Folders have an enter and delete button', () => {
    render(<Item name="Downloads" is_directory={true} />)
    const enter_btn = screen.getByTestId('enter-btn')
    const del_btn = screen.getByTestId('delete-btn')
    expect(enter_btn).toBeInTheDocument()
    expect(del_btn).toBeInTheDocument()
})

it('Files have a download and delete button', () => {
    render(<Item name="Downloads" is_directory={true} />)
    const dowload_btn = screen.getByTestId('enter-btn')
    const del_btn = screen.getByTestId('download-btn')
    expect(dowload_btn).toBeInTheDocument()
    expect(del_btn).toBeInTheDocument()
})

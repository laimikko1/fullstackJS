import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const simpleBlog = {
            title: 'Testiblogi',
            author: 'Kirjoittaja K',
            likes: 10
        }

        const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
        const titleDiv = blogComponent.find('.title')
        const contentDiv = blogComponent.find('.content')

        expect(titleDiv.text()).toContain(simpleBlog.title)
        expect(titleDiv.text()).toContain(simpleBlog.author)
        expect(contentDiv.text()).toContain(simpleBlog.likes)
    })

    it('clicking like button twice initiates two event handler calls', () => {
        const simpleBlog = {
            title: 'Testiblogi',
            author: 'Kirjoittaja K',
            likes: 10
        }

        const mockHandler = jest.fn()

        const simpleBlogComponent = shallow(
            <SimpleBlog
                blog={simpleBlog}
                onClick={mockHandler}
            />
        )

        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)

    })
})
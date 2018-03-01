import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog> </Blog>', () => {
    it('Only author and title are displayed when no click', () => {
        const blog = {
            author: 'Testi',
            title: 'Otsikko',
            url: 'www.google.fi',
            likes: 10
        }

        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }
        const jsonUser = JSON.stringify(user)
        window.localStorage.setItem('loggedBlogappUser', jsonUser)
        const mockHandler = jest.fn()

        const blogComponent = shallow(<Blog
            blog={blog}
            delete={mockHandler}
            update={mockHandler}> </Blog>)

        const titleDiv = blogComponent.find('.blogStyle')
        const contentStyle = blogComponent.find('.content').props().style

        expect(contentStyle.display).toEqual('none')
        expect(titleDiv.text()).toContain(blog.author)
        expect(titleDiv.text()).toContain(blog.title)

    })

    it('When click is initiated, display none is changed to empty and content is displayed', () => {
        const blog = {
            author: 'Testi',
            title: 'Otsikko',
            url: 'www.google.fi',
            likes: 10
        }

        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }
        const jsonUser = JSON.stringify(user)
        window.localStorage.setItem('loggedBlogappUser', jsonUser)
        const mockHandler = jest.fn()

        const blogComponent = shallow(<Blog
            blog={blog}
            delete={mockHandler}
            update={mockHandler}> </Blog>)

        const clickableLi = blogComponent.find('li').first()
        clickableLi.simulate('click')
        const contentDiv = blogComponent.find('.content').props().style
        expect(contentDiv.display).toEqual("")
    })
})


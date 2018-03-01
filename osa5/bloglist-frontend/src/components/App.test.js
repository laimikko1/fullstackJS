import App from '../App'
import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import { mount } from 'enzyme'
jest.mock('../services/blogService')
import BlogService from '../services/blogService'



describe('<App />', () => {
    let app
    describe('when user is not logged in ', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login form is rendered', () => {
            app.update()
            const togglable = app.find(Togglable)
            expect(React.Children.count(togglable.props().children)).toBe(1)
            expect(togglable.props().children.type.name).toEqual('LoginForm')
        })
    })

    describe('when user is logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
            const jsonUser = JSON.stringify(user)
            window.localStorage.setItem('loggedBlogappUser', jsonUser)
        })

        it('all the blogs are shown', () => {
            app.update()
            const blogs = app.find(Blog)
            expect(blogs.length).toBe(3)
        })
    })
})
import { SignUpSchema } from '@/actions/create-user/types'
import { faker } from '@faker-js/faker'

describe('Authentification test', () => {
	const userForm: SignUpSchema = {
		email: faker.internet.email(),
		password: 'password',
		fullName: faker.person.fullName(),
		username: faker.internet.userName(),
	}

	it('should register,signin and logout', () => {
		cy.visit('/sign-up')
		cy.get("input[name='fullName']").type(userForm.fullName)
		cy.get("input[name='email']").type(userForm.email)
		cy.get("input[name='username']").type(userForm.username)
		cy.get("input[name='password']").type(userForm.password)
		cy.get("button[type='submit']").click()
		cy.url().should('include', '/sign-in')
		cy.log('User registered successfully')

		cy.get("input[name='email']").type(userForm.email)
		cy.get("input[name='password']").type(userForm.password)
		cy.get("button[type='submit']").click()
		cy.url().should('include', '/')
		cy.log('User logged in successfully')

		cy.get("[data-cy='usr-dropdown']").click()
		cy.get("[data-cy='usr-logout-btn']").click()
		// check if a login anchor is present
		cy.get("[data-cy='login-link']").should('exist')
		cy.log('User logged out successfully')
	})
})

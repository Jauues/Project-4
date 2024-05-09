beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('Check that password & confirmation have to mach before form can be submitted', ()=>{

        // Filling in only mandatory fields
        onlyMandatoryDataFilled(username)

        // Typing confirmation password which is different from first password
        cy.get('#confirm').clear().type(wrongConfirmation)

        // Asserting that submit button is not enabled
        cy.get('h2').contains('favorite').click()
        cy.get('.submit_button').should('not.be.enabled')

        // Asserting that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Asserting that error message is visible
        cy.get('#password_error_message').should('be.visible')

        // Adding correct passwords
        cy.get('#confirm').clear().type(confirmation)
        cy.get('h2').contains('favorite').click()

        // Asserting that error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')

        // Asserting that submit button is now enabled
        cy.get('.submit_button').should('be.enabled').click()

        // Asserting success message is visible
        cy.get('#success_message').should('be.visible')

    })
    
    it('User can submit form with all fields added', ()=>{

        // Filling in all the fields
        allDataFilled(username)

        // Asserting that submit button is enabled
        cy.get('.submit_button').should('be.enabled').click()
        
        // Asserting that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{

        // Filling in mandatory fields
        onlyMandatoryDataFilled(username)
    
        // Asserting that submit button is enabled
        cy.get('.submit_button').should('be.enabled').click()
    
        // Asserting that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible')
    
    })


    it('User can not submit form with any mandatory field cleared', ()=>{
        
        // Tooltip messages different for fields not filled in VS cleared (currently tested).
        // email missing
        onlyMandatoryDataFilled(username)
            cy.get('#email').clear()
            // submit button disabled
            cy.get('h2').contains('favorite').click()
            cy.get('.submit_button').should('not.be.enabled')
            // Tooltip visible
            cy.get('#email').should('have.attr', 'title').should('contain', 'Input field contains not supported character')
            // Box shadow visible
            cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

        // username missing
            cy.get('#email').type(email)
            cy.get('#username').clear()
            // submit button disabled
            cy.get('h2').contains('favorite').click()
            cy.get('.submit_button').should('not.be.enabled')
            // Tooltip visible
            cy.get('#username').should('have.attr', 'title').should('contain', 'Input field contains not supported character')
            // Box shadow visible
            cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

        // first name missing
            cy.get('#username').type(username)
            cy.get('input[name="name"]').clear()
            // submit button disabled
            cy.get('h2').contains('favorite').click()
            cy.get('.submit_button').should('not.be.enabled')
            // Tooltip visible
            cy.get('input[name="name"]').should('have.attr', 'title').should('contain', 'Input field contains not supported character')
            // Box shadow visible
            cy.get('input[name="name"]').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

        // last name missing
            cy.get('input[name="name"]').type(myName)
            cy.get('#lastName').clear()
            // submit button disabled
            cy.get('h2').contains('favorite').click()
            cy.get('.submit_button').should('not.be.enabled')
            // Tooltip visible
            cy.get('#lastName').should('have.attr', 'title').should('contain', 'Input field contains not supported character')
            // Box shadow visible
            cy.get('#lastName').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
            

        // phone nr missing
            cy.get('#lastName').type(lastName)
            cy.get('[data-testid="phoneNumberTestId"]').clear()
            // submit button disabled
            cy.get('h2').contains('favorite').click()
            cy.get('.submit_button').should('not.be.enabled')
            // Tooltip visible
            cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'title').should('contain', 'Add phone number')
            // Box shadow visible
            cy.get('[data-testid="phoneNumberTestId"]').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {

    it('Check that logo is correct and has correct size', () => {

        // Checking first logo source
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')

        // Checking height
        cy.get('img').invoke('height').should('be.equal', 166)

        // Checking width
        cy.get('img').invoke('width').should('be.equal', 178)

    })

    it('Checking that second logo is correct and has correct size', () => {

        // Checking second logo source
        cy.log('Will check second logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png')

        // Checking height
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 87)

        // Checking width
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 117)
            .and('be.greaterThan', 115)     
    })



    it('Checking navigation links', () => {

        // Checking if 2 links present
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check navigation part: second link', () => {
        
        // Finding & clicking second link
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Checking correct URL
        cy.url().should('contain', '/registration_form_3.html')
        
        // Going back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {

        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes

    it('Check that checkboxes are correct', () => {
        // Checking that array has 3 elements
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Checking labels
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        // Checking default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Checking that multiple checkboxes can be checked at the same time
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })


    
    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favorite animal dropdown is correct', () => {

        // Checking length of animal dropdown
        cy.get('#animal').children().should('have.length', 6)

        // Checking content
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })

        // Checking that chosen option is active
        cy.get('#animal').select(3).should('contain', 'Hippo')
        cy.screenshot('Animal dropdown option "Hippo" visible')
    })
        
})

const username = 'BestUser'
const email = 'test@test.com'
const myName = 'Janeli'
const lastName = 'Uuesoo'
const phoneNr = '555666777'
const password = 'Janelispasstest3'
const confirmation = 'Janelispasstest3'
const wrongConfirmation = 'Wrongconf'


function allDataFilled(username) {
    cy.get('#username').type(username)
    cy.get('#email').type(email)
    cy.get('input[name="name"]').type(myName)
    cy.get('#lastName').type(lastName)
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNr)
    cy.get('#password').type(password)
    cy.get('#confirm').type(confirmation)
    cy.get('#cssFavLanguage').checked = true
    cy.get('#cssFavLanguage').click()
    cy.get('#vehicle1').checked = true
    cy.get('#vehicle1').click()
    cy.get('#cars').select('volvo')
    cy.get('#animal').select('snake')
    cy.get('h2').contains('Password').click()
}

function onlyMandatoryDataFilled(username) {
    cy.get('#username').type(username)
    cy.get('#email').type(email)
    cy.get('input[name="name"]').type(myName)
    cy.get('#lastName').type(lastName)
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNr)
    cy.get('#password').type(password)
    cy.get('#confirm').type(confirmation)
    cy.get('h2').contains('Password').click()
}
